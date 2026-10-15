from typing import List
from models import ExploreCategory

CURATED_CATEGORIES: List[ExploreCategory] = [
    ExploreCategory(
        id="tech-ai",
        title="Modern Computing & AI",
        description="Explorations in agentic systems, neuromorphic chips, and quantum supremacy.",
        icon="Cpu",
        accent_color="lilac",
        queries=[
            "Quantum error correction below fault-tolerant thresholds",
            "State of local LLM reasoning models on consumer silicon",
            "Neuromorphic computing architecture breakthroughs",
            "Post-quantum cryptography migration timelines"
        ]
    ),
    ExploreCategory(
        id="cosmos-science",
        title="Cosmos & Deep Science",
        description="Astrophysics, James Webb telescope findings, and fusion energy milestones.",
        icon="Sparkles",
        accent_color="peach",
        queries=[
            "James Webb Space Telescope earliest galaxy discoveries",
            "Tokamak magnetic confinement fusion net energy gains",
            "Synthetic biology and CRISPR base editing applications",
            "Deep ocean hydrothermal vent biosignatures"
        ]
    ),
    ExploreCategory(
        id="editorial-craft",
        title="Design Systems & Architecture",
        description="The intersection of typography, physical computing, and digital craft.",
        icon="Layers",
        accent_color="rose",
        queries=[
            "Editorial design systems and digital typography principles",
            "Tactile interaction design in modern desktop software",
            "Biophilic architectural design in dense urban environments",
            "Dieter Rams ten principles applied to AI interfaces"
        ]
    ),
    ExploreCategory(
        id="cognition-focus",
        title="Cognition & Flow State",
        description="Neuroscience of deep work, cognitive load theory, and mental models.",
        icon="Compass",
        accent_color="sky",
        queries=[
            "Cognitive load theory applications in interface hierarchy",
            "Neurobiology of ultradian rhythms and deep work cycles",
            "Decision architecture and second-order thinking models",
            "Dopamine regulation and sustained creative focus"
        ]
    ),
    ExploreCategory(
        id="planetary-future",
        title="Planetary Systems & Climate",
        description="Next-generation grid storage, solid-state batteries, and circular materials.",
        icon="Globe",
        accent_color="mint",
        queries=[
            "Sodium-ion battery commercialization and energy density",
            "Direct air capture scaling challenges and thermodynamics",
            "Microgrid decentralized energy distribution models",
            "Mycelium composite materials in regenerative packaging"
        ]
    )
]

def get_explore_categories() -> List[ExploreCategory]:
    return CURATED_CATEGORIES
