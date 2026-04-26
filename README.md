# Algonex — Interactive Machine Learning Visualization Platform

> Explore, learn, and master ML algorithms through real-time, interactive visualizations — all in the browser.

🔗 **Live Demo:** [algonex-xi.vercel.app](https://algonex-xi.vercel.app)

---

## 🎯 Overview

Algonex is a client-side single-page application that brings machine learning algorithms to life through interactive, real-time visualizations. Designed as an educational platform, it enables users to upload datasets, tune hyperparameters, and observe how algorithms learn — step by step.

Built entirely with **Vanilla JavaScript** and **HTML5 Canvas**, Algonex runs 100% in the browser with zero backend dependencies.

---

## ✨ Features

| Module                | Description                                                                  |
|-----------------------|------------------------------------------------------------------------------|
| **Dataset Playground** | Upload CSV files or use preloaded datasets (Iris, Housing, Diabetes, Titanic, Synthetic 2D) |
| **Preprocessing**      | Handle missing values, feature scaling (Standard/MinMax/Robust), normalization |
| **Train-Test Split**   | Visual split with configurable ratio and scatter plot preview                |
| **Algorithm Explorer** | Browse 7 algorithms with difficulty ratings and category tags                |
| **Workspace**          | Interactive canvas with real-time visualization, parameter tuning, and loss curves |
| **Evaluation**         | Confusion matrix, Precision/Recall/F1, R² score, Predicted vs Actual plots  |
| **Compare Mode**       | Side-by-side algorithm comparison with training time and accuracy charts     |
| **Pipeline Simulator** | End-to-end ML pipeline walkthrough                                          |

---

## 🧠 Supported Algorithms

- **Linear Regression** — Gradient descent with animated convergence + residual lines
- **K-Nearest Neighbors (KNN)** — Decision boundaries + neighbor highlighting
- **Decision Tree** — Tree diagram visualization with Gini impurity at each node
- **Random Forest** — Multi-tree ensemble with voting visualization
- **K-Means Clustering** — Animated centroid convergence
- **Support Vector Machine (SVM)** — Margin + support vector visualization
- **Neural Network** — Multi-layer perceptron with live weight updates

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/your-username/algonex.git
cd algonex
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

| Layer          | Technology                                    |
|---------------|-----------------------------------------------|
| Frontend       | Vanilla JavaScript (ES Modules), HTML5, CSS3 |
| Visualization  | HTML5 Canvas API                             |
| Charts         | Chart.js 4.x                                |
| Build Tool     | Vite 6.x                                    |
| Fonts          | Google Fonts (Inter, Space Grotesk, Manrope) |
| Deployment     | Vercel                                       |

---

## 📂 Project Structure

```
algonex/
├── index.html              # Entry point
├── css/index.css           # Complete design system
├── js/
│   ├── main.js             # App bootstrap + routing
│   ├── router.js           # Hash-based SPA router
│   ├── algorithms/         # ML algorithm engines
│   │   ├── linear-regression.js
│   │   ├── knn.js
│   │   ├── decision-tree.js
│   │   ├── random-forest.js
│   │   ├── kmeans.js
│   │   ├── svm.js
│   │   ├── neural-network.js
│   │   └── registry.js
│   ├── components/         # Reusable UI components
│   │   ├── canvas-renderer.js
│   │   ├── navbar.js
│   │   ├── sidebar.js
│   │   └── tree-renderer.js
│   ├── pages/              # Route pages
│   │   ├── landing.js
│   │   ├── explorer.js
│   │   ├── workspace.js
│   │   ├── compare.js
│   │   ├── playground.js
│   │   ├── preprocessing.js
│   │   ├── train-test-split.js
│   │   └── pipeline.js
│   └── utils/              # Shared utilities
│       ├── app-state.js
│       ├── datasets.js
│       ├── csv-parser.js
│       └── math-helpers.js
├── package.json
└── vite.config.js
```

---

## 🌍 SDG Mapping

**SDG 4 — Quality Education**  
*Target 4.4:* Substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment and entrepreneurship.

Algonex provides free, accessible, interactive ML education — empowering anyone with a browser to explore machine learning concepts hands-on.

---

## 👥 Team

| Name            | Role                |
|----------------|---------------------|
| Subhransu Patro | Full-Stack Developer |

---

## 📄 License

This project is developed for educational purposes.
