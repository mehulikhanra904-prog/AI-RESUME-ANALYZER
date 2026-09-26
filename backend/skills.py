import re


SKILLS = {
    "python": [
        "python"
    ],
    "java": [
        "java"
    ],
    "c": [
        "c programming",
        "c language"
    ],
    "c++": [
        "c++"
    ],
    "javascript": [
        "javascript",
        "js"
    ],
    "typescript": [
        "typescript"
    ],
    "react": [
        "react",
        "react.js",
        "reactjs"
    ],
    "node.js": [
        "node.js",
        "nodejs",
        "node"
    ],
    "express": [
        "express",
        "express.js"
    ],
    "mongodb": [
        "mongodb",
        "mongo db"
    ],
    "mysql": [
        "mysql"
    ],
    "postgresql": [
        "postgresql",
        "postgres"
    ],
    "sql": [
        "sql"
    ],
    "html": [
        "html",
        "html5"
    ],
    "css": [
        "css",
        "css3"
    ],
    "git": [
        "git"
    ],
    "github": [
        "github"
    ],
    "docker": [
        "docker"
    ],
    "kubernetes": [
        "kubernetes",
        "k8s"
    ],
    "aws": [
        "aws",
        "amazon web services"
    ],
    "azure": [
        "azure"
    ],
    "gcp": [
        "gcp",
        "google cloud"
    ],
    "machine learning": [
        "machine learning",
        "ml"
    ],
    "deep learning": [
        "deep learning"
    ],
    "tensorflow": [
        "tensorflow"
    ],
    "pytorch": [
        "pytorch"
    ],
    "scikit-learn": [
        "scikit-learn",
        "sklearn"
    ],
    "fastapi": [
        "fastapi"
    ],
    "django": [
        "django"
    ],
    "flask": [
        "flask"
    ],
    "rest api": [
        "rest api",
        "restful api",
        "rest services"
    ]
}


def normalize_text(text):
    return re.sub(
        r"\s+",
        " ",
        text.lower()
    )


def extract_skills(text):
    normalized_text = normalize_text(text)

    found = []

    for skill, aliases in SKILLS.items():

        for alias in aliases:

            pattern = r"(?<!\w)" + re.escape(alias) + r"(?!\w)"

            if re.search(pattern, normalized_text):
                found.append(skill)
                break

    return sorted(found)