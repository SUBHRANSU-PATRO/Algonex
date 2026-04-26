// ═══════════════════════════════════════════════════
// ML Pipeline Simulator
// ═══════════════════════════════════════════════════

export function renderPipeline(container) {
  container.classList.add('page-content');

  const steps = [
    {
      id: 'collect', name: 'Data Collection', icon: 'cloud_download',
      description: 'Gather raw data from various sources — CSV files, databases, APIs, or web scraping. The quality and quantity of data directly impacts the model\'s performance.',
      details: ['Define data requirements', 'Identify sources', 'Extract raw data', 'Store in structured format'],
      action: '#playground', actionLabel: 'Browse Datasets',
    },
    {
      id: 'preprocess', name: 'Preprocessing', icon: 'auto_fix_high',
      description: 'Clean and prepare the data. Handle missing values, remove outliers, normalize features, and encode categorical variables. This is often the most time-consuming step in any ML project.',
      details: ['Handle missing values (imputation)', 'Remove duplicates & outliers', 'Feature scaling (normalization)', 'Encode categorical data'],
      action: '#preprocessing', actionLabel: 'Open Preprocessing Visualizer',
    },
    {
      id: 'split', name: 'Train/Test Split', icon: 'call_split',
      description: 'Split data into training and testing sets (typically 80/20). This ensures the model is evaluated on unseen data to measure how well it generalizes to real-world inputs.',
      details: ['Shuffle data randomly', 'Split into train/test (80/20)', 'Optional: validation set', 'Stratified split for imbalanced data'],
      action: '#train-test-split', actionLabel: 'Open Split Visualizer',
    },
    {
      id: 'select', name: 'Model Selection', icon: 'tune',
      description: 'Choose the right algorithm based on your problem type, data size, and desired interpretability. Compare candidates before committing to a final model.',
      details: ['Classification vs Regression?', 'Linear vs Non-linear?', 'Consider dataset size', 'Evaluate complexity trade-offs'],
      action: '#explorer', actionLabel: 'Browse Algorithms',
    },
    {
      id: 'train', name: 'Training', icon: 'model_training',
      description: 'Feed training data to the model. The algorithm adjusts its internal parameters (weights, splits, centroids) to minimise the loss function — the measure of how wrong its predictions are.',
      details: ['Initialize parameters', 'Forward pass (predictions)', 'Compute loss function', 'Backward pass (gradient descent)'],
      action: '#workspace/linear-regression', actionLabel: 'See Training Live',
    },
    {
      id: 'evaluate', name: 'Evaluation', icon: 'assessment',
      description: 'Measure model performance on the test set using metrics like accuracy, precision, recall, F1-score, or MSE. Identify overfitting or underfitting and iterate as needed.',
      details: ['Predict on test data', 'Compute accuracy / MSE / R²', 'Confusion matrix & F1 Score', 'Cross-validation'],
      action: '#compare', actionLabel: 'Compare Models',
    },
  ];

  let activeIdx = 0;

  container.innerHTML = `
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Pipeline Simulator</div>
        <h1 class="text-display-md">ML Pipeline, Step by Step</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:550px">
          Walk through the complete machine learning workflow — from data collection to evaluation. Click each step or use Next/Previous to navigate.
        </p>
      </div>

      <!-- Pipeline Track -->
      <div class="pipeline-track" id="pipeline-track">
        ${steps.map((s, i) => `
          ${i > 0 ? `<div class="pipeline-connector ${i <= activeIdx ? 'active' : ''}" id="conn-${i}"></div>` : ''}
          <div class="pipeline-step ${i === activeIdx ? 'active' : i < activeIdx ? 'completed' : ''}" id="step-${i}" data-idx="${i}">
            <div class="pipeline-step-circle">
              <span class="material-symbols-outlined" style="font-size:24px;color:${i <= activeIdx ? 'var(--primary)' : 'var(--outline)'}">${s.icon}</span>
            </div>
            <span class="text-label-md" style="color:${i === activeIdx ? 'var(--primary)' : 'var(--outline)'}">${s.name}</span>
          </div>
        `).join('')}
      </div>

      <!-- Detail Panel -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-top:var(--space-2xl)">
        <div class="card-glass" id="pipeline-detail" style="padding:var(--space-xl)">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-lg)">
            <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:rgba(0,209,255,0.1);display:flex;align-items:center;justify-content:center">
              <span class="material-symbols-outlined text-primary" id="detail-icon" style="font-size:24px">${steps[0].icon}</span>
            </div>
            <div>
              <div class="text-label-sm text-dim">Step ${activeIdx + 1} of ${steps.length}</div>
              <h3 class="text-headline-md" id="detail-title">${steps[0].name}</h3>
            </div>
          </div>
          <p class="text-body-md text-muted" id="detail-desc" style="line-height:1.8;margin-bottom:var(--space-lg)">${steps[0].description}</p>
          <div id="detail-checklist">
            ${steps[0].details.map(d => `
              <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                <span class="material-symbols-outlined text-success" style="font-size:18px">check_circle</span>
                <span class="text-body-sm">${d}</span>
              </div>
            `).join('')}
          </div>
          <div id="detail-action" style="margin-top:var(--space-lg)">
            ${steps[0].action ? `<a href="${steps[0].action}" class="btn btn-primary btn-sm">
              <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span> ${steps[0].actionLabel}
            </a>` : ''}
          </div>
        </div>

        <!-- Animated Canvas -->
        <div class="vis-canvas-wrap" style="min-height:350px">
          <canvas id="pipeline-canvas"></canvas>
        </div>
      </div>

      <!-- Nav buttons -->
      <div style="display:flex;justify-content:space-between;margin-top:var(--space-xl)">
        <button class="btn btn-secondary" id="pipeline-prev" ${activeIdx === 0 ? 'disabled style="opacity:0.4"' : ''}>
          <span class="material-symbols-outlined" style="font-size:18px">arrow_back</span>
          Previous
        </button>
        <div style="display:flex;align-items:center;gap:var(--space-md)">
          <span class="text-label-sm text-dim" id="step-counter">Step 1 / ${steps.length}</span>
        </div>
        <button class="btn btn-primary" id="pipeline-next">
          ${activeIdx < steps.length - 1 ? 'Next Step' : 'Restart'}
          <span class="material-symbols-outlined" style="font-size:18px">${activeIdx < steps.length - 1 ? 'arrow_forward' : 'restart_alt'}</span>
        </button>
      </div>
    </div>
  `;

  let pipelineAnim;
  startPipelineAnim();

  function setActive(idx) {
    activeIdx = idx;
    const s = steps[idx];

    steps.forEach((_, i) => {
      const el = document.getElementById(`step-${i}`);
      if (el) {
        el.className = `pipeline-step ${i === idx ? 'active' : i < idx ? 'completed' : ''}`;
        const label = el.querySelector('.text-label-md');
        if (label) label.style.color = i === idx ? 'var(--primary)' : 'var(--outline)';
        const iconEl = el.querySelector('.material-symbols-outlined');
        if (iconEl) iconEl.style.color = i <= idx ? 'var(--primary)' : 'var(--outline)';
      }
      if (i > 0) {
        const conn = document.getElementById(`conn-${i}`);
        if (conn) conn.className = `pipeline-connector ${i <= idx ? 'active' : ''}`;
      }
    });

    document.getElementById('detail-icon').textContent = s.icon;
    document.getElementById('detail-title').textContent = s.name;
    document.getElementById('detail-desc').textContent = s.description;
    document.getElementById('detail-checklist').innerHTML = s.details.map(d => `
      <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
        <span class="material-symbols-outlined text-success" style="font-size:18px">check_circle</span>
        <span class="text-body-sm">${d}</span>
      </div>
    `).join('');
    document.getElementById('detail-action').innerHTML = s.action ? `
      <a href="${s.action}" class="btn btn-primary btn-sm">
        <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span> ${s.actionLabel}
      </a>` : '';
    document.getElementById('step-counter').textContent = `Step ${idx + 1} / ${steps.length}`;

    const prev = document.getElementById('pipeline-prev');
    const next = document.getElementById('pipeline-next');
    if (prev) { prev.disabled = idx === 0; prev.style.opacity = idx === 0 ? '0.4' : '1'; }
    if (next) {
      next.innerHTML = idx < steps.length - 1
        ? 'Next Step <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>'
        : '<span class="material-symbols-outlined" style="font-size:18px">restart_alt</span> Restart';
    }
  }

  steps.forEach((_, i) => {
    const el = document.getElementById(`step-${i}`);
    if (el) el.addEventListener('click', () => setActive(i));
  });

  document.getElementById('pipeline-prev').addEventListener('click', () => { if (activeIdx > 0) setActive(activeIdx - 1); });
  document.getElementById('pipeline-next').addEventListener('click', () => { if (activeIdx < steps.length - 1) setActive(activeIdx + 1); else setActive(0); });

  function startPipelineAnim() {
    const canvas = document.getElementById('pipeline-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height;
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, r: 2 + Math.random() * 3, speed: 0.3 + Math.random() * 0.7, angle: Math.random() * Math.PI * 2, color: ['#00d1ff', '#d0bcff', '#34d399', '#fbbf24'][Math.floor(Math.random() * 4)] });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += Math.cos(p.angle) * p.speed; p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '60'; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(164,230,255,${0.1 * (1 - dist / 80)})`; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      pipelineAnim = requestAnimationFrame(draw);
    }
    draw();
  }

  return () => { if (pipelineAnim) cancelAnimationFrame(pipelineAnim); };
}
