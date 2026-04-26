// ═══════════════════════════════════════════════════
// Algorithm Explorer Dashboard
// ═══════════════════════════════════════════════════

import { ALGORITHMS } from '../algorithms/registry.js';

export function renderExplorer(container) {
  container.classList.add('page-content');

  const categories = {};
  ALGORITHMS.forEach(algo => {
    if (!categories[algo.category]) categories[algo.category] = [];
    categories[algo.category].push(algo);
  });

  const difficultyBadge = (level) => {
    const cls = level === 'Beginner' ? 'badge-beginner' : level === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
    return `<span class="chip ${cls}">${level}</span>`;
  };

  let sectionsHTML = '';
  for (const [cat, algos] of Object.entries(categories)) {
    const catIcon = cat.includes('Supervised') ? 'school' : cat.includes('Unsupervised') ? 'explore' : 'psychology';
    sectionsHTML += `
      <div style="margin-bottom:var(--space-2xl)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-lg)">
          <span class="material-symbols-outlined text-primary" style="font-size:24px">${catIcon}</span>
          <h2 class="text-headline-md">${cat}</h2>
          <span class="chip chip-primary">${algos.length}</span>
        </div>
        <div class="algo-grid">
          ${algos.map(algo => `
            <div class="algo-card" onclick="location.hash='#workspace/${algo.id}'">
              <div class="algo-card-header">
                <div class="algo-card-icon">
                  <span class="material-symbols-outlined">${algo.icon}</span>
                </div>
                ${difficultyBadge(algo.difficulty)}
              </div>
              <h3 class="algo-card-title">${algo.name}</h3>
              <p class="algo-card-desc">${algo.description}</p>
              <div class="algo-card-footer">
                <code class="text-label-sm text-primary" style="font-family:var(--font-label);opacity:0.6">${algo.formula}</code>
                <button class="btn btn-primary btn-sm">
                  <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span>
                  Visualize
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="aura aura-primary" style="top:-100px;right:-200px"></div>
    <div class="aura aura-secondary" style="bottom:-100px;left:-200px"></div>

    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Algorithm Library</div>
        <h1 class="text-display-md" style="max-width:600px">Explore & Visualize Algorithms</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:550px;margin:var(--space-sm) 0 0">
          Select any algorithm to enter the interactive workspace. Tune parameters, watch visualizations, and read dynamic explanations.
        </p>
      </div>

      ${sectionsHTML}
    </div>
  `;
}
