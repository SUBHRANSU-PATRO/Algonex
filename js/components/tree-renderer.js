// ═══════════════════════════════════════════════════
// Tree Renderer — node-link diagram for Decision Tree + Random Forest
// ═══════════════════════════════════════════════════

const NODE_COLORS = {
  internal: 'rgba(0, 209, 255, 0.85)',
  leaf: 'rgba(52, 211, 153, 0.85)',
  line: 'rgba(164, 230, 255, 0.25)',
  bg: 'rgba(11, 19, 38, 0.92)',
  text: 'rgba(218, 226, 253, 0.9)',
  dim: 'rgba(164, 230, 255, 0.5)',
  highlight: '#fbbf24',
};

const CLASS_COLORS = ['#00d1ff', '#d0bcff', '#34d399', '#fbbf24', '#ffb4ab'];

/**
 * Renders a Decision Tree as a node-link diagram on a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {object} treeRoot - { leaf, prediction, feature, threshold, gini, samples, left, right }
 * @param {string[]} classNames - optional class labels
 * @param {function} onNodeClick - callback(node, x, y) when a node is clicked
 */
export function renderTreeDiagram(canvas, treeRoot, classNames = null, onNodeClick = null) {
  if (!canvas || !treeRoot) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const W = rect.width;
  const H = rect.height;
  const padTop = 40;
  const padBot = 30;
  const padSide = 30;

  // 1. Compute tree layout (BFS layer-by-layer)
  const depth = treeDepth(treeRoot);
  const maxDepth = Math.max(depth, 1);
  const levelH = (H - padTop - padBot) / maxDepth;

  // Assign positions via recursive layout
  const nodePositions = [];
  assignPositions(treeRoot, padSide, W - padSide, padTop + 24, levelH, 0, nodePositions);

  // 2. Draw edges
  ctx.lineWidth = 1.5;
  for (const np of nodePositions) {
    if (np.parentX !== null) {
      ctx.strokeStyle = NODE_COLORS.line;
      ctx.beginPath();
      ctx.moveTo(np.parentX, np.parentY);
      ctx.lineTo(np.x, np.y);
      ctx.stroke();
    }
  }

  // 3. Draw nodes
  for (const np of nodePositions) {
    drawNode(ctx, np, classNames);
  }

  // 4. Setup click handler for tooltips
  if (onNodeClick) {
    canvas._treeNodes = nodePositions;
    canvas._treeClickHandler = (e) => {
      const cr = canvas.getBoundingClientRect();
      const mx = e.clientX - cr.left;
      const my = e.clientY - cr.top;
      for (const np of nodePositions) {
        const dx = mx - np.x;
        const dy = my - np.y;
        if (dx * dx + dy * dy < 20 * 20) {
          onNodeClick(np.node, np.x, np.y, canvas);
          return;
        }
      }
    };
    canvas.removeEventListener('click', canvas._prevTreeClick);
    canvas.addEventListener('click', canvas._treeClickHandler);
    canvas._prevTreeClick = canvas._treeClickHandler;
  }
}

function treeDepth(node) {
  if (!node || node.leaf) return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}

function assignPositions(node, xMin, xMax, y, levelH, depth, result, parentX = null, parentY = null) {
  if (!node) return;
  const x = (xMin + xMax) / 2;
  result.push({ node, x, y, depth, parentX, parentY });

  if (!node.leaf) {
    const mid = (xMin + xMax) / 2;
    const nextY = y + levelH;
    assignPositions(node.left, xMin, mid, nextY, levelH, depth + 1, result, x, y);
    assignPositions(node.right, mid, xMax, nextY, levelH, depth + 1, result, x, y);
  }
}

function drawNode(ctx, np, classNames) {
  const { node, x, y } = np;
  const isLeaf = node.leaf;
  const radius = isLeaf ? 16 : 20;

  // Glow
  ctx.shadowColor = isLeaf ? '#34d399' : '#00d1ff';
  ctx.shadowBlur = 8;

  // Node circle
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = isLeaf ? 'rgba(52, 211, 153, 0.15)' : 'rgba(0, 209, 255, 0.1)';
  ctx.fill();
  ctx.strokeStyle = isLeaf ? NODE_COLORS.leaf : NODE_COLORS.internal;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (isLeaf) {
    // Leaf: show predicted class
    const cls = node.prediction;
    const color = CLASS_COLORS[cls % CLASS_COLORS.length];
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    const label = classNames ? (classNames[cls] || `C${cls}`) : `C${cls}`;
    ctx.fillStyle = NODE_COLORS.text;
    ctx.font = 'bold 8px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + radius + 12);
    ctx.fillStyle = NODE_COLORS.dim;
    ctx.font = '7px "Space Grotesk"';
    ctx.fillText(`n=${node.samples}`, x, y + radius + 22);
  } else {
    // Internal: show split info
    const featureLabel = node.feature === 0 ? 'X₁' : 'X₂';
    ctx.fillStyle = NODE_COLORS.text;
    ctx.font = 'bold 9px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`${featureLabel} ≤ ${node.threshold?.toFixed(2)}`, x, y + 3);

    // Gini below
    ctx.fillStyle = NODE_COLORS.dim;
    ctx.font = '7px "Space Grotesk"';
    ctx.fillText(`Gini: ${node.gini?.toFixed(3) || '—'}`, x, y + radius + 13);
    ctx.fillText(`n=${node.samples}`, x, y + radius + 23);
  }
}

/**
 * Shows a tooltip popup with detailed node info
 */
export function showNodeTooltip(node, px, py, canvas, classNames = null) {
  // Remove any existing tooltip
  const existing = document.getElementById('tree-node-tooltip');
  if (existing) existing.remove();

  const tooltip = document.createElement('div');
  tooltip.id = 'tree-node-tooltip';
  tooltip.style.cssText = `
    position: absolute; z-index: 100;
    left: ${px + 24}px; top: ${py - 10}px;
    background: rgba(11, 19, 38, 0.95);
    border: 1px solid rgba(164, 230, 255, 0.2);
    border-radius: 10px;
    padding: 12px 16px;
    color: rgba(218, 226, 253, 0.9);
    font-family: "Space Grotesk", sans-serif;
    font-size: 11px;
    line-height: 1.6;
    max-width: 240px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    pointer-events: auto;
  `;

  if (node.leaf) {
    const cls = node.prediction;
    const label = classNames ? (classNames[cls] || `Class ${cls}`) : `Class ${cls}`;
    tooltip.innerHTML = `
      <div style="font-weight:700;color:#34d399;margin-bottom:4px">🍃 Leaf Node</div>
      <div><strong>Prediction:</strong> ${label}</div>
      <div><strong>Samples:</strong> ${node.samples}</div>
    `;
  } else {
    const featureLabel = node.feature === 0 ? 'Feature 1 (X₁)' : 'Feature 2 (X₂)';
    tooltip.innerHTML = `
      <div style="font-weight:700;color:#00d1ff;margin-bottom:4px">🔀 Split Node</div>
      <div><strong>Feature:</strong> ${featureLabel}</div>
      <div><strong>Threshold:</strong> ≤ ${node.threshold?.toFixed(4)}</div>
      <div><strong>Gini:</strong> ${node.gini?.toFixed(4) || '—'}</div>
      <div><strong>Samples:</strong> ${node.samples}</div>
      <div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(164,230,255,0.1);font-size:10px;color:rgba(164,230,255,0.5)">
        Left: ${featureLabel} ≤ ${node.threshold?.toFixed(2)}<br>
        Right: ${featureLabel} > ${node.threshold?.toFixed(2)}
      </div>
    `;
  }

  // Close button
  const close = document.createElement('span');
  close.textContent = '×';
  close.style.cssText = 'position:absolute;top:4px;right:8px;cursor:pointer;color:rgba(164,230,255,0.4);font-size:14px';
  close.onclick = () => tooltip.remove();
  tooltip.appendChild(close);

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!tooltip.contains(e.target)) {
        tooltip.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 100);

  canvas.parentElement.style.position = 'relative';
  canvas.parentElement.appendChild(tooltip);
}

/**
 * Renders mini tree diagrams for Random Forest voting visualization
 * @param {HTMLElement} container
 * @param {Array} trees - array of tree roots
 * @param {number} qx - query point x
 * @param {number} qy - query point y
 * @param {function} predictWithTree - (root, x, y) => classLabel
 * @param {string[]} classNames
 */
export function renderForestVoting(container, trees, qx, qy, predictWithTree, classNames = null) {
  if (!container || !trees.length) return;

  const votes = {};
  const treeVotes = trees.map((tree, i) => {
    const pred = predictWithTree(tree.root || tree, qx, qy);
    votes[pred] = (votes[pred] || 0) + 1;
    return { index: i, prediction: pred };
  });

  // Find winner
  let winner = 0, maxVotes = 0;
  for (const [cls, count] of Object.entries(votes)) {
    if (count > maxVotes) { winner = parseInt(cls); maxVotes = count; }
  }
  const winnerLabel = classNames ? (classNames[winner] || `Class ${winner}`) : `Class ${winner}`;

  container.innerHTML = `
    <div style="margin-top:var(--space-lg)">
      <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">FOREST VOTING (query at [${qx.toFixed(2)}, ${qy.toFixed(2)}])</div>
      <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;margin-bottom:var(--space-md)">
        ${treeVotes.map(tv => {
          const cls = tv.prediction;
          const color = CLASS_COLORS[cls % CLASS_COLORS.length];
          const label = classNames ? (classNames[cls] || `C${cls}`) : `C${cls}`;
          return `
            <div style="flex:1;min-width:100px;padding:var(--space-md);background:rgba(164,230,255,0.04);border:1px solid rgba(164,230,255,0.1);border-radius:var(--radius-lg);text-align:center">
              <div class="text-label-sm text-dim">Tree ${tv.index + 1}</div>
              <div style="margin:8px 0">
                <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color}"></span>
              </div>
              <div style="font-size:11px;font-weight:600;color:${color}">${label}</div>
            </div>`;
        }).join('')}
      </div>
      <div style="padding:var(--space-md);background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);border-radius:var(--radius-lg);text-align:center">
        <div class="text-label-sm text-dim mb-sm">MAJORITY VOTE</div>
        <div class="text-headline-md" style="color:#34d399;font-weight:800">${winnerLabel}</div>
        <div class="text-body-sm text-muted mt-sm">${maxVotes}/${trees.length} trees agree</div>
      </div>
    </div>`;
}
