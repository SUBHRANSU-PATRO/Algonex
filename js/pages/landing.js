// ═══════════════════════════════════════════════════
// Landing Page
// ═══════════════════════════════════════════════════

export function renderLanding(container) {
  container.classList.add('page-content');
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <div class="aura aura-primary" style="bottom:-200px;left:-100px"></div>
      <div class="aura aura-secondary" style="top:100px;right:-100px"></div>

      <div class="animate-fade-in-up">
        <div class="chip chip-primary mb-lg" style="margin:0 auto var(--space-lg)">
          <span class="material-symbols-outlined" style="font-size:14px">auto_awesome</span>
          Interactive ML Visualization Platform
        </div>
      </div>

      <h1 class="hero-title animate-fade-in-up delay-1">
        Visualize <span class="highlight">Machine Learning</span> Like Never Before
      </h1>

      <p class="hero-subtitle animate-fade-in-up delay-2">
        Understand algorithms through interactive simulations, real-time parameter tuning, 
        and pipeline visualization. From gradient descent to neural networks — see it happen live.
      </p>

      <div class="hero-cta animate-fade-in-up delay-3">
        <a href="#explorer" class="btn btn-primary btn-lg">
          <span class="material-symbols-outlined">play_arrow</span>
          Start Exploring
        </a>
        <a href="#workspace/linear-regression" class="btn btn-outline btn-lg">
          <span class="material-symbols-outlined">visibility</span>
          View Demo
        </a>
      </div>

      <!-- Animated Preview -->
      <div class="animate-fade-in-up delay-4" style="width:100%;max-width:900px">
        <div class="glass-panel" style="border-radius:var(--radius-2xl);padding:var(--space-lg);position:relative">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
            <div style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#febc2e"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#28c840"></div>
            <span class="text-label-sm text-dim" style="margin-left:var(--space-sm)">ALGONEX WORKSPACE</span>
          </div>
          <div style="position:relative;height:340px;overflow:hidden;border-radius:var(--radius-lg);background:var(--surface-container-lowest)">
            <canvas id="hero-canvas" style="width:100%;height:100%"></canvas>
            <div style="position:absolute;top:16px;right:16px" class="chip chip-success">LIVE</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Algonex -->
    <section class="features-section" style="padding-top:var(--space-3xl);padding-bottom:var(--space-3xl)">
      <div class="section-header">
        <div class="chip chip-primary mb-md" style="margin:0 auto var(--space-md)">Why Algonex</div>
        <h2>Everything you need to understand ML</h2>
        <p class="text-body-lg text-muted mt-sm">
          A complete toolkit for learning, experimenting, and mastering machine learning concepts.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card animate-fade-in-up delay-1">
          <div class="feature-icon">
            <span class="material-symbols-outlined">scatter_plot</span>
          </div>
          <h3 class="text-headline-sm mb-sm">Interactive Visualization</h3>
          <p class="text-body-md text-muted">
            Watch decision boundaries form, clusters emerge, and neural networks learn — all in real time on a live canvas.
          </p>
        </div>

        <div class="feature-card animate-fade-in-up delay-2">
          <div class="feature-icon">
            <span class="material-symbols-outlined" style="color:var(--secondary)">tune</span>
          </div>
          <h3 class="text-headline-sm mb-sm">Real-Time Tuning</h3>
          <p class="text-body-md text-muted">
            Adjust learning rate, K neighbors, tree depth, and more. Instantly see how each parameter changes behavior.
          </p>
        </div>

        <div class="feature-card animate-fade-in-up delay-3">
          <div class="feature-icon">
            <span class="material-symbols-outlined" style="color:var(--tertiary)">route</span>
          </div>
          <h3 class="text-headline-sm mb-sm">ML Pipeline Simulation</h3>
          <p class="text-body-md text-muted">
            Walk through the complete workflow — from data preprocessing to model deployment — step by animated step.
          </p>
        </div>

        <div class="feature-card animate-fade-in-up delay-4">
          <div class="feature-icon">
            <span class="material-symbols-outlined" style="color:var(--success)">compare</span>
          </div>
          <h3 class="text-headline-sm mb-sm">Algorithm Comparison</h3>
          <p class="text-body-md text-muted">
            Run two algorithms side-by-side on the same dataset. Compare accuracy, speed, and decision boundaries.
          </p>
        </div>

        <div class="feature-card animate-fade-in-up delay-5">
          <div class="feature-icon">
            <span class="material-symbols-outlined" style="color:var(--warning)">database</span>
          </div>
          <h3 class="text-headline-sm mb-sm">Dataset Playground</h3>
          <p class="text-body-md text-muted">
            Experiment with Iris, Titanic, synthetic data, or upload your own CSV. See algorithms adapt to real data.
          </p>
        </div>

        <div class="feature-card animate-fade-in-up delay-6">
          <div class="feature-icon">
            <span class="material-symbols-outlined" style="color:var(--primary-dim)">functions</span>
          </div>
          <h3 class="text-headline-sm mb-sm">Theory & Formulas</h3>
          <p class="text-body-md text-muted">
            Every visualization is paired with mathematical explanations, derivations, and insights to deepen understanding.
          </p>
        </div>
      </div>
    </section>

    <!-- Algorithm Preview -->
    <section style="padding:var(--space-3xl) var(--space-xl);background:var(--surface-container-low)">
      <div class="container">
        <div class="section-header">
          <div class="chip chip-secondary mb-md" style="margin:0 auto var(--space-md)">Algorithms</div>
          <h2>Five Core Algorithms, Fully Interactive</h2>
          <p class="text-body-lg text-muted mt-sm">From linear models to deep learning — visualize, tune, and understand.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-md);max-width:1000px;margin:0 auto">
          ${['Linear Regression', 'KNN', 'Decision Tree', 'K-Means', 'Neural Network'].map((name, i) => {
            const icons = ['show_chart', 'hub', 'account_tree', 'scatter_plot', 'psychology'];
            const ids = ['linear-regression', 'knn', 'decision-tree', 'kmeans', 'neural-network'];
            return `
              <a href="#workspace/${ids[i]}" class="card" style="text-align:center;padding:var(--space-lg) var(--space-md)">
                <div style="width:48px;height:48px;margin:0 auto var(--space-sm);background:rgba(164,230,255,0.08);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center">
                  <span class="material-symbols-outlined" style="color:var(--primary)">${icons[i]}</span>
                </div>
                <div class="text-body-sm" style="font-weight:600">${name}</div>
              </a>`;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section style="padding:var(--space-3xl) var(--space-xl);text-align:center">
      <h2 class="text-headline-lg mb-md">Ready to explore?</h2>
      <p class="text-body-lg text-muted mb-xl" style="max-width:480px;margin:0 auto var(--space-xl)">
        Jump into the Algorithm Explorer and start visualizing machine learning.
      </p>
      <a href="#explorer" class="btn btn-primary btn-lg">
        <span class="material-symbols-outlined">rocket_launch</span>
        Launch Explorer
      </a>
    </section>

    <!-- Footer -->
    <footer style="padding:var(--space-xl);border-top:1px solid var(--glass-border);text-align:center">
      <p class="text-body-sm text-dim">Algonex — Interactive ML Visualization Platform</p>
    </footer>
  `;

  // Hero canvas animation
  startHeroAnimation();

  return () => {
    if (window._heroAnimFrame) cancelAnimationFrame(window._heroAnimFrame);
  };
}

function startHeroAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  // Generate animated points
  const points = [];
  for (let i = 0; i < 60; i++) {
    const cls = i < 30 ? 0 : 1;
    points.push({
      x: cls === 0 ? 0.15 + Math.random() * 0.35 : 0.5 + Math.random() * 0.35,
      y: cls === 0 ? 0.5 + Math.random() * 0.35 : 0.15 + Math.random() * 0.35,
      cls,
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
    });
  }

  let lineAngle = -0.7;

  function draw() {
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(164, 230, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (let i = 0; i < h; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    // Animated boundary line
    lineAngle += 0.0005;
    const cx = w / 2, cy = h / 2;
    const len = w;
    ctx.strokeStyle = 'rgba(0, 209, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0, 209, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(cx - len * Math.cos(lineAngle), cy - len * Math.sin(lineAngle));
    ctx.lineTo(cx + len * Math.cos(lineAngle), cy + len * Math.sin(lineAngle));
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Points
    const colors = ['#00d1ff', '#d0bcff'];
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0.05 || p.x > 0.95) p.vx *= -1;
      if (p.y < 0.05 || p.y > 0.95) p.vy *= -1;

      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = colors[p.cls] + '30';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors[p.cls];
      ctx.fill();
    }

    window._heroAnimFrame = requestAnimationFrame(draw);
  }

  draw();
}
