function ResumeUpload({ file, onFileChange }) {
  const handleChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    onFileChange(selectedFile);
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">STEP 01</p>
          <h2>Your resume</h2>
        </div>

        <span className="panel-number">01</span>
      </div>

      <label className="upload-area">
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleChange}
        />

        <div className="upload-icon">
          ↑
        </div>

        <strong>
          {file ? file.name : "Choose your resume"}
        </strong>

        <span>
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "PDF files only · Max 10 MB"}
        </span>
      </label>
    </section>
  );
}

export default ResumeUpload;