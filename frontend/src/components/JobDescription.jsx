function JobDescription({ value, onChange }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">STEP 02</p>
          <h2>Target role</h2>
        </div>

        <span className="panel-number">02</span>
      </div>

      <textarea
        className="job-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          "Paste the job description here...\n\n" +
          "Include responsibilities, required skills, " +
          "and qualifications for a more useful comparison."
        }
        maxLength={8000}
      />

      <div className="character-count">
        {value.length.toLocaleString()} / 8,000
      </div>
    </section>
  );
}

export default JobDescription;