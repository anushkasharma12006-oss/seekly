from typing import List, Dict
from models import SearchSource

DEMO_KNOWLEDGE_BASE: Dict[str, Dict] = {
    "james webb": {
        "title": "James Webb Space Telescope Discoveries",
        "sources": [
            {
                "title": "NASA's James Webb Space Telescope Official Mission Overview",
                "url": "https://www.nasa.gov/mission_pages/webb/main/index.html",
                "domain": "nasa.gov",
                "snippet": "Webb is the premier observatory of the next decade, studying every phase in the history of our Universe, ranging from the first luminous glows after the Big Bang to the formation of solar systems.",
            },
            {
                "title": "Earliest Galaxies Discovered by JWST — Nature Astronomy",
                "url": "https://www.nature.com/articles/s41550-023-01918-w",
                "domain": "nature.com",
                "snippet": "Spectroscopic confirmation of candidate galaxies at z > 10 demonstrates that massive, bright galaxies formed earlier in cosmic dawn than conventional cosmological models previously predicted.",
            },
            {
                "title": "Atmospheric Composition of Exoplanet WASP-96 b — ESA Science",
                "url": "https://www.esa.int/Science_Exploration/Space_Science/Webb",
                "domain": "esa.int",
                "snippet": "JWST transmission spectra reveal unambiguous signatures of water vapor, hazes, and atmospheric clouds on giant gas exoplanets with unprecedented infrared precision.",
            },
            {
                "title": "Infrared Astronomy and the Early Cosmos — MIT Technology Review",
                "url": "https://www.technologyreview.com/topic/space/",
                "domain": "technologyreview.com",
                "snippet": "Operating at the Sun-Earth L2 Lagrange point with a 6.5-meter beryllium mirror, JWST pierces interstellar dust clouds that obscured views in visible light.",
            }
        ],
        "answer": """The **James Webb Space Telescope (JWST)** has revolutionized astrophysics since beginning science operations at the Sun-Earth L2 Lagrange point [1]. Its 6.5-meter gold-coated beryllium mirror and high-resolution infrared instruments enable astronomers to observe cosmic phenomena previously obscured by interstellar dust clouds [4].

### Key Scientific Milestones

1. **Cosmic Dawn & Earliest Galaxies**: Webb confirmed the existence of luminous, massive galaxies at redshifts $z > 10$—just 300 to 400 million years after the Big Bang [2]. These findings challenge prior hierarchical galaxy formation timelines and suggest faster early stellar synthesis.
2. **Exoplanet Atmospheres**: The observatory captured definitive molecular fingerprints—including water vapor, carbon dioxide, and sulfur dioxide—in the atmospheres of transiting exoplanets such as WASP-96 b and WASP-39 b [3].
3. **Stellar Nurseries & Deep Field Clarity**: Piercing deep dust pillars in the Carina and Tarantula nebulae, NIRCam has mapped protostellar jets, chemical evolution, and planetary disk accretion zones with unprecedented photometric clarity [1].

*Note: This synthesis was compiled using the Seekly curated archival database.*""",
        "related": [
            "How does JWST's orbit at L2 differ from Hubble's low-Earth orbit?",
            "What did JWST detect in the atmosphere of WASP-39 b?",
            "Why are early JWST galaxies challenging standard dark matter models?"
        ],
        "facts": [
            {"label": "Mirror Diameter", "value": "6.5 meters"},
            {"label": "Primary Orbit", "value": "Sun-Earth L2 Point"},
            {"label": "Wavelengths", "value": "0.6 to 28.3 microns (Infrared)"}
        ]
    },
    "quantum computing": {
        "title": "State of Quantum Computing and Error Correction",
        "sources": [
            {
                "title": "Quantum Error Correction Below Fault-Tolerant Threshold — Nature",
                "url": "https://www.nature.com/articles/s41586-022-05434-1",
                "domain": "nature.com",
                "snippet": "Demonstrating that increasing surface code distance suppresses logical error rates below physical qubit fidelities is an essential milestone toward fault-tolerant quantum algorithms.",
            },
            {
                "title": "Overview of Superconducting Qubits and Neutral Atoms — IBM Research",
                "url": "https://research.ibm.com/quantum",
                "domain": "ibm.com",
                "snippet": "Architectures scaling beyond 1,000 physical qubits are pivoting from pure gate count to quantum utility, logical qubit operations, and cross-chip photonic couplers.",
            },
            {
                "title": "Quantum Algorithms and Post-Quantum Cryptography — NIST",
                "url": "https://www.nist.gov/cryptography/post-quantum-cryptography",
                "domain": "nist.gov",
                "snippet": "With Shor's algorithm threatening RSA and ECC cryptography, global standards bodies are finalizing lattice-based and stateless hash-based post-quantum cryptographic standards.",
            }
        ],
        "answer": """**Quantum computing** is transitioning from noisy intermediate-scale quantum (NISQ) devices toward the era of **fault-tolerant, logical qubits** [1]. Researchers across superconducting circuits, neutral-atom arrays, and trapped ions have demonstrated that scaling surface codes successfully suppresses physical gate errors below the critical threshold [1][2].

### Core Developments

- **Logical Qubit Ensembles**: Rather than relying on single error-prone physical qubits, modern quantum processors group hundreds of physical qubits into protected logical units using surface and color codes [1].
- **Post-Quantum Cryptography**: The impending risk posed by Shor's algorithm to traditional public-key encryption has led organizations worldwide to adopt lattice-based PQC standards standardized by NIST [3].
- **Practical Utility**: Early commercial use-cases center on quantum chemistry simulation, molecular orbital calculations, and complex materials synthesis optimization [2].""",
        "related": [
            "What is the difference between physical qubits and logical qubits?",
            "Which lattice-based algorithms did NIST standardize for post-quantum encryption?",
            "How do neutral-atom quantum computers compare to superconducting systems?"
        ],
        "facts": [
            {"label": "Leading Threshold", "value": "Surface Code Error Suppression"},
            {"label": "Top Modalities", "value": "Superconducting, Neutral Atoms, Trapped Ions"},
            {"label": "PQC Urgency", "value": "FIPS 203 & 204 Migration"}
        ]
    },
    "editorial design": {
        "title": "Editorial Design Systems & Digital Typography",
        "sources": [
            {
                "title": "The Principles of Editorial Craftsmanship — Apple Human Interface Guidelines",
                "url": "https://developer.apple.com/design/human-interface-guidelines/",
                "domain": "apple.com",
                "snippet": "Editorial digital design prioritizes generous negative space, intentional hierarchy, typographic rhythm, and restrained ornament to let content speak with authoritative clarity.",
            },
            {
                "title": "Crafting Software Interfaces with Physical Precision — Linear Design Principles",
                "url": "https://linear.app/method",
                "domain": "linear.app",
                "snippet": "Software craft demands micro-interactions that feel snappy, sub-pixel alignments, tactile keyboard shortcuts, and cohesive monochromatic color palettes.",
            },
            {
                "title": "The Warm Minimalist Aesthetic — Fide Island & Modern Publications",
                "url": "https://www.itsnicethat.com/",
                "domain": "itsnicethat.com",
                "snippet": "Departing from clinical corporate grey, warm editorial aesthetics use paper-like ivory tones, subtle tactile borders, and serif headlines to create human, literary warmth.",
            }
        ],
        "answer": """**Editorial digital design** bridges classic Swiss typography, high-grade literary publishing, and modern software craftsmanship [1][3]. Rather than treating web apps like transactional spreadsheets, the editorial aesthetic creates calm, deliberate environments where typographic scale and white space guide human attention [1].

### Key Aesthetic Tenets

- **Warmth Over Clinical Starkness**: Soft ivory backgrounds (`#FFF9F3`), muted plum text, and pastel accents replace stark `#FFFFFF` and harsh pure blacks, reducing eye strain and evoking tactile paper [3].
- **Typographic Dialectic**: Pairing a commanding literary serif for headlines with a clean geometric sans-serif for UI tokens creates clear narrative tension between storytelling and functional precision [1][3].
- **Tactile Restraint**: Interactions adopt physics-inspired magnetic pulls and subtle spring responses without cluttering the screen with unnecessary motion or decorative blobs [2].""",
        "related": [
            "Why is warm ivory preferred over pure white in editorial interfaces?",
            "How does typographic contrast establish information hierarchy?",
            "What makes Linear's interaction design feel particularly tactile?"
        ],
        "facts": [
            {"label": "Visual Language", "value": "Paper-like Warmth & Restraint"},
            {"label": "Type Pairing", "value": "Editorial Serif + Crisp Sans"},
            {"label": "Focus", "value": "Content Clarity & Fluid Craft"}
        ]
    }
}

def get_demo_search(query: str) -> Dict:
    """Return matching or synthesized demo search results."""
    q_lower = query.lower()
    
    # Try direct keyword match
    for key, data in DEMO_KNOWLEDGE_BASE.items():
        if key in q_lower or any(word in q_lower for word in key.split()):
            sources = [
                SearchSource(
                    id=i + 1,
                    title=s["title"],
                    url=s["url"],
                    domain=s["domain"],
                    snippet=s["snippet"],
                    score=0.95 - (i * 0.05),
                    favicon=f"https://www.google.com/s2/favicons?domain={s['domain']}&sz=64"
                )
                for i, s in enumerate(data["sources"])
            ]
            return {
                "answer": data["answer"],
                "sources": sources,
                "related": data["related"],
                "facts": data["facts"],
                "is_curated": True
            }
            
    # Generic realistic fallback for demo
    fallback_sources = [
        SearchSource(
            id=1,
            title=f"Exploring {query.title()}: Foundational Research & Perspective",
            url=f"https://en.wikipedia.org/wiki/{urllib.parse.quote(query.replace(' ', '_'))}",
            domain="wikipedia.org",
            snippet=f"Comprehensive historical overview and contemporary context regarding {query}. Details key definitions, research literature, and widely accepted principles across leading domains.",
            score=0.92,
            favicon="https://www.google.com/s2/favicons?domain=wikipedia.org&sz=64"
        ),
        SearchSource(
            id=2,
            title=f"Recent Developments and Future Horizons in {query.title()}",
            url="https://www.nature.com/",
            domain="nature.com",
            snippet=f"Peer-reviewed research and cross-disciplinary analyses evaluating practical breakthroughs, methodologies, and technical questions surrounding {query}.",
            score=0.87,
            favicon="https://www.google.com/s2/favicons?domain=nature.com&sz=64"
        ),
        SearchSource(
            id=3,
            title=f"Understanding {query.title()}: Principles and Best Practices",
            url="https://news.ycombinator.com/",
            domain="ycombinator.com",
            snippet=f"Industry perspectives, discussions, and technical implementation considerations related to {query} from practitioners and researchers.",
            score=0.81,
            favicon="https://www.google.com/s2/favicons?domain=ycombinator.com&sz=64"
        )
    ]
    
    fallback_answer = f"""### Overview: {query.title()}

**{query.title()}** is an evolving subject with multi-faceted applications across modern inquiry [1]. Analysis of current references indicates notable momentum in structural methodology and technical validation [2].

- **Foundational Concepts**: Standard frameworks define this domain around clear empirical evaluation and reproducible methods [1].
- **Recent Trajectory**: Research points toward increasingly automated workflows and cross-discipline integration [2].
- **Industry Perspective**: Practitioners emphasize balancing performance efficiency with maintainability and rigorous testing [3].

*(Demo mode: Run with DuckDuckGo or configure external search keys in `.env` for real-time live web indexing).*"""

    return {
        "answer": fallback_answer,
        "sources": fallback_sources,
        "related": [
            f"What are the most promising breakthroughs in {query}?",
            f"How do leading experts approach {query} today?",
            f"What challenges remain unsolved regarding {query}?"
        ],
        "facts": [
            {"label": "Topic Scope", "value": query.title()},
            {"label": "Index Mode", "value": "Seekly Archival Snapshot"},
            {"label": "Citation Count", "value": "3 Verified Records"}
        ],
        "is_curated": False
    }

import urllib.parse
