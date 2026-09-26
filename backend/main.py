import os
import re
from pathlib import Path

import fitz
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

try:
    from .skills import extract_skills
except ImportError:
    from skills import extract_skills


MAX_RESUME_BYTES = 10 * 1024 * 1024
STOP_WORDS = {
    "about", "after", "also", "and", "are", "been", "being", "between",
    "can", "for", "from", "have", "into", "its", "more", "must", "our",
    "should", "that", "the", "their", "this", "through", "with", "will",
    "you", "your",
}

app = FastAPI(
    title="AI Resume Analyzer API",
    description="Compares the skills and wording in a PDF resume with a job description.",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGIN", "*").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"]
)


def extract_pdf_text(contents: bytes) -> str:
    try:
        with fitz.open(stream=contents, filetype="pdf") as document:
            return "\n".join(page.get_text() for page in document)
    except Exception as error:
        raise HTTPException(
            status_code=422,
            detail="The uploaded PDF could not be read. Try exporting the resume as a text-based PDF.",
        ) from error


def meaningful_words(text: str) -> set[str]:
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9+#.]{1,}", text.lower())
    return {word for word in words if word not in STOP_WORDS}


def similarity_percent(resume_text: str, job_description: str) -> float:
    resume_words = meaningful_words(resume_text)
    job_words = meaningful_words(job_description)
    if not job_words:
        return 0.0
    return round(100 * len(resume_words & job_words) / len(job_words), 2)


@app.get("/")
def health():
    return {"status": "online", "service": "AI Resume Analyzer API"}


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    filename = Path(file.filename or "resume.pdf").name
    if Path(filename).suffix.lower() != ".pdf":
        raise HTTPException(status_code=415, detail="Please upload a PDF resume.")
    if not job_description.strip():
        raise HTTPException(status_code=422, detail="Please enter a job description.")
    if len(job_description) > 8000:
        raise HTTPException(status_code=422, detail="The job description must be 8,000 characters or fewer.")

    contents = await file.read(MAX_RESUME_BYTES + 1)
    if not contents:
        raise HTTPException(status_code=422, detail="The uploaded PDF is empty.")
    if len(contents) > MAX_RESUME_BYTES:
        raise HTTPException(status_code=413, detail="The resume must be 10 MB or smaller.")

    resume_text = extract_pdf_text(contents)
    if not resume_text.strip():
        raise HTTPException(status_code=422, detail="No selectable text was found in the PDF.")

    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_description))
    matched_skills = sorted(resume_skills & job_skills)
    missing_skills = sorted(job_skills - resume_skills)
    text_similarity = similarity_percent(resume_text, job_description)
    skill_coverage = 100 * len(matched_skills) / len(job_skills) if job_skills else text_similarity
    match_score = round(0.7 * text_similarity + 0.3 * skill_coverage, 2)

    return {
        "filename": filename,
        "match_score": match_score,
        "text_similarity": text_similarity,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }
