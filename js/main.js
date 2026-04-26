// ═══════════════════════════════════════════════════
// Algonex — Main Entry Point
// ═══════════════════════════════════════════════════

import { Router } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderLanding } from './pages/landing.js';
import { renderExplorer } from './pages/explorer.js';
import { renderWorkspace } from './pages/workspace.js';
import { renderPipeline } from './pages/pipeline.js';
import { renderCompare } from './pages/compare.js';
import { renderPlayground } from './pages/playground.js';
import { renderPreprocessing } from './pages/preprocessing.js';
import { renderTrainTestSplit } from './pages/train-test-split.js';

// Initialize navbar
const navbarEl = document.getElementById('navbar');
renderNavbar(navbarEl);

// Define routes
const routes = {
  landing: {
    render: (container) => renderLanding(container),
  },
  explorer: {
    render: (container) => renderExplorer(container),
  },
  workspace: {
    render: (container, algoId) => renderWorkspace(container, algoId),
  },
  pipeline: {
    render: (container) => renderPipeline(container),
  },
  compare: {
    render: (container) => renderCompare(container),
  },
  playground: {
    render: (container) => renderPlayground(container),
  },
  preprocessing: {
    render: (container) => renderPreprocessing(container),
  },
  'train-test-split': {
    render: (container) => renderTrainTestSplit(container),
  },
};

// Initialize router
const pageContent = document.getElementById('page-content');
const router = new Router(routes, pageContent);

// Clean up stale sidebar on navigation (workspace pages add one)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1).split('/')[0];
  if (hash !== 'workspace') {
    // Remove any sidebar containers not part of workspace
    const existingSidebar = document.getElementById('algo-sidebar');
    if (existingSidebar) {
      existingSidebar.closest('div')?.remove();
    }
    // Remove page-with-sidebar class
    pageContent.classList.remove('page-with-sidebar');
  }
  pageContent.classList.remove('page-content');
});

console.log('🧠 Algonex initialized');
