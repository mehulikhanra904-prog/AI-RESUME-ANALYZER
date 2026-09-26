function AnalyzeButton({
  loading,
  disabled,
  onClick,
}) {
  return (
    <button
      className="analyze-button"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Analyzing resume...
        </>
      ) : (
        <>
          Analyze match
          <span>→</span>
        </>
      )}
    </button>
  );
}

export default AnalyzeButton;