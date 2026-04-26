# Algonex ML Visualizer — Build Walkthrough

## Summary
Built a fully functional, 6-page interactive ML visualization website from scratch using **Vite + Vanilla JS + Vanilla CSS**. The design system was ported from the Stitch "Algorithm Visualization Workspace" design the user approved.

## Tech Stack
- **Vite** — dev server & bundler
- **Vanilla JS (ES Modules)** — zero framework overhead
- **Vanilla CSS** with CSS custom properties — full design system
- **HTML5 Canvas API** — all real-time algorithm visualizations
- **Chart.js** — available for loss curves (installed)

## Architecture

```
Algonex/
├── index.html          # SPA shell
├── css/index.css       # Complete design system (700+ lines)
├── js/
│   ├── main.js         # Entry point + router wiring
│   ├── router.js       # Hash-based SPA router
│   ├── pages/          # 6 page modules
│   ├── algorithms/     # 5 ML algorithm engines + registry
│   ├── components/     # Navbar, Sidebar, CanvasRenderer
│   └── utils/          # Math helpers, datasets, CSV parser
```

## Pages Built

### 1. Landing Page (`#landing`)
- Hero section with gradient title
- Live animated canvas preview (particles + decision boundary)
- "Why Algonex" feature cards (6 cards)
- Algorithm quick-links grid
- Footer CTA

### 2. Algorithm Explorer (`#explorer`)
- Categorized grid: Supervised / Unsupervised / Deep Learning
- Each card: icon, difficulty badge, description, formula, "Visualize" button
- Click any card → workspace

### 3. Visualization Workspace (`#workspace/{algo}`)
- **Left panel**: Interactive sliders for all algorithm parameters
- **Center panel**: Live HTML5 Canvas with grid, axes, data points, and algorithm-specific visualizations
- **Right panel**: Mathematical formula, parameter readouts, active insights, and theory
- RUN / STEP / RESET controls
- Real-time metrics bar at bottom

### 4. ML Pipeline Simulator (`#pipeline`)
- 6-step horizontal pipeline track with animated connectors
- Clickable steps with detail panels
- Animated particle canvas showing data flow
- Prev/Next navigation

### 5. Compare Mode (`#compare`)
- Dual algorithm selectors
- Split-screen canvases running simultaneously
- Metrics comparison table

### 6. Dataset Playground (`#playground`)
- 3 preloaded dataset cards (Iris, Housing, Titanic)
- Drag-and-drop CSV upload zone
- Auto-detect columns + data preview table

## Algorithms Implemented

| Algorithm | Type | Visualization |
|-----------|------|---------------|
| Linear Regression | Supervised | Gradient descent line fitting with MSE |
| K-Nearest Neighbors | Supervised | Decision boundary heatmap (3 classes) |
| Decision Tree | Supervised | Gini-split boundaries + dashed split lines |
| K-Means Clustering | Unsupervised | Centroid movement + cluster assignment |
| Neural Network (MLP) | Deep Learning | Decision boundary + network architecture diagram |

## Verification

All pages and algorithms tested in the browser:

````carousel
![Landing Page — Hero with animated canvas preview](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777097760794.png)
<!-- slide -->
![Algorithm Explorer — Categorized grid with difficulty badges](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777097772189.png)
<!-- slide -->
![Linear Regression Workspace — 3-panel layout with canvas and controls](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777097783819.png)
<!-- slide -->
![KNN Workspace — 3-class data with parameter controls](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777099001983.png)
<!-- slide -->
![K-Means Clustering — Centroids and cluster assignments](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777099013378.png)
<!-- slide -->
![Neural Network — MLP architecture overlay with moon data](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777099023886.png)
<!-- slide -->
![Compare Mode — Dual algorithm selection with metrics table](C:/Users/subhr/.gemini/antigravity/brain/878352cc-1f31-442e-8c7a-2299cca8815f/.system_generated/click_feedback/click_feedback_1777099042957.png)
````

## Running the Project
```bash
cd Algonex
npm run dev     # → http://localhost:3000
npm run build   # → production bundle in dist/
```
