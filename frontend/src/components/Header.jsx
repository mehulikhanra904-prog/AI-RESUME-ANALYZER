function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <div className="brand-mark">R</div>

        <div className="brand-copy">
          <h1>ResumeLens</h1>
          <span>Resume intelligence for job seekers</span>
        </div>
      </div>

      <div className="header-status">
        <span className="status-dot"></span>
        Local analysis
      </div>
    </header>
  );
}

export default Header;