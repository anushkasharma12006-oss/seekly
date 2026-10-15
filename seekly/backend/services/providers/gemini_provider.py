import json
import re
from typing import List, Dict, Tuple
import httpx
from models import SearchSource, QuickFact

async def synthesize_with_gemini(
    query: str,
    sources: List[SearchSource],
    api_key: str,
    model: str = "gemini-2.5-flash"
) -> Tuple[str, List[str], List[QuickFact]]:
    """
    Synthesize an editorial, source-grounded answer using the Google Gemini API.
    Strictly cites retrieved sources with [1], [2], etc.
    """
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured")

    # Format sources for grounded prompting
    sources_text = "\n\n".join([
        f"[{s.id}] Title: {s.title}\nDomain: {s.domain}\nSnippet: {s.snippet}"
        for s in sources
    ])

    system_instruction = (
        "You are Seekly, an editorial AI search assistant crafted with the clarity of Apple, "
        "precision of Linear, and search rigor of Perplexity. "
        "Your goal is to provide a calm, beautifully formatted, deeply informative answer grounded strictly "
        "in the provided search sources. Always cite sources inline using bracketed numbers like [1] or [2][3]. "
        "Never hallucinate facts or URLs outside the provided sources. "
        "After the main answer, provide 3 natural, curiosity-driven follow-up questions formatted as:\n"
        "---FOLLOW_UPS---\n"
        "- Follow up question 1\n"
        "- Follow up question 2\n"
        "- Follow up question 3\n\n"
        "And 2-3 quick quantitative or categorical facts formatted as:\n"
        "---QUICK_FACTS---\n"
        "Label 1: Value 1\n"
        "Label 2: Value 2"
    )

    user_prompt = f"""Search Query: "{query}"

Retrieved Web Sources:
{sources_text}

Provide an authoritative, clear, and well-structured answer with inline citations."""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_prompt}]
            }
        ],
        "systemInstruction": {
            "parts": [{"text": system_instruction}]
        },
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 1500
        }
    }

    async with httpx.AsyncClient(timeout=25.0) as client:
        response = await client.post(url, json=payload)
        
        if response.status_code != 200:
            error_msg = f"Gemini API returned {response.status_code}: {response.text}"
            raise RuntimeError(error_msg)

        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            raise RuntimeError("No candidate response from Gemini API")

        raw_text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")

    # Parse main answer, follow-ups, and quick facts
    answer = raw_text
    follow_ups: List[str] = []
    quick_facts: List[QuickFact] = []

    if "---FOLLOW_UPS---" in answer:
        parts = answer.split("---FOLLOW_UPS---")
        answer = parts[0].strip()
        remaining = parts[1]

        if "---QUICK_FACTS---" in remaining:
            fu_part, qf_part = remaining.split("---QUICK_FACTS---")
            # Parse follow-ups
            for line in fu_part.strip().splitlines():
                clean_line = re.sub(r"^[-*\d.]+\s*", "", line).strip()
                if clean_line:
                    follow_ups.append(clean_line)
            # Parse quick facts
            for line in qf_part.strip().splitlines():
                if ":" in line:
                    lbl, val = line.split(":", 1)
                    quick_facts.append(QuickFact(label=lbl.strip("- *"), value=val.strip()))
        else:
            for line in remaining.strip().splitlines():
                clean_line = re.sub(r"^[-*\d.]+\s*", "", line).strip()
                if clean_line:
                    follow_ups.append(clean_line)

    return answer, follow_ups[:4], quick_facts[:4]
