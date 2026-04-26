// ═══════════════════════════════════════════════════
// Navbar Component — with AppState status pill
// ═══════════════════════════════════════════════════

import { AppState } from '../utils/app-state.js';

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
        <div id="navbar-state-pill" class="navbar-state-pill" style="display:none">
          <span class="material-symbols-outlined" style="font-size:14px;color:var(--success)">database</span>
          <span id="navbar-pill-text" style="font-size:11px;color:var(--on-surface-variant)">—</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="location.hash='#explorer'">
          <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span>
          Start Exploring
        </button>
      </div>
    </header>
  `;

  // Listen for state changes to update pill
  function updatePill() {
    const pill = document.getElementById('navbar-state-pill');
    const text = document.getElementById('navbar-pill-text');
    if (!pill || !text) return;

    const summary = AppState.getSummary();
    if (summary) {
      pill.style.display = 'flex';
      text.textContent = `${summary.name} · ${summary.rows} rows · Split: ${summary.split}`;
    } else {
      pill.style.display = 'none';
    }
  }

  AppState.on('datasetChanged', updatePill);
  AppState.on('splitChanged', updatePill);
  AppState.on('cleared', updatePill);
  updatePill();
}
