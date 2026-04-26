// ═══════════════════════════════════════════════════
// Sidebar Component (for workspace pages)
// ═══════════════════════════════════════════════════

import { ALGORITHMS } from '../algorithms/registry.js';

export function renderSidebar(container, activeAlgoId) {
  const categories = {};
  ALGORITHMS.forEach(algo => {
    if (!categories[algo.category]) categories[algo.category] = [];
    categories[algo.category].push(algo);
  });

  let linksHTML = '';
  for (const [cat, algos] of Object.entries(categories)) {
    linksHTML += `<div class="text-label-sm text-dim" style="padding:16px 24px 8px;color:var(--outline)">${cat}</div>`;
    for (const algo of algos) {
      const isActive = algo.id === activeAlgoId;
      linksHTML += `
        <a href="#workspace/${algo.id}" class="sidebar-link ${isActive ? 'active' : ''}">
          <span class="material-symbols-outlined">${algo.icon}</span>
          <span>${algo.name}</span>
        </a>`;
    }
  }

  container.innerHTML = `
    <aside class="sidebar" id="algo-sidebar">
      <div class="sidebar-header">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--surface-container-high);border:1px solid rgba(164,230,255,0.15);display:flex;align-items:center;justify-content:center">
          <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">schema</span>
        </div>
        <div>
          <div class="text-title-lg text-primary">Algorithm Engine</div>
          <div class="text-label-sm text-dim">v1.0 Active</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${linksHTML}
      </nav>
      <div class="sidebar-footer">
        <button class="btn btn-outline btn-sm w-full" onclick="location.hash='#explorer'">
          <span class="material-symbols-outlined" style="font-size:16px">grid_view</span>
          Back to Explorer
        </button>
      </div>
    </aside>
  `;
}
