// ═══════════════════════════════════════════════════
// Navbar Component
// ═══════════════════════════════════════════════════

export function renderNavbar(container) {
  container.innerHTML = `
    <header class="navbar" id="main-navbar">
      <a href="#landing" class="navbar-logo">Algo<span>nex</span></a>
      <nav class="navbar-links">
        <a href="#landing" class="navbar-link" data-route="landing">Home</a>
        <a href="#explorer" class="navbar-link" data-route="explorer">Algorithms</a>
        <a href="#pipeline" class="navbar-link" data-route="pipeline">Pipeline</a>
        <a href="#preprocessing" class="navbar-link" data-route="preprocessing">Preprocessing</a>
        <a href="#train-test-split" class="navbar-link" data-route="train-test-split">Split</a>
        <a href="#compare" class="navbar-link" data-route="compare">Compare</a>
        <a href="#playground" class="navbar-link" data-route="playground">Datasets</a>
      </nav>
      <div class="navbar-actions">
        <button class="btn btn-primary btn-sm" onclick="location.hash='#explorer'">
          <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span>
          Start Exploring
        </button>
      </div>
    </header>
  `;
}
