const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      data.detail || "Unable to analyze the resume."
    );
  }

  return data;
}
