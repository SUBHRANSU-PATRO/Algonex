(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e,t){this.routes=e,this.container=t,this.currentCleanup=null,window.addEventListener(`hashchange`,()=>this.resolve()),window.addEventListener(`load`,()=>this.resolve())}resolve(){let e=(window.location.hash.slice(1)||`landing`).split(`/`),t=e[0],n=e.slice(1),r=this.routes[t];if(!r){this.navigate(`landing`);return}this.currentCleanup&&typeof this.currentCleanup==`function`&&this.currentCleanup(),this.container.innerHTML=``;let i=r.render(this.container,...n);this.currentCleanup=i||null,document.querySelectorAll(`.navbar-link`).forEach(e=>{let n=(e.getAttribute(`href`)||``).replace(`#`,``).split(`/`)[0];e.classList.toggle(`active`,n===t)}),window.scrollTo(0,0)}navigate(e){window.location.hash=`#${e}`}};function t(e){e.innerHTML=`
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
  `}function n(e){return e.classList.add(`page-content`),e.innerHTML=`
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
          ${[`Linear Regression`,`KNN`,`Decision Tree`,`K-Means`,`Neural Network`].map((e,t)=>`
              <a href="#workspace/${[`linear-regression`,`knn`,`decision-tree`,`kmeans`,`neural-network`][t]}" class="card" style="text-align:center;padding:var(--space-lg) var(--space-md)">
                <div style="width:48px;height:48px;margin:0 auto var(--space-sm);background:rgba(164,230,255,0.08);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center">
                  <span class="material-symbols-outlined" style="color:var(--primary)">${[`show_chart`,`hub`,`account_tree`,`scatter_plot`,`psychology`][t]}</span>
                </div>
                <div class="text-body-sm" style="font-weight:600">${e}</div>
              </a>`).join(``)}
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
  `,r(),()=>{window._heroAnimFrame&&cancelAnimationFrame(window._heroAnimFrame)}}function r(){let e=document.getElementById(`hero-canvas`);if(!e)return;let t=e.getContext(`2d`),n=window.devicePixelRatio||1;function r(){let r=e.parentElement.getBoundingClientRect();e.width=r.width*n,e.height=r.height*n,e.style.width=r.width+`px`,e.style.height=r.height+`px`,t.setTransform(n,0,0,n,0,0)}r();let i=[];for(let e=0;e<60;e++){let t=e<30?0:1;i.push({x:t===0?.15+Math.random()*.35:.5+Math.random()*.35,y:t===0?.5+Math.random()*.35:.15+Math.random()*.35,cls:t,vx:(Math.random()-.5)*.001,vy:(Math.random()-.5)*.001})}let a=-.7;function o(){let r=e.width/n,s=e.height/n;t.clearRect(0,0,r,s),t.strokeStyle=`rgba(164, 230, 255, 0.04)`,t.lineWidth=1;for(let e=0;e<r;e+=40)t.beginPath(),t.moveTo(e,0),t.lineTo(e,s),t.stroke();for(let e=0;e<s;e+=40)t.beginPath(),t.moveTo(0,e),t.lineTo(r,e),t.stroke();a+=5e-4;let c=r/2,l=s/2,u=r;t.strokeStyle=`rgba(0, 209, 255, 0.4)`,t.lineWidth=2,t.shadowBlur=15,t.shadowColor=`rgba(0, 209, 255, 0.5)`,t.beginPath(),t.moveTo(c-u*Math.cos(a),l-u*Math.sin(a)),t.lineTo(c+u*Math.cos(a),l+u*Math.sin(a)),t.stroke(),t.shadowBlur=0;let d=[`#00d1ff`,`#d0bcff`];for(let e of i){e.x+=e.vx,e.y+=e.vy,(e.x<.05||e.x>.95)&&(e.vx*=-1),(e.y<.05||e.y>.95)&&(e.vy*=-1);let n=e.x*r,i=e.y*s;t.beginPath(),t.arc(n,i,5,0,Math.PI*2),t.fillStyle=d[e.cls]+`30`,t.fill(),t.beginPath(),t.arc(n,i,3,0,Math.PI*2),t.fillStyle=d[e.cls],t.fill()}window._heroAnimFrame=requestAnimationFrame(o)}o()}var i=[{id:`linear-regression`,name:`Linear Regression`,category:`Supervised Learning`,difficulty:`Beginner`,icon:`show_chart`,description:`Fit a line to data using gradient descent. Understand how weights and bias update to minimize the loss function.`,formula:`y = wx + b`},{id:`knn`,name:`K-Nearest Neighbors`,category:`Supervised Learning`,difficulty:`Beginner`,icon:`hub`,description:`Classify points by majority vote of their K closest neighbors. Watch decision boundaries shift with K.`,formula:`d(p, q) = √Σ(pᵢ - qᵢ)²`},{id:`decision-tree`,name:`Decision Tree`,category:`Supervised Learning`,difficulty:`Intermediate`,icon:`account_tree`,description:`Recursive binary splitting to create axis-aligned decision boundaries. Visualize tree growth in real time.`,formula:`Gini = 1 - Σpᵢ²`},{id:`random-forest`,name:`Random Forest`,category:`Supervised Learning`,difficulty:`Advanced`,icon:`forest`,description:`Ensemble of Decision Trees trained on bootstrap samples. Combines multiple weak learners via majority voting.`,formula:`Ŷ = mode(T₁..Tₙ)`},{id:`kmeans`,name:`K-Means Clustering`,category:`Unsupervised Learning`,difficulty:`Beginner`,icon:`scatter_plot`,description:`Partition data into K clusters by iteratively updating centroids. Watch clusters form step by step.`,formula:`J = Σ||xᵢ - μₖ||²`},{id:`svm`,name:`Support Vector Machine`,category:`Supervised Learning`,difficulty:`Intermediate`,icon:`space_dashboard`,description:`Maximize the margin between classes using hinge loss gradient descent. Visualize margin lines, support vectors, and boundary evolution.`,formula:`max 2/||w||  s.t. yᵢ(w·x+b)≥1`},{id:`neural-network`,name:`Neural Network`,category:`Deep Learning`,difficulty:`Advanced`,icon:`psychology`,description:`Simple multi-layer perceptron with forward pass and backpropagation. See weights and activations update live.`,formula:`z = σ(Wx + b)`}];function a(e){return i.find(t=>t.id===e)}function o(e){e.classList.add(`page-content`);let t={};i.forEach(e=>{t[e.category]||(t[e.category]=[]),t[e.category].push(e)});let n=e=>`<span class="chip ${e===`Beginner`?`badge-beginner`:e===`Intermediate`?`badge-intermediate`:`badge-advanced`}">${e}</span>`,r=``;for(let[e,i]of Object.entries(t)){let t=e.includes(`Supervised`)?`school`:e.includes(`Unsupervised`)?`explore`:`psychology`;r+=`
      <div style="margin-bottom:var(--space-2xl)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-lg)">
          <span class="material-symbols-outlined text-primary" style="font-size:24px">${t}</span>
          <h2 class="text-headline-md">${e}</h2>
          <span class="chip chip-primary">${i.length}</span>
        </div>
        <div class="algo-grid">
          ${i.map(e=>`
            <div class="algo-card" onclick="location.hash='#workspace/${e.id}'">
              <div class="algo-card-header">
                <div class="algo-card-icon">
                  <span class="material-symbols-outlined">${e.icon}</span>
                </div>
                ${n(e.difficulty)}
              </div>
              <h3 class="algo-card-title">${e.name}</h3>
              <p class="algo-card-desc">${e.description}</p>
              <div class="algo-card-footer">
                <code class="text-label-sm text-primary" style="font-family:var(--font-label);opacity:0.6">${e.formula}</code>
                <button class="btn btn-primary btn-sm">
                  <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span>
                  Visualize
                </button>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>
    `}e.innerHTML=`
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

      ${r}
    </div>
  `}function s(e,t){let n=0;for(let r=0;r<e.length;r++)n+=(e[r]-t[r])**2;return Math.sqrt(n)}function c(e){return 1/(1+Math.exp(-e))}function l(e){let t=c(e);return t*(1-t)}function u(e,t){let n=0;for(let r=0;r<e.length;r++)n+=(e[r]-t[r])**2;return n/e.length}function d(e=0,t=1){let n=Math.random(),r=Math.random();return e+t*Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*r)}function f(e,t,n=.1){let r=[],i=[];return t.forEach((t,a)=>{for(let o=0;o<e;o++)r.push([t[0]+d(0,n),t[1]+d(0,n)]),i.push(a)}),{points:r,labels:i}}function p(e,t=1.5,n=.2,r=.15){let i=[];for(let a=0;a<e;a++){let e=Math.random(),a=t*e+n+d(0,r);i.push([e,a])}return i}function m(e,t=.08){let n=[],r=[];for(let i=0;i<e;i++){let a=i/e*Math.PI;n.push([.3+.3*Math.cos(a)+d(0,t),.4+.3*Math.sin(a)+d(0,t)]),r.push(0),n.push([.7-.3*Math.cos(a)+d(0,t),.6-.3*Math.sin(a)+d(0,t)]),r.push(1)}return{points:n,labels:r}}function h(){let e=Math.random()*.5,t=Math.random()*.5,n=p(60),r=0,i=[],a={learningRate:{value:.5,min:.01,max:2,step:.01,label:`Learning Rate`},epochs:{value:200,min:10,max:1e3,step:10,label:`Max Epochs`},dataPoints:{value:60,min:20,max:150,step:5,label:`Data Points`},noise:{value:.15,min:.01,max:.4,step:.01,label:`Noise Level`}};function o(n){return e*n+t}function s(a){let s=n.length,c=0,l=0;for(let[e,t]of n){let n=o(e)-t;c+=2/s*n*e,l+=2/s*n}e-=a*c,t-=a*l,r++;let d=u(n.map(([e])=>o(e)),n.map(([,e])=>e));return i.push(d),d}function c(a){e=Math.random()*.5,t=Math.random()*.5,r=0,i=[],n=p(a.dataPoints||60,1.5,.2,a.noise||.15)}function l(e){e.clear(),e.drawGrid(),e.drawAxes(`Feature X`,`Target Y`),e.drawPoints(n,null,4),e.drawLine(0,o(0),1,o(1),`#00d1ff`,2.5)}function d(){return n.map(([e,t])=>({predicted:o(e),actual:t,x:e}))}function f(e,t){return{learningRate:t<.05?`⚠️ Very small learning rate — convergence will be very slow. The line moves in tiny steps toward the optimum.`:t<.3?`✓ Small-moderate learning rate — stable, reliable convergence. Good starting point.`:t<1?`✓ Moderate learning rate — fast convergence. Watch for slight oscillation near the minimum.`:`⚠️ High learning rate — risk of overshooting the optimum. Loss may oscillate or diverge. Reduce if loss spikes.`,epochs:t<50?`⚠️ Very few epochs — model may not converge fully. Increase if final loss is still high.`:t<200?`✓ Moderate epochs — sufficient for most linear problems with a good learning rate.`:`✓ Many epochs — ensures thorough convergence. Diminishing returns after the loss flattens.`,dataPoints:`Using ${t} data points. More points give a more reliable estimate of the true relationship, but slow training.`,noise:t<.05?`✓ Low noise — data closely follows the linear trend. R² will be very high.`:t<.2?`✓ Moderate noise — realistic scenario. Some scatter around the line, but the trend is clear.`:`⚠️ High noise — data has a lot of scatter. Linear regression will still find the best-fit line, but R² will be lower.`}[e]||``}function m(){let n=i.length>0?i[i.length-1]:null;return{title:`Linear Regression`,currentStep:`Epoch ${r}`,formula:`y = ${e.toFixed(4)}x + ${t.toFixed(4)}`,parameters:[{name:`Weight (w)`,value:e.toFixed(4),color:`primary`},{name:`Bias (b)`,value:t.toFixed(4),color:`secondary`},{name:`Loss (MSE)`,value:n===null?`—`:n.toFixed(6),color:n<.01?`success`:`warning`}],insight:r===0?`Press RUN to begin gradient descent. The line adjusts its slope and intercept to minimise Mean Squared Error — the average of squared prediction errors.`:n<.01?`Converged! The model has found a good fit with MSE = ${n.toFixed(6)}. The line now represents the best linear relationship in your data.`:`Gradient descent is adjusting weight (w) and bias (b) to reduce loss. Current direction: w ${e>0?`↗`:`↘`}.`,theory:`Linear Regression finds the line ŷ = wx + b that minimises the Mean Squared Error (MSE). Gradient descent iteratively adjusts w and b by moving in the direction of the negative gradient: w ← w - α·(∂MSE/∂w).`}}function h(){let a=i.length>0?i[i.length-1]:null,s=n.map(([e])=>o(e)),c=n.map(([,e])=>e),l=s.reduce((e,t,n)=>e+(t-c[n])**2,0),u=c.reduce((e,t)=>e+t,0)/c.length,d=c.reduce((e,t)=>e+(t-u)**2,0),f=d>0?1-l/d:0,p=s.reduce((e,t,n)=>e+Math.abs(t-c[n]),0)/s.length;return{Epochs:r,"Loss (MSE)":a===null?`—`:a.toFixed(6),MAE:p.toFixed(4),"R² Score":f.toFixed(4),Weight:e.toFixed(4),Bias:t.toFixed(4)}}function g(){return null}return{params:a,predict:(e,t)=>o(e)>t?0:1,step:s,reset:c,render:l,getExplanation:m,getMetrics:h,getConfusionMatrix:g,getParamExplanation:f,getPredVsActual:d,get lossHistory(){return i},get epoch(){return r},get data(){return n}}}function g(){let e={points:[],labels:[]},t=5,n=!1,r={k:{value:5,min:1,max:25,step:2,label:`K (Neighbors)`},dataPoints:{value:40,min:10,max:80,step:5,label:`Points per Class`},spread:{value:.12,min:.05,max:.25,step:.01,label:`Cluster Spread`}};function i(n,r){let i=e.points.map((t,i)=>({dist:s([n,r],t),label:e.labels[i]}));i.sort((e,t)=>e.dist-t.dist);let a=i.slice(0,t),o={};for(let e of a)o[e.label]=(o[e.label]||0)+1;let c=0,l=0;for(let[e,t]of Object.entries(o))t>c&&(c=t,l=parseInt(e));return l}function a(r){t=r.k||5,e=f(r.dataPoints||40,[[.25,.75],[.75,.25],[.75,.75]],r.spread||.12),n=!1}function o(){n=!0}function c(n,r){let i=e.points.map((t,i)=>({idx:i,dist:s([n,r],t),label:e.labels[i]}));return i.sort((e,t)=>e.dist-t.dist),i.slice(0,t)}function l(t){t.clear(),t.drawGrid(),t.drawAxes(`Feature 1`,`Feature 2`),n&&t.drawDecisionBoundary((e,t)=>i(e,t),60),t.drawPoints(e.points,e.labels,5)}function u(){let t=[...new Set(e.labels)],n={};for(let e of t)n[e]={tp:0,fp:0,fn:0};for(let t=0;t<e.points.length;t++){let r=i(e.points[t][0],e.points[t][1]),a=e.labels[t];r===a?n[a].tp++:(n[r]=n[r]||{tp:0,fp:0,fn:0},n[r].fp++,n[a].fn++)}let r=0,a=0,o=0,s=0;for(let e of t){let t=n[e].tp/(n[e].tp+(n[e].fp||0)+1e-9),i=n[e].tp/(n[e].tp+n[e].fn+1e-9),c=2*t*i/(t+i+1e-9);r+=t,a+=i,o+=c,s++}return{precision:r/s,recall:a/s,f1:o/s,confMatrix:n,classes:t}}function d(e,t){return{k:t<=1?`⚠️ K=1 memorises training data exactly — maximum variance, zero bias. Very sensitive to noise and outliers.`:t<=5?`✓ Small K captures local patterns well. Good for complex boundaries but can overfit noisy data.`:t<=15?`✓ Moderate K smooths the decision boundary. Balances bias and variance well.`:`📊 Large K creates very smooth boundaries. Low variance but may miss fine-grained class separations (high bias).`,dataPoints:`Using ${t} points per class. More data generally improves KNN accuracy and boundary quality.`,spread:t<.08?`✓ Tight clusters — classes are well-separated. KNN will find clean, clear boundaries.`:t<.15?`✓ Moderate spread — some overlap near boundaries. Realistic scenario for real-world data.`:`⚠️ High spread — significant class overlap. KNN may struggle at the boundaries. Try increasing K.`}[e]||``}function p(){return{title:`K-Nearest Neighbors`,currentStep:n?`Boundary Computed`:`Ready`,formula:`d(p,q) = √Σ(pᵢ - qᵢ)²`,parameters:[{name:`K`,value:t,color:`primary`},{name:`Classes`,value:`3`,color:`secondary`},{name:`Points`,value:e.points.length,color:`success`}],insight:n?`With K=${t}, each point is classified by majority vote of its ${t} nearest neighbours. ${t>10?`Higher K → smoother boundaries, but may miss local patterns.`:`Lower K → tighter boundaries that follow the data more closely.`}`:`Press RUN to compute the decision boundary. KNN classifies each region of the space by polling its K nearest training samples.`,theory:`KNN is a lazy learner — it stores all training data and classifies via distance-weighted voting at prediction time. No explicit model is trained. Complexity is O(n) per prediction, making it slow for large datasets.`}}function m(){let r=0;for(let t=0;t<e.points.length;t++)i(e.points[t][0],e.points[t][1])===e.labels[t]&&r++;let a=r/e.points.length;if(!n)return{Status:`Run to see metrics`};let o=u();return{Accuracy:(a*100).toFixed(1)+`%`,Precision:(o.precision*100).toFixed(1)+`%`,Recall:(o.recall*100).toFixed(1)+`%`,"F1 Score":(o.f1*100).toFixed(1)+`%`,K:t,"Total Points":e.points.length}}function h(){if(!n)return null;let t=[...new Set(e.labels)].sort(),r=t.map(()=>t.map(()=>0));for(let n=0;n<e.points.length;n++){let a=i(e.points[n][0],e.points[n][1]),o=e.labels[n],s=t.indexOf(o),c=t.indexOf(a);s>=0&&c>=0&&r[s][c]++}return{matrix:r,classes:t}}return{params:r,predict:i,step:o,reset:a,render:l,getExplanation:p,getMetrics:m,getConfusionMatrix:h,getParamExplanation:d,getNeighbors:c,get data(){return e},get k(){return t},get boundaryDrawn(){return n}}}function _(){let e={points:[],labels:[]},t=null,n=4,r=5,i=!1,a=0,o={maxDepth:{value:4,min:1,max:10,step:1,label:`Max Depth`},minSamples:{value:5,min:2,max:20,step:1,label:`Min Samples Split`},dataPoints:{value:40,min:15,max:80,step:5,label:`Points per Class`},spread:{value:.13,min:.05,max:.25,step:.01,label:`Cluster Spread`}};function s(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;let n=1;for(let r in t){let i=t[r]/e.length;n-=i*i}return n}function c(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;let n=e[0],r=0;for(let[e,i]of Object.entries(t))i>r&&(n=parseInt(e),r=i);return n}function l(t,i){let a=t.map(t=>e.labels[t]);if(i>=n||t.length<r||s(a)===0)return{leaf:!0,prediction:c(a),samples:t.length};let o=0,u=.5,d=1/0,f=[],p=[];for(let n=0;n<2;n++){let r=t.map(t=>e.points[t][n]).sort((e,t)=>e-t),i=[];for(let e=1;e<r.length;e++)r[e]!==r[e-1]&&i.push((r[e]+r[e-1])/2);for(let r of i){let i=t.filter(t=>e.points[t][n]<=r),a=t.filter(t=>e.points[t][n]>r);if(!i.length||!a.length)continue;let c=(i.length*s(i.map(t=>e.labels[t]))+a.length*s(a.map(t=>e.labels[t])))/t.length;c<d&&(d=c,o=n,u=r,f=i,p=a)}}return!f.length||!p.length?{leaf:!0,prediction:c(a),samples:t.length}:{leaf:!1,feature:o,threshold:u,gini:d,samples:t.length,left:l(f,i+1),right:l(p,i+1)}}function u(e,n,r=t,i=0,a=99){return r?r.leaf||i>=a?r.prediction??0:(r.feature===0?e:n)<=r.threshold?u(e,n,r.left,i+1,a):u(e,n,r.right,i+1,a):0}function d(o){n=o.maxDepth||4,r=o.minSamples||5,e=f(o.dataPoints||40,[[.3,.7],[.7,.3]],o.spread||.13),t=null,i=!1,a=0}function p(){i?a=Math.min(a+1,_(t)):(t=l(e.points.map((e,t)=>t),0),i=!0,a=0)}function m(n){if(n.clear(),n.drawGrid(),n.drawAxes(`Feature 1`,`Feature 2`),i&&t){let e=a>=_(t)?99:a;n.drawDecisionBoundary((n,r)=>u(n,r,t,0,e),80),h(n,t,0,1,0,1,0,e)}n.drawPoints(e.points,e.labels,5)}function h(e,t,n,r,i,a,o=0,s=99){if(!t||t.leaf||o>s)return;let c=e.ctx;if(c.strokeStyle=`rgba(164, 230, 255, ${Math.max(.12,.4-o*.06)})`,c.lineWidth=1,c.setLineDash([4,4]),t.feature===0){let[l,u]=e.toPixel(t.threshold,i),[,d]=e.toPixel(t.threshold,a);c.beginPath(),c.moveTo(l,u),c.lineTo(l,d),c.stroke(),h(e,t.left,n,t.threshold,i,a,o+1,s),h(e,t.right,t.threshold,r,i,a,o+1,s)}else{let[l,u]=e.toPixel(n,t.threshold),[d]=e.toPixel(r,t.threshold);c.beginPath(),c.moveTo(l,u),c.lineTo(d,u),c.stroke(),h(e,t.left,n,r,i,t.threshold,o+1,s),h(e,t.right,n,r,t.threshold,a,o+1,s)}c.setLineDash([])}function g(e){return e?e.leaf?1:1+g(e.left)+g(e.right):0}function _(e){return!e||e.leaf?0:1+Math.max(_(e.left),_(e.right))}function v(e,t){return{maxDepth:t<=2?`✓ Very shallow tree — simple rules, fast to explain. May underfit complex patterns.`:t<=5?`✓ Moderate depth — captures meaningful splits without excessive complexity.`:`⚠️ Deep tree — learns very detailed rules. High risk of overfitting on training data. Use with pruning.`,minSamples:t<=2?`⚠️ Very small minimum — tree will split even tiny groups. May overfit noisy data.`:t<=8?`✓ Reasonable threshold — prevents overly specific splits while capturing real patterns.`:`✓ Conservative split — tree stays general and avoids noise. Good when data is limited.`,dataPoints:`Using ${t} points per class (${t*2} total). More samples give the tree more split candidates to evaluate.`,spread:t<.1?`✓ Tight clusters — tree will find clean, axis-aligned splits easily.`:t<.18?`✓ Moderate spread — realistic overlap near boundaries. Decision tree will use multiple splits.`:`⚠️ High spread — significant overlap. Deeper trees or different algorithms may perform better.`}[e]||``}function y(){if(!i)return null;let t=[...new Set(e.labels)],n={};for(let e of t)n[e]={tp:0,fp:0,fn:0};for(let t=0;t<e.points.length;t++){let r=u(e.points[t][0],e.points[t][1]),i=e.labels[t];r===i?n[i].tp++:(n[r]=n[r]||{tp:0,fp:0,fn:0},n[r].fp++,n[i].fn++)}let r=0,a=0,o=0,s=0;for(let e of t){let t=n[e].tp/(n[e].tp+(n[e].fp||0)+1e-9),i=n[e].tp/(n[e].tp+n[e].fn+1e-9);o+=2*t*i/(t+i+1e-9),r+=t,a+=i,s++}return{precision:r/s,recall:a/s,f1:o/s}}function b(){if(!i)return null;let t=[...new Set(e.labels)].sort(),n=t.map(()=>t.map(()=>0));for(let r=0;r<e.points.length;r++){let i=u(e.points[r][0],e.points[r][1]),a=e.labels[r],o=t.indexOf(a),s=t.indexOf(i);o>=0&&s>=0&&n[o][s]++}return{matrix:n,classes:t}}function x(){let e=t?_(t):0;return{title:`Decision Tree`,currentStep:i?a>=e?`Tree Complete`:`Revealing Depth ${a}/${e}`:`Ready`,formula:`Gini = 1 - Σpᵢ²`,parameters:[{name:`Max Depth`,value:n,color:`primary`},{name:`Min Samples`,value:r,color:`secondary`},{name:`Nodes`,value:t?g(t):`—`,color:`success`},{name:`Actual Depth`,value:t?e:`—`,color:`warning`}],insight:i?a<e?`Showing depth ${a} of ${e}. Press Step to reveal the next split level — watch how each boundary further refines the classification regions.`:`Tree complete with ${g(t)} nodes at depth ${e}. ${n>6?`Deep trees capture fine detail but risk memorising training data.`:`Shallower trees generalise better to new data.`}`:`Press RUN to build the decision tree. Use Step to reveal splits level-by-level and watch how the tree partitions the space.`,theory:`A Decision Tree splits data using axis-aligned boundaries. At each node, it picks the feature threshold that produces the purest child partitions (lowest Gini impurity). Simple to interpret — you can trace any prediction step by step.`}}function S(){if(!i)return{Status:`Run to see metrics`};let n=0;for(let t=0;t<e.points.length;t++)u(e.points[t][0],e.points[t][1])===e.labels[t]&&n++;let r=n/e.points.length,a=y();return{Accuracy:(r*100).toFixed(1)+`%`,Precision:(a.precision*100).toFixed(1)+`%`,Recall:(a.recall*100).toFixed(1)+`%`,"F1 Score":(a.f1*100).toFixed(1)+`%`,Nodes:g(t),"Tree Depth":_(t)}}return{params:o,predict:(e,t)=>u(e,t),step:p,reset:d,render:m,getExplanation:x,getMetrics:S,getConfusionMatrix:b,getParamExplanation:v,get data(){return e},get revealDepth(){return a}}}function v(){let e={points:[],labels:[]},t=[],n=[],r=0,i=!1,a=3,o=[],c={k:{value:3,min:2,max:8,step:1,label:`Clusters (K)`},maxIterations:{value:30,min:5,max:100,step:5,label:`Max Iterations`},dataPoints:{value:50,min:20,max:100,step:5,label:`Points per Cluster`},spread:{value:.1,min:.04,max:.2,step:.01,label:`Cluster Spread`}};function l(){t=[];let r=[...e.points].sort(()=>Math.random()-.5);for(let e=0;e<a;e++)t.push([...r[e]]);n=Array(e.points.length).fill(0)}function u(){let r=!1;for(let i=0;i<e.points.length;i++){let a=1/0,o=0;for(let n=0;n<t.length;n++){let r=s(e.points[i],t[n]);r<a&&(a=r,o=n)}n[i]!==o&&(r=!0),n[i]=o}return r}function d(){for(let r=0;r<a;r++){let i=e.points.filter((e,t)=>n[t]===r);i.length>0&&(t[r]=[i.reduce((e,t)=>e+t[0],0)/i.length,i.reduce((e,t)=>e+t[1],0)/i.length])}}function p(){if(i)return;let e=u();d(),r++,o.push(t.map(e=>[...e])),e||(i=!0)}function m(t){a=t.k||3;let n=t.dataPoints||50,s=t.spread||.1,c=[];for(let e=0;e<a;e++)c.push([.15+Math.random()*.7,.15+Math.random()*.7]);e=f(n,c,s),r=0,i=!1,o=[],l()}function h(r){r.clear(),r.drawGrid(),r.drawAxes(`Dimension 1`,`Dimension 2`),r.drawPoints(e.points,n,4);let i=r.ctx;if(o.length>1)for(let e=0;e<a;e++){let n=r.getColor(e);i.setLineDash([3,4]),i.lineWidth=1.5,i.strokeStyle=n+`50`,i.beginPath();for(let t=0;t<o.length;t++){let[n,a]=r.toPixel(o[t][e][0],o[t][e][1]);t===0?i.moveTo(n,a):i.lineTo(n,a)}let[a,s]=r.toPixel(t[e][0],t[e][1]);i.lineTo(a,s),i.stroke(),i.setLineDash([]);for(let t=0;t<o.length;t++){let[a,s]=r.toPixel(o[t][e][0],o[t][e][1]);i.beginPath(),i.arc(a,s,2.5,0,Math.PI*2),i.fillStyle=n+`60`,i.fill()}}r.drawCentroids(t,10);for(let a=0;a<e.points.length;a++){let[o,s]=r.toPixel(e.points[a][0],e.points[a][1]),[c,l]=r.toPixel(t[n[a]][0],t[n[a]][1]);i.strokeStyle=r.getColor(n[a])+`15`,i.lineWidth=1,i.beginPath(),i.moveTo(o,s),i.lineTo(c,l),i.stroke()}}function g(){let r=0;for(let i=0;i<e.points.length;i++)r+=s(e.points[i],t[n[i]])**2;return r}function _(){return{title:`K-Means Clustering`,currentStep:i?`Converged`:`Iteration ${r}`,formula:`J = Σ||xᵢ - μₖ||²`,parameters:[{name:`K`,value:a,color:`primary`},{name:`Iteration`,value:r,color:`secondary`},{name:`Inertia`,value:r>0?g().toFixed(4):`—`,color:i?`success`:`warning`}],insight:i?`Converged after ${r} iterations! Centroids no longer move — each point is assigned to its nearest cluster center.`:r===0?`Press RUN to start. Each step: (1) Assign points to nearest centroid, (2) Recompute centroid positions.`:`Centroids are moving toward cluster centers. Watch the assignments shift as boundaries update.`,theory:`K-Means minimizes total within-cluster sum of squares (inertia). It alternates between assigning points to the nearest centroid and recalculating centroids as cluster means.`}}function v(){return{K:a,Iterations:r,Inertia:r>0?g().toFixed(4):`—`,Converged:i?`Yes`:`No`,Points:e.points.length}}function y(){return null}return{params:c,predict:null,step:p,reset:m,render:h,getExplanation:_,getMetrics:v,getConfusionMatrix:y,get data(){return e},get converged(){return i},get centroidHistory(){return o},get iteration(){return r}}}function y(){let e={points:[],labels:[]},t={},n=0,r=[],i=[2,6,6,1],a={learningRate:{value:1,min:.1,max:5,step:.1,label:`Learning Rate`},epochs:{value:300,min:50,max:1e3,step:50,label:`Max Epochs`},hiddenSize:{value:6,min:2,max:12,step:1,label:`Neurons per Layer`},dataPoints:{value:50,min:20,max:100,step:5,label:`Points per Class`}};function o(){t={};for(let e=1;e<i.length;e++){t[`w${e}`]=[],t[`b${e}`]=[];for(let n=0;n<i[e];n++){t[`w${e}`][n]=[];for(let r=0;r<i[e-1];r++)t[`w${e}`][n][r]=(Math.random()-.5)*2/Math.sqrt(i[e-1]);t[`b${e}`][n]=0}}}function s(e){let n=[e],r=[e],a=e;for(let e=1;e<i.length;e++){let o=[],s=[];for(let n=0;n<i[e];n++){let r=t[`b${e}`][n];for(let o=0;o<i[e-1];o++)r+=t[`w${e}`][n][o]*a[o];s.push(r),o.push(c(r))}r.push(s),n.push(o),a=o}return{activations:n,zValues:r}}function u(a){let o=0;for(let n=0;n<e.points.length;n++){let{activations:r,zValues:c}=s(e.points[n]),u=r[r.length-1][0]-e.labels[n];o+=u*u;let d=[];for(let e=0;e<i.length;e++)d.push([]);d[i.length-1]=[u*l(c[i.length-1][0])];for(let e=i.length-2;e>=1;e--)for(let n=0;n<i[e];n++){let r=0;for(let a=0;a<i[e+1];a++)r+=t[`w${e+1}`][a][n]*d[e+1][a];d[e][n]=r*l(c[e][n])}for(let e=1;e<i.length;e++)for(let n=0;n<i[e];n++){for(let o=0;o<i[e-1];o++)t[`w${e}`][n][o]-=a*d[e][n]*r[e-1][o];t[`b${e}`][n]-=a*d[e][n]}}n++;let c=o/e.points.length;return r.push(c),c}function d(e,t){let{activations:n}=s([e,t]);return+(n[n.length-1][0]>.5)}function f(t){let a=t.hiddenSize||6;i=[2,a,a,1],e=m(t.dataPoints||50,.08),n=0,r=[],o()}function p(e){return u(e)}function h(t){t.clear(),t.drawGrid(),t.drawAxes(`X₁`,`X₂`),n>0&&t.drawDecisionBoundary((e,t)=>d(e,t),50),t.drawPoints(e.points,e.labels,4),g(t)}function g(n){let r=n.ctx,a=n.width;n.height;let o=a-160-20;r.fillStyle=`rgba(11, 19, 38, 0.85)`,r.strokeStyle=`rgba(164, 230, 255, 0.15)`,r.lineWidth=1,r.beginPath(),r.roundRect(o,20,160,180,12),r.fill(),r.stroke(),r.fillStyle=`rgba(164, 230, 255, 0.5)`,r.font=`9px "Space Grotesk"`,r.textAlign=`center`,r.fillText(`NETWORK ARCHITECTURE`,o+160/2,36);let c=[],l=160/(i.length+1);for(let e=0;e<i.length;e++)c.push(o+l*(e+1));let{activations:u}=s(e.points.length>0?e.points[0]:[.5,.5]);for(let e=1;e<i.length;e++){let n=Math.min(i[e-1],6),a=Math.min(i[e],6),o=130/(n+1),s=130/(a+1);for(let i=0;i<n;i++)for(let n=0;n<a;n++){let a=t[`w${e}`]&&t[`w${e}`][n]?Math.abs(t[`w${e}`][n][i]||0):0;r.strokeStyle=`rgba(164, 230, 255, ${Math.min(.5,a*.3)})`,r.lineWidth=.5,r.beginPath(),r.moveTo(c[e-1],50+o*(i+1)),r.lineTo(c[e],50+s*(n+1)),r.stroke()}}for(let e=0;e<i.length;e++){let t=Math.min(i[e],6),n=130/(t+1);for(let i=0;i<t;i++){let t=c[e],a=50+n*(i+1),o=u[e]&&u[e][i]||0,s=Math.floor(o*200);r.beginPath(),r.arc(t,a,5,0,Math.PI*2),r.fillStyle=e===0?`rgba(0, 209, 255, 0.8)`:`rgba(${s}, ${s+50}, 255, 0.9)`,r.fill(),r.strokeStyle=`rgba(164, 230, 255, 0.3)`,r.lineWidth=.5,r.stroke()}}}function _(){let e=0;for(let t=1;t<i.length;t++)e+=i[t]*i[t-1]+i[t];return e}function v(e,t){return{learningRate:t<.3?`⚠️ Small learning rate — stable but may need many epochs to converge. Good for fine-tuning.`:t<2?`✓ Moderate learning rate — good balance of speed and stability for this network.`:`⚠️ High learning rate — risk of overshooting. Loss may oscillate. Reduce if the boundary looks erratic.`,epochs:t<100?`⚠️ Few epochs — the network may not learn the non-linear pattern. Increase for better results.`:t<400?`✓ Sufficient epochs for this network size. Watch the boundary emerge gradually.`:`✓ Many epochs — thorough training. Useful for complex patterns but watch for overfitting.`,hiddenSize:t<=2?`⚠️ Very small hidden layers — limited capacity. May not capture non-linear patterns well.`:t<=6?`✓ Moderate neuron count — good capacity for the moon dataset without over-parameterisation.`:`✓ Large hidden layers — high capacity. Good for complex boundaries. More parameters to train.`,dataPoints:`Using ${t} points per class (${t*2} total). Neural networks typically need more data than simpler models.`}[e]||``}function y(){let t=[...new Set(e.labels)],n={};for(let e of t)n[e]={tp:0,fp:0,fn:0};for(let t=0;t<e.points.length;t++){let r=d(e.points[t][0],e.points[t][1]),i=e.labels[t];r===i?n[i].tp++:(n[r]=n[r]||{tp:0,fp:0,fn:0},n[r].fp++,n[i].fn++)}let r=0,i=0,a=0,o=0;for(let e of t){let t=n[e].tp/(n[e].tp+(n[e].fp||0)+1e-9),s=n[e].tp/(n[e].tp+n[e].fn+1e-9);a+=2*t*s/(t+s+1e-9),r+=t,i+=s,o++}return{precision:r/o,recall:i/o,f1:a/o}}function b(){if(n===0)return null;let t=[...new Set(e.labels)].sort(),r=t.map(()=>t.map(()=>0));for(let n=0;n<e.points.length;n++){let i=d(e.points[n][0],e.points[n][1]),a=e.labels[n],o=t.indexOf(a),s=t.indexOf(i);o>=0&&s>=0&&r[o][s]++}return{matrix:r,classes:t}}function x(){let e=r.length>0?r[r.length-1]:null;return{title:`Neural Network (MLP)`,currentStep:`Epoch ${n}`,formula:`z = σ(Wx + b)`,parameters:[{name:`Architecture`,value:i.join(` → `),color:`primary`},{name:`Epoch`,value:n,color:`secondary`},{name:`Loss`,value:e===null?`—`:e.toFixed(6),color:e&&e<.1?`success`:`warning`},{name:`Parameters`,value:_(),color:`primary`}],insight:n===0?`Press RUN to train. The network learns non-linear boundaries by adjusting weights through backpropagation — error flows backward to update each connection.`:e&&e<.05?`Network converging! Loss is ${e.toFixed(4)}. The decision boundary now captures the curved moon pattern.`:`Backpropagation is adjusting ${_()} parameters. Watch the boundary emerge as training progresses.`,theory:`A Multi-Layer Perceptron uses layers of neurons with sigmoid activations. Error backpropagates through the chain rule, updating each weight proportional to its contribution to the total error.`}}function S(){let t=r.length>0?r[r.length-1]:null,i=0;for(let t=0;t<e.points.length;t++)d(e.points[t][0],e.points[t][1])===e.labels[t]&&i++;if(n===0)return{Status:`Run to see metrics`};let a=y();return{Epochs:n,Loss:t===null?`—`:t.toFixed(6),Accuracy:e.points.length>0?(i/e.points.length*100).toFixed(1)+`%`:`—`,Precision:(a.precision*100).toFixed(1)+`%`,Recall:(a.recall*100).toFixed(1)+`%`,"F1 Score":(a.f1*100).toFixed(1)+`%`,Parameters:_()}}return{params:a,predict:d,step:p,reset:f,render:h,getExplanation:x,getMetrics:S,getConfusionMatrix:b,getParamExplanation:v,get data(){return e},get lossHistory(){return r},get epoch(){return n}}}function b(){let e={points:[],labels:[]},t=[],n=5,r=4,i=5,a=0,o=!1,s={nTrees:{value:5,min:3,max:15,step:1,label:`Number of Trees`},maxDepth:{value:4,min:1,max:8,step:1,label:`Max Depth`},minSamples:{value:5,min:2,max:15,step:1,label:`Min Samples Split`},dataPoints:{value:40,min:15,max:80,step:5,label:`Points per Class`},spread:{value:.13,min:.05,max:.25,step:.01,label:`Cluster Spread`}};function c(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;let n=1;for(let r in t){let i=t[r]/e.length;n-=i*i}return n}function l(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;let n=e[0],r=0;for(let[e,i]of Object.entries(t))i>r&&(n=parseInt(e),r=i);return n}function u(e,t,n,a){let o=n.map(e=>t[e]);if(a>=r||n.length<i||c(o)===0)return{leaf:!0,prediction:l(o),samples:n.length};let s=0,d=.5,f=1/0,p=[],m=[],h=Math.random()>.5?[0,1]:[[0,1][Math.floor(Math.random()*2)]];for(let r of h){let i=n.map(t=>e[t][r]).sort((e,t)=>e-t),a=[];for(let e=1;e<i.length;e++)i[e]!==i[e-1]&&a.push((i[e]+i[e-1])/2);for(let i of a){let a=n.filter(t=>e[t][r]<=i),o=n.filter(t=>e[t][r]>i);if(a.length===0||o.length===0)continue;let l=a.map(e=>t[e]),u=o.map(e=>t[e]),h=(a.length*c(l)+o.length*c(u))/n.length;h<f&&(f=h,s=r,d=i,p=a,m=o)}}return p.length===0||m.length===0?{leaf:!0,prediction:l(o),samples:n.length}:{leaf:!1,feature:s,threshold:d,gini:f,samples:n.length,left:u(e,t,p,a+1),right:u(e,t,m,a+1)}}function d(e,t,n){return e?e.leaf?e.prediction:(e.feature===0?t:n)<=e.threshold?d(e.left,t,n):d(e.right,t,n):0}function p(e){let t=Math.floor(e.length*.8),n=[];for(let r=0;r<t;r++)n.push(e[Math.floor(Math.random()*e.length)]);return n}function m(e,n){if(t.length===0)return 0;let r=t.slice(0,a+1),i={};for(let t of r){let r=d(t.root,e,n);i[r]=(i[r]||0)+1}let o=0,s=0;for(let[e,t]of Object.entries(i))t>s&&(o=parseInt(e),s=t);return o}function h(e,n){return t.slice(0,a+1).map((t,r)=>({treeIndex:r,prediction:d(t.root,e,n)}))}function g(s){n=s.nTrees||5,r=s.maxDepth||4,i=s.minSamples||5,e=f(s.dataPoints||40,[[.3,.7],[.7,.3]],s.spread||.13),t=[],a=0,o=!1}function _(){if(!(o&&a>=t.length-1)){if(t.length===0){let r=e.points.map((e,t)=>t);for(let i=0;i<n;i++){let n=p(r),i=r.filter(e=>!n.includes(e)),a=u(e.points,e.labels,n,0);t.push({root:a,bootstrapIndices:n,oobIndices:i})}a=0}else a<t.length-1&&a++;a>=t.length-1&&(o=!0)}}function v(n){n.clear(),n.drawGrid(),n.drawAxes(`Feature 1`,`Feature 2`),t.length>0&&n.drawDecisionBoundary((e,t)=>m(e,t),60),n.drawPoints(e.points,e.labels,5),t.length>0&&y(n)}function y(e){let n=e.ctx,r=e.width,i=Math.min(30+t.length*28,260),o=r-180-16;n.fillStyle=`rgba(11, 19, 38, 0.88)`,n.strokeStyle=`rgba(164, 230, 255, 0.15)`,n.lineWidth=1,n.beginPath(),n.roundRect(o,16,180,i,12),n.fill(),n.stroke(),n.fillStyle=`rgba(164, 230, 255, 0.5)`,n.font=`9px "Space Grotesk"`,n.textAlign=`center`,n.fillText(`RANDOM FOREST ENSEMBLE`,o+180/2,32);let s=[`#00d1ff`,`#d0bcff`,`#34d399`,`#fbbf24`];for(let e=0;e<t.length;e++){let r=44+e*25,i=e<=a,c=d(t[e].root,.5,.5);if(n.fillStyle=i?`rgba(164, 230, 255, 0.9)`:`rgba(164, 230, 255, 0.2)`,n.font=`10px "Space Grotesk"`,n.textAlign=`left`,n.fillText(`Tree ${e+1}`,o+12,r+4),i){let e=s[c%s.length];n.fillStyle=e+`30`,n.beginPath(),n.roundRect(o+180-60,r-8,44,18,4),n.fill(),n.fillStyle=e,n.font=`9px "Space Grotesk"`,n.textAlign=`center`,n.fillText(`Class ${c}`,o+180-38,r+4)}else n.fillStyle=`rgba(255,255,255,0.1)`,n.font=`9px "Space Grotesk"`,n.textAlign=`center`,n.fillText(`—`,o+180-38,r+4);n.fillStyle=i?`rgba(52, 211, 153, 0.3)`:`rgba(255,255,255,0.05)`,n.fillRect(o+60,r-4,60,6),i&&(n.fillStyle=`rgba(52, 211, 153, 0.8)`,n.fillRect(o+60,r-4,60,6))}}function b(e){return e?e.leaf?1:1+b(e.left)+b(e.right):0}function x(e){return!e||e.leaf?0:1+Math.max(x(e.left),x(e.right))}function S(){if(t.length===0)return 0;let n=0,r=0;for(let i=0;i<e.points.length;i++){let a=t.filter(e=>e.oobIndices.includes(i));if(a.length===0)continue;let o={};for(let t of a){let n=d(t.root,e.points[i][0],e.points[i][1]);o[n]=(o[n]||0)+1}let s=0,c=0;for(let[e,t]of Object.entries(o))t>c&&(s=parseInt(e),c=t);s===e.labels[i]&&n++,r++}return r>0?n/r:0}function C(e,t){return{nTrees:t<=3?`Few trees — the ensemble may not capture data diversity well. Variance remains high.`:t<=8?`Moderate ensemble size — good balance between performance and computation.`:`Large forest — predictions become more stable, but computation increases.`,maxDepth:t<=2?`Shallow trees — simpler base learners. May underfit individually but ensemble compensates.`:t<=5?`Moderate depth — each tree captures reasonable detail.`:`Deep trees — each tree is complex. Risk of individual overfitting but ensemble averaging helps.`,minSamples:t<=3?`Small split threshold — trees can fit very small groups, capturing fine detail.`:t<=10?`Balanced split threshold — prevents overly specific splits.`:`Large split threshold — conservative splitting, simpler trees.`,dataPoints:`Using ${t} points per class for a total of ${t*2} training samples.`,spread:t<.1?`Low spread — clusters are tight and well-separated. Easier to classify.`:t<.18?`Moderate spread — some class overlap near boundaries.`:`High spread — significant class overlap. Tests the ensemble's ability to handle noise.`}[e]||``}function w(){let e=t.reduce((e,t)=>e+b(t.root),0),r=t.length>0?(t.reduce((e,t)=>e+x(t.root),0)/t.length).toFixed(1):`—`;return{title:`Random Forest`,currentStep:o?`Forest Complete`:t.length>0?`Building Tree ${a+1}/${n}`:`Ready`,formula:`Ŷ = mode(T₁(x), T₂(x), ..., Tₙ(x))`,parameters:[{name:`Trees Built`,value:`${Math.min(a+1,t.length)}/${n}`,color:`primary`},{name:`Total Nodes`,value:e||`—`,color:`secondary`},{name:`Avg Depth`,value:r,color:`success`},{name:`OOB Accuracy`,value:o?(S()*100).toFixed(1)+`%`:`—`,color:`warning`}],insight:t.length?o?`Forest complete with ${n} trees (${e} total nodes). Each tree votes on the class. The majority vote determines the ensemble prediction. OOB accuracy shows generalization.`:`Building tree ${a+1} of ${n}. Each tree sees a different bootstrap sample and random feature subset, creating diversity in the ensemble.`:`Press RUN to build the forest. Each tree trains on a random bootstrap sample. Step through to watch trees added one by one.`,theory:`Random Forest combines multiple Decision Trees trained on bootstrap samples with random feature subsets. This bagging approach reduces variance while maintaining low bias. The ensemble prediction is the majority vote across all trees.`}}function T(){if(t.length===0)return{Status:`Not trained`};let r=0;for(let t=0;t<e.points.length;t++)m(e.points[t][0],e.points[t][1])===e.labels[t]&&r++;let i=r/e.points.length,s=[...new Set(e.labels)],c={};for(let e of s)c[e]={tp:0,fp:0,fn:0};for(let t=0;t<e.points.length;t++){let n=m(e.points[t][0],e.points[t][1]),r=e.labels[t];n===r?c[r].tp++:(c[n].fp++,c[r].fn++)}let l=0,u=0,d=0;for(let e of s){let t=c[e].tp/(c[e].tp+c[e].fp||1),n=c[e].tp/(c[e].tp+c[e].fn||1);l+=t,u+=n,d+=2*t*n/(t+n||1)}return{Accuracy:(i*100).toFixed(1)+`%`,Precision:(l/s.length*100).toFixed(1)+`%`,Recall:(u/s.length*100).toFixed(1)+`%`,"F1 Score":(d/s.length*100).toFixed(1)+`%`,Trees:`${Math.min(a+1,t.length)}/${n}`,"OOB Acc":o?(S()*100).toFixed(1)+`%`:`—`}}return{params:s,predict:m,step:_,reset:g,render:v,getExplanation:w,getMetrics:T,getParamExplanation:C,getVotesForPoint:h,get data(){return e},get epoch(){return a},get converged(){return o}}}function x(){let e={points:[],labels:[],binaryLabels:[]},t=[0,0],n=0,r=0,i=[],a=[],o=1,s={learningRate:{value:.05,min:.005,max:.3,step:.005,label:`Learning Rate`},epochs:{value:200,min:20,max:800,step:20,label:`Max Epochs`},C:{value:1,min:.1,max:5,step:.1,label:`Regularization (C)`},dataPoints:{value:40,min:15,max:80,step:5,label:`Points per Class`},spread:{value:.12,min:.04,max:.22,step:.01,label:`Cluster Spread`}};function c(e,r){return t[0]*e+t[1]*r+n}function l(e,t){return+(c(e,t)>=0)}function u(s){let l=s||.05,u=e.points.length,d=[t[0]/u,t[1]/u],f=0,p=0,m=[];for(let t=0;t<u;t++){let n=e.points[t],r=e.binaryLabels[t],i=r*c(n[0],n[1]),a=Math.max(0,1-i);p+=a,a>0&&(d[0]-=o*r*n[0]/u,d[1]-=o*r*n[1]/u,f-=o*r/u),i<=1.05&&m.push(t)}a=m,t[0]-=l*d[0],t[1]-=l*d[1],n-=l*f,r++;let h=p/u;return i.push(h),h}function d(s){o=s.C||1,e=f(s.dataPoints||40,[[.3,.7],[.7,.3]],s.spread||.12),e.binaryLabels=e.labels.map(e=>e===0?-1:1),t=[(Math.random()-.5)*.1,(Math.random()-.5)*.1],n=0,r=0,i=[],a=[]}function p(t){t.clear(),t.drawGrid(),t.drawAxes(`Feature 1`,`Feature 2`),r>0&&(t.drawDecisionBoundary((e,t)=>l(e,t),60),m(t),h(t),g(t)),t.drawPoints(e.points,e.labels,5)}function m(e){let r=e.ctx;if(Math.abs(t[1])<1e-9)return;let i=(i,a,o)=>{r.save(),r.setLineDash(o),r.strokeStyle=a,r.lineWidth=1.5,r.beginPath();let s=-(t[0]*0+n-i)/t[1],c=-(t[0]*1+n-i)/t[1],[l,u]=e.toPixel(0,s),[d,f]=e.toPixel(1,c);r.moveTo(l,u),r.lineTo(d,f),r.stroke(),r.restore()};i(0,`rgba(0,209,255,0.85)`,[]),i(1,`rgba(0,209,255,0.35)`,[6,4]),i(-1,`rgba(0,209,255,0.35)`,[6,4])}function h(t){let n=t.ctx;for(let r of a){let[i,a]=t.toPixel(e.points[r][0],e.points[r][1]),o=n.createRadialGradient(i,a,4,i,a,14);o.addColorStop(0,`rgba(251,191,36,0.45)`),o.addColorStop(1,`rgba(251,191,36,0)`),n.beginPath(),n.arc(i,a,14,0,Math.PI*2),n.fillStyle=o,n.fill(),n.beginPath(),n.arc(i,a,9,0,Math.PI*2),n.strokeStyle=`rgba(251,191,36,0.7)`,n.lineWidth=1.5,n.stroke()}}function g(e){let n=e.ctx,r=Math.sqrt(t[0]**2+t[1]**2),i=r>1e-9?(2/r).toFixed(3):`—`;n.fillStyle=`rgba(11,19,38,0.85)`,n.strokeStyle=`rgba(164,230,255,0.15)`,n.lineWidth=1,n.beginPath(),n.roundRect(12,12,168,66,10),n.fill(),n.stroke(),n.fillStyle=`rgba(164,230,255,0.5)`,n.font=`9px "Space Grotesk"`,n.textAlign=`left`,n.fillText(`SVM MARGIN`,24,30),n.fillStyle=`#00d1ff`,n.font=`bold 16px "Space Grotesk"`,n.fillText(i,24,52),n.fillStyle=`rgba(164,230,255,0.4)`,n.font=`9px "Space Grotesk"`,n.fillText(`${a.length} support vectors`,24,68)}function _(e,t){return{learningRate:t<.01?`⚠️ Very small LR — slow convergence. Margin moves in tiny increments.`:t<.1?`✓ Small-moderate LR — stable SVM convergence.`:`⚠️ Large LR — may overshoot optimal margin. Reduce if loss oscillates.`,epochs:t<50?`⚠️ Few epochs — SVM may not converge. Increase for clean boundary.`:t<300?`✓ Sufficient epochs for a linearly separable problem.`:`✓ Many epochs — ensures full convergence.`,C:t<.5?`✓ Low C — strong regularization. Wider margin, more misclassifications allowed (soft margin).`:t<2?`✓ Moderate C — balanced trade-off between margin width and error.`:`⚠️ High C — penalizes misclassifications heavily. Narrow margin, risk of overfitting.`,dataPoints:`Using ${t} points per class (${t*2} total).`,spread:t<.08?`✓ Tight clusters — SVM finds a clean hard margin.`:t<.15?`✓ Moderate spread — the soft margin C controls the trade-off.`:`⚠️ High spread — significant overlap. Adjust C or consider a non-linear kernel.`}[e]||``}function v(){let e=i.length>0?i[i.length-1]:null,n=Math.sqrt(t[0]**2+t[1]**2),s=n>1e-9?(2/n).toFixed(3):`—`;return{title:`Support Vector Machine`,currentStep:`Epoch ${r}`,formula:`max 2/||w||  s.t. yᵢ(w·xᵢ+b) ≥ 1`,parameters:[{name:`Margin Width`,value:s,color:`primary`},{name:`Hinge Loss`,value:e===null?`—`:e.toFixed(4),color:e&&e<.1?`success`:`warning`},{name:`Support Vecs`,value:a.length,color:`secondary`},{name:`C`,value:o,color:`primary`}],insight:r===0?`Press RUN to train. The SVM finds the hyperplane that maximizes the margin between classes. Watch the cyan margin lines widen as training progresses.`:e&&e<.05?`Converged! Margin = ${s}. The ${a.length} support vectors (gold rings) are the only points that matter for the boundary.`:`Training epoch ${r}. Margin width = ${s}. Gold rings mark support vectors — the boundary is defined entirely by these critical points.`,theory:`SVMs maximize the geometric margin between classes. Soft-margin SVM allows misclassifications penalized by C. Only support vectors — points on or within the margin band — influence the decision boundary. This is the key insight: most training data is irrelevant!`}}function y(){if(r===0)return{Status:`Run to see metrics`};let n=0;for(let t=0;t<e.points.length;t++)l(e.points[t][0],e.points[t][1])===e.labels[t]&&n++;let s=i.length>0?i[i.length-1]:null,c=Math.sqrt(t[0]**2+t[1]**2);return{Epochs:r,"Hinge Loss":s===null?`—`:s.toFixed(4),Accuracy:(n/e.points.length*100).toFixed(1)+`%`,"Margin Width":c>1e-9?(2/c).toFixed(3):`—`,"Support Vectors":a.length,C:o}}function b(){if(r===0)return null;let t=[0,1],n=[[0,0],[0,0]];for(let t=0;t<e.points.length;t++){let r=l(e.points[t][0],e.points[t][1]),i=e.labels[t];i>=0&&i<=1&&r>=0&&r<=1&&n[i][r]++}return{matrix:n,classes:t}}return{params:s,predict:l,step:u,reset:d,render:p,getExplanation:v,getMetrics:y,getConfusionMatrix:b,getParamExplanation:_,get data(){return e},get lossHistory(){return i},get epoch(){return r},get supportVectors(){return a}}}var S=[`#00d1ff`,`#d0bcff`,`#34d399`,`#fbbf24`,`#ffb4ab`,`#f9a1ff`,`#4cd6ff`,`#ff6b6b`],C=S.map(e=>e+`40`),w=class{constructor(e,t={}){this.canvas=e,this.ctx=e.getContext(`2d`),this.padding=t.padding||50,this.dpr=window.devicePixelRatio||1,this.resize(),this._resizeHandler=()=>this.resize(),window.addEventListener(`resize`,this._resizeHandler)}resize(){let e=this.canvas.parentElement.getBoundingClientRect();this.width=e.width,this.height=e.height,this.canvas.width=this.width*this.dpr,this.canvas.height=this.height*this.dpr,this.canvas.style.width=this.width+`px`,this.canvas.style.height=this.height+`px`,this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0)}clear(){this.ctx.clearRect(0,0,this.width,this.height)}toPixel(e,t){return[this.padding+e*(this.width-2*this.padding),this.height-this.padding-t*(this.height-2*this.padding)]}toData(e,t){return[(e-this.padding)/(this.width-2*this.padding),(this.height-this.padding-t)/(this.height-2*this.padding)]}drawGrid(e=`rgba(164, 230, 255, 0.04)`){let t=this.ctx;t.strokeStyle=e,t.lineWidth=1;for(let e=0;e<=10;e++){let n=e/10,[r,i]=this.toPixel(n,0),[,a]=this.toPixel(n,1);t.beginPath(),t.moveTo(r,i),t.lineTo(r,a),t.stroke();let[o,s]=this.toPixel(0,n),[c]=this.toPixel(1,n);t.beginPath(),t.moveTo(o,s),t.lineTo(c,s),t.stroke()}}drawAxes(e=`X`,t=`Y`){let n=this.ctx;n.strokeStyle=`rgba(164, 230, 255, 0.15)`,n.lineWidth=1.5;let[r,i]=this.toPixel(0,0),[a]=this.toPixel(1,0);n.beginPath(),n.moveTo(r,i),n.lineTo(a,i),n.stroke();let[,o]=this.toPixel(0,1);n.beginPath(),n.moveTo(r,i),n.lineTo(r,o),n.stroke(),n.fillStyle=`rgba(164, 230, 255, 0.35)`,n.font=`10px "Space Grotesk"`,n.textAlign=`center`,n.fillText(e.toUpperCase(),(r+a)/2,i+30),n.save(),n.translate(r-30,(i+o)/2),n.rotate(-Math.PI/2),n.fillText(t.toUpperCase(),0,0),n.restore(),n.fillStyle=`rgba(164, 230, 255, 0.2)`,n.font=`9px "Space Grotesk"`;for(let e=0;e<=5;e++){let t=e/5,[i,a]=this.toPixel(t,0);if(n.textAlign=`center`,n.fillText(t.toFixed(1),i,a+16),e>0){let[,e]=this.toPixel(0,t);n.textAlign=`right`,n.fillText(t.toFixed(1),r-8,e+4)}}}drawPoints(e,t=null,n=4){let r=this.ctx;e.forEach((e,i)=>{let[a,o]=this.toPixel(e[0],e[1]),s=S[(t?t[i]:0)%S.length];r.beginPath(),r.arc(a,o,n+3,0,Math.PI*2),r.fillStyle=s+`20`,r.fill(),r.beginPath(),r.arc(a,o,n,0,Math.PI*2),r.fillStyle=s,r.fill()})}drawLine(e,t,n,r,i=`#00d1ff`,a=2){let o=this.ctx,[s,c]=this.toPixel(e,t),[l,u]=this.toPixel(n,r);o.strokeStyle=i+`40`,o.lineWidth=a+4,o.beginPath(),o.moveTo(s,c),o.lineTo(l,u),o.stroke(),o.strokeStyle=i,o.lineWidth=a,o.beginPath(),o.moveTo(s,c),o.lineTo(l,u),o.stroke()}drawDecisionBoundary(e,t=80){let n=this.ctx,r=this.width-2*this.padding,i=this.height-2*this.padding,a=r/t,o=i/t;for(let r=0;r<t;r++)for(let i=0;i<t;i++){let s=r/t,c=i/t,l=C[e(s,c)%C.length],[u,d]=this.toPixel(s,c);n.fillStyle=l,n.fillRect(u-a/2,d-o/2,a+.5,o+.5)}}drawCentroids(e,t=10){let n=this.ctx;e.forEach((e,r)=>{let[i,a]=this.toPixel(e[0],e[1]),o=S[r%S.length];n.beginPath(),n.arc(i,a,t+6,0,Math.PI*2),n.strokeStyle=o+`50`,n.lineWidth=2,n.stroke(),n.save(),n.translate(i,a),n.rotate(Math.PI/4),n.fillStyle=o,n.fillRect(-t/2,-t/2,t,t),n.restore(),n.beginPath(),n.arc(i,a,t/2,0,Math.PI*2),n.fillStyle=o+`80`,n.fill()})}getColor(e){return S[e%S.length]}destroy(){window.removeEventListener(`resize`,this._resizeHandler)}};function T(e,t){let n={};i.forEach(e=>{n[e.category]||(n[e.category]=[]),n[e.category].push(e)});let r=``;for(let[e,i]of Object.entries(n)){r+=`<div class="text-label-sm text-dim" style="padding:16px 24px 8px;color:var(--outline)">${e}</div>`;for(let e of i){let n=e.id===t;r+=`
        <a href="#workspace/${e.id}" class="sidebar-link ${n?`active`:``}">
          <span class="material-symbols-outlined">${e.icon}</span>
          <span>${e.name}</span>
        </a>`}}e.innerHTML=`
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
        ${r}
      </nav>
      <div class="sidebar-footer">
        <button class="btn btn-outline btn-sm w-full" onclick="location.hash='#explorer'">
          <span class="material-symbols-outlined" style="font-size:16px">grid_view</span>
          Back to Explorer
        </button>
      </div>
    </aside>
  `}var E={"linear-regression":h,knn:g,"decision-tree":_,kmeans:v,"neural-network":y,"random-forest":b,svm:x},D=new Set([`knn`,`decision-tree`,`neural-network`,`random-forest`,`svm`]),O=new Set([`linear-regression`]),k=new Set([`linear-regression`,`neural-network`,`svm`]);function A(e,t=`linear-regression`){let n=a(t);if(!n){e.innerHTML=`<div class="page-content container" style="padding-top:100px;text-align:center">
      <h2>Algorithm not found</h2><a href="#explorer" class="btn btn-primary mt-lg">Back to Explorer</a></div>`;return}let r=document.createElement(`div`);document.body.appendChild(r),T(r,t);let i=E[t];if(!i)return;let o=i(),s=null,c=null,l=!1,u={},d=[],f=1;for(let[e,t]of Object.entries(o.params))u[e]=t.value;o.reset(u);let p=``;for(let[e,t]of Object.entries(o.params))p+=`
      <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);border:1px solid var(--glass-border)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
          <label class="text-label-md text-dim">${t.label}</label>
          <span class="text-label-md text-primary" id="val-${e}">${t.value}</span>
        </div>
        <input type="range" id="param-${e}" min="${t.min}" max="${t.max}" step="${t.step}" value="${t.value}" />
        <div style="display:flex;justify-content:space-between;margin-top:4px">
          <span class="text-label-sm text-dim">${t.min}</span>
          <span class="text-label-sm text-dim">${t.max}</span>
        </div>
        <div id="explain-${e}" class="param-explain-text"></div>
      </div>`;e.classList.add(`page-with-sidebar`),e.innerHTML=`
    <div class="workspace-grid">
      <!-- Left: Controls -->
      <section class="workspace-controls" id="ws-controls">
        <h2 class="text-headline-sm mb-lg">${n.name}</h2>
        <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">PARAMETERS</div>
        <div style="display:flex;flex-direction:column;gap:var(--space-md)">
          ${p}
        </div>

        <!-- Playback Controls -->
        <div style="margin-top:var(--space-lg)">
          <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">PLAYBACK</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
            <button class="btn btn-primary w-full" id="btn-run">
              <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span> RUN SIMULATION
            </button>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm)">
              <button class="btn btn-secondary" id="btn-prev" title="Previous Step" disabled style="opacity:0.4">
                <span class="material-symbols-outlined" style="font-size:18px">skip_previous</span> Prev
              </button>
              <button class="btn btn-secondary" id="btn-step">
                <span class="material-symbols-outlined" style="font-size:18px">skip_next</span> Step
              </button>
            </div>
            <button class="btn btn-ghost w-full" id="btn-reset">
              <span class="material-symbols-outlined" style="font-size:18px">restart_alt</span> RESET
            </button>
          </div>
          <!-- Speed -->
          <div style="margin-top:var(--space-md)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <span class="text-label-sm text-dim">SPEED</span>
              <span class="text-label-sm text-primary" id="speed-val">1×</span>
            </div>
            <input type="range" id="speed-slider" min="1" max="10" step="1" value="1" />
          </div>
        </div>

        <!-- Export -->
        <div style="margin-top:var(--space-lg)">
          <div class="text-label-sm text-dim mb-md" style="padding:4px 0;border-bottom:1px solid var(--glass-border)">EXPORT</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
            <button class="btn btn-outline btn-sm w-full" id="btn-export-img">
              <span class="material-symbols-outlined" style="font-size:16px">image</span> Save Canvas PNG
            </button>
            <button class="btn btn-outline btn-sm w-full" id="btn-export-csv">
              <span class="material-symbols-outlined" style="font-size:16px">download</span> Download Metrics
            </button>
          </div>
        </div>
      </section>

      <!-- Center: Canvas + Evaluation -->
      <section class="workspace-canvas" id="ws-canvas">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-md)">
          <div>
            <h1 class="text-headline-lg">${n.name}</h1>
            <p class="text-body-sm text-muted">Real-time visualization · <span id="iter-label">Epoch 0</span></p>
          </div>
          <div style="display:flex;gap:var(--space-sm)">
            <span class="chip chip-primary" id="status-chip">READY</span>
          </div>
        </div>
        <div class="vis-canvas-wrap" id="canvas-wrap">
          <canvas id="main-canvas"></canvas>
        </div>

        <!-- Metrics Bar -->
        <div style="display:flex;gap:var(--space-xl);margin-top:var(--space-md);flex-wrap:wrap" id="metrics-bar"></div>

        <!-- Loss Curve (only shown for gradient algorithms) -->
        <div id="loss-curve-section" style="display:none;margin-top:var(--space-lg)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="text-label-sm text-dim">LOSS CURVE</span>
            <span class="text-label-sm" id="loss-curve-label" style="color:var(--primary)">—</span>
          </div>
          <div class="vis-canvas-wrap" style="min-height:130px;border-radius:var(--radius-lg)">
            <canvas id="loss-curve-canvas"></canvas>
          </div>
        </div>

        <!-- Evaluation Dashboard -->
        <div id="eval-dashboard" style="margin-top:var(--space-lg)"></div>
      </section>

      <!-- Right: Explanation -->
      <section class="workspace-explanation" id="ws-explanation">
        <div style="padding:var(--space-lg);border-bottom:1px solid var(--glass-border)">
          <h3 class="text-headline-sm mb-md">Mathematical Foundation</h3>
          <div id="formula-box" class="glass-panel" style="padding:var(--space-lg);border-radius:var(--radius-lg);text-align:center"></div>
          <div id="param-readout" style="margin-top:var(--space-md)"></div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;padding:var(--space-lg);overflow:hidden">
          <h3 class="text-headline-sm mb-md">Active Insights</h3>
          <div id="insight-panel" style="flex:1;overflow-y:auto"></div>
          <div id="recommendation-panel" style="margin-top:var(--space-md)"></div>
        </div>
      </section>
    </div>`;let m=document.getElementById(`main-canvas`);requestAnimationFrame(()=>{s=new w(m),o.render(s),b(),x(),S()});let h={};for(let e of Object.keys(o.params)){let t=document.getElementById(`param-${e}`),n=document.getElementById(`val-${e}`),r=document.getElementById(`explain-${e}`);t&&(t.addEventListener(`input`,()=>{let i=parseFloat(t.value);u[e]=i,n.textContent=i,r&&o.getParamExplanation&&(r.textContent=o.getParamExplanation(e,i),r.style.animation=`none`,requestAnimationFrame(()=>{r.style.animation=`paramFlash 0.4s ease`})),clearTimeout(h[e]),h[e]=setTimeout(()=>{l&&(v(),o.reset(u),d=[],s&&o.render(s),b(),x(),S(),_())},300)}),r&&o.getParamExplanation&&(r.textContent=o.getParamExplanation(e,parseFloat(t.value))))}document.getElementById(`speed-slider`).addEventListener(`input`,e=>{f=parseInt(e.target.value),document.getElementById(`speed-val`).textContent=`${f}×`}),document.getElementById(`btn-run`).addEventListener(`click`,()=>{l?v():_()}),document.getElementById(`btn-step`).addEventListener(`click`,()=>{v(),g(),document.getElementById(`btn-prev`).disabled=!1,document.getElementById(`btn-prev`).style.opacity=`1`}),document.getElementById(`btn-prev`).addEventListener(`click`,()=>{if(d.length>1){d.pop();let e=d[d.length-1];o.reset(e.params);for(let n=0;n<e.stepCount;n++)t===`linear-regression`||t===`neural-network`?o.step(e.params.learningRate||.5):o.step(e.params);s&&o.render(s),b(),x(),S(),d.length<=1&&(document.getElementById(`btn-prev`).disabled=!0,document.getElementById(`btn-prev`).style.opacity=`0.4`)}}),document.getElementById(`btn-reset`).addEventListener(`click`,()=>{v(),o.reset(u),d=[],document.getElementById(`btn-prev`).disabled=!0,document.getElementById(`btn-prev`).style.opacity=`0.4`,s&&o.render(s),b(),x(),S(),y(`READY`,`chip-primary`),document.getElementById(`iter-label`).textContent=`Epoch 0`}),document.getElementById(`btn-export-img`).addEventListener(`click`,()=>{if(!m)return;let e=document.createElement(`a`);e.download=`algonex-${t}-snapshot.png`,e.href=m.toDataURL(`image/png`),e.click()}),document.getElementById(`btn-export-csv`).addEventListener(`click`,()=>{let e=o.getMetrics(),r=o.getExplanation(),i=`Algonex — ${n.name} Metrics Report\n`;i+=`Algorithm,${n.name}\n`,i+=`Iteration,${r.currentStep}\n\n`,i+=`Metric,Value
`;for(let[t,n]of Object.entries(e))i+=`${t},${n}\n`;i+=`
Parameters
`;for(let[e,t]of Object.entries(u))i+=`${e},${t}\n`;let a=new Blob([i],{type:`text/csv`}),s=document.createElement(`a`);s.download=`algonex-${t}-report.csv`,s.href=URL.createObjectURL(a),s.click()});function g(){let e=o.epoch===void 0?0:o.epoch;d.push({params:{...u},stepCount:e}),t===`linear-regression`||t===`neural-network`?o.step(u.learningRate||.5):o.step(u),s&&o.render(s),b(),x(),S();let n=document.getElementById(`iter-label`);n&&(n.textContent=`Epoch ${o.epoch===void 0?d.length:o.epoch}`)}function _(){l=!0;let e=document.getElementById(`btn-run`);e.innerHTML=`<span class="material-symbols-outlined" style="font-size:18px">pause</span> PAUSE`,y(`RUNNING`,`chip-success`);let n=u.epochs||200;u.maxIterations;let r=t===`linear-regression`||t===`neural-network`,i=t===`random-forest`;function a(){if(!l)return;if(r){if(o.epoch>=n){v(),y(`COMPLETE`,`chip-success`);return}let e=Math.max(1,Math.floor(n/150))*f;for(let t=0;t<e&&o.epoch<n;t++)o.step(u.learningRate||.5)}else if(t===`kmeans`){if(o.converged){v(),y(`CONVERGED`,`chip-success`);return}o.step()}else if(i){if(o.converged){v(),y(`COMPLETE`,`chip-success`);return}o.step(u)}else{o.step(u),s&&o.render(s),b(),x(),S(),v(),y(`COMPLETE`,`chip-success`);return}s&&o.render(s),b(),x(),S();let e=o.epoch===void 0?``:o.epoch,d=document.getElementById(`iter-label`);d&&e!==``&&(d.textContent=`Epoch ${e}`),c=requestAnimationFrame(a)}a()}function v(){l=!1,c&&cancelAnimationFrame(c);let e=document.getElementById(`btn-run`);e&&(e.innerHTML=`<span class="material-symbols-outlined" style="font-size:18px">play_arrow</span> RUN SIMULATION`)}function y(e,t){let n=document.getElementById(`status-chip`);n&&(n.textContent=e,n.className=`chip ${t}`)}function b(){let e=o.getExplanation(),t=document.getElementById(`formula-box`);t&&(t.innerHTML=`
        <div class="text-label-sm text-dim mb-sm">${e.title}</div>
        <div style="font-size:1.4rem;font-family:var(--font-headline);font-weight:200;letter-spacing:0.1em;margin:var(--space-md) 0;color:var(--on-surface)">${e.formula}</div>
        <div class="text-label-sm text-primary">${e.currentStep}</div>`);let n=document.getElementById(`param-readout`);n&&e.parameters&&(n.innerHTML=e.parameters.map(e=>`
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm)">
          <div class="text-headline-sm" style="color:var(--${e.color});min-width:80px;font-weight:800">${e.value}</div>
          <div class="text-label-sm text-dim">${e.name}</div>
        </div>`).join(``));let r=document.getElementById(`insight-panel`);r&&(r.innerHTML=`
        <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);border-left:2px solid var(--primary);margin-bottom:var(--space-md)">
          <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.7">${e.insight}</p>
        </div>
        <div style="padding:var(--space-md);border-radius:var(--radius-lg);background:rgba(255,255,255,0.02)">
          <div class="text-label-sm text-dim mb-sm">THEORY</div>
          <p class="text-body-sm text-muted" style="line-height:1.7">${e.theory}</p>
        </div>`);let i=document.getElementById(`recommendation-panel`);i&&(i.innerHTML=`
        <div style="padding:var(--space-md);border-radius:var(--radius-lg);background:rgba(0,209,255,0.05);border:1px solid rgba(0,209,255,0.1)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-xs)">
            <span class="material-symbols-outlined text-primary" style="font-size:16px">lightbulb</span>
            <span class="text-label-sm text-primary">Industry Tip</span>
          </div>
          <p class="text-body-sm text-muted">Adjust parameters and press RUN to see how they affect the model. In practice, tuning these values (hyperparameter search) is one of the most important steps in building a good model.</p>
        </div>`)}function x(){let e=o.getMetrics(),n=document.getElementById(`metrics-bar`);n&&(n.innerHTML=Object.entries(e).map(([e,t])=>`
        <div>
          <div class="text-label-sm text-dim">${e}</div>
          <div class="text-headline-sm" style="font-weight:800">${t}</div>
        </div>`).join(``)),k.has(t)&&o.lossHistory&&A(o.lossHistory)}function S(){let e=document.getElementById(`eval-dashboard`);if(!e)return;let n=D.has(t),r=O.has(t);if(n&&o.getConfusionMatrix){let t=o.getConfusionMatrix();if(!t){e.innerHTML=``;return}let{matrix:n,classes:r}=t,i=[`Class 0`,`Class 1`,`Class 2`].slice(0,r.length),a=Math.max(...n.flat(),1),s=`<table class="conf-matrix">
        <thead><tr><th>Actual \\ Pred</th>${i.map(e=>`<th>${e}</th>`).join(``)}</tr></thead>
        <tbody>`;n.forEach((e,t)=>{s+=`<tr><th>${i[t]}</th>`,e.forEach((e,n)=>{let r=e/a,i=t===n?`rgba(52,211,153,${.1+r*.5})`:`rgba(255,180,171,${r*.4})`;s+=`<td style="background:${i};color:${t===n?`var(--success)`:`var(--error)`};font-weight:700;text-align:center">${e}</td>`}),s+=`</tr>`}),s+=`</tbody></table>`;let c=o.getMetrics(),l=[`Accuracy`,`Precision`,`Recall`,`F1 Score`].filter(e=>c[e]).map(e=>`
        <div class="eval-stat-card">
          <div class="text-label-sm text-dim">${e}</div>
          <div class="text-headline-md" style="font-weight:800;color:var(--primary)">${c[e]}</div>
        </div>`).join(``);e.innerHTML=`
        <div style="margin-top:var(--space-md)">
          <h3 class="text-headline-sm mb-md">Model Evaluation Dashboard</h3>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:var(--space-lg);align-items:start">
            <div>
              <div class="text-label-sm text-dim mb-sm">CONFUSION MATRIX</div>
              ${s}
              <div class="text-label-sm text-dim mt-sm" style="margin-top:var(--space-sm)">Green = correct predictions · Red = errors</div>
            </div>
            <div>
              <div class="text-label-sm text-dim mb-sm">CLASSIFICATION METRICS</div>
              <div class="eval-stats-row">${l}</div>
              <div style="margin-top:var(--space-md);padding:var(--space-md);background:rgba(164,230,255,0.04);border-radius:var(--radius-md)">
                <div class="text-label-sm text-dim mb-sm">METRIC GUIDE</div>
                <div class="text-body-sm text-muted" style="line-height:1.8">
                  <strong>Precision</strong> — Of all predicted positives, how many were actually positive?<br>
                  <strong>Recall</strong> — Of all actual positives, how many did the model catch?<br>
                  <strong>F1 Score</strong> — Harmonic mean of Precision and Recall. Best for imbalanced data.
                </div>
              </div>
            </div>
          </div>
        </div>`}else if(r&&o.getPredVsActual){let t=o.getPredVsActual();if(!t||t.length===0){e.innerHTML=``;return}e.innerHTML=`
        <div style="margin-top:var(--space-md)">
          <h3 class="text-headline-sm mb-md">Prediction vs Actual</h3>
          <div class="vis-canvas-wrap" style="min-height:200px"><canvas id="pred-actual-canvas"></canvas></div>
        </div>`,requestAnimationFrame(()=>C(t))}else e.innerHTML=``}function C(e){let t=document.getElementById(`pred-actual-canvas`);if(!t)return;let n=t.getContext(`2d`),r=window.devicePixelRatio||1,i=t.parentElement.getBoundingClientRect();t.width=i.width*r,t.height=i.height*r,t.style.width=i.width+`px`,t.style.height=i.height+`px`,n.setTransform(r,0,0,r,0,0);let a=i.width,o=i.height,s=e.flatMap(e=>[e.predicted,e.actual]),c=Math.min(...s),l=Math.max(...s)-c||1,u=t=>40+(t-Math.min(...e.map(e=>e.x)))/(Math.max(...e.map(e=>e.x))-Math.min(...e.map(e=>e.x))||1)*(a-80),d=e=>o-40-(e-c)/l*(o-80);n.strokeStyle=`rgba(164,230,255,0.04)`,n.lineWidth=1;for(let e=0;e<=5;e++){let t=40+e/5*(a-80),r=40+e/5*(o-80);n.beginPath(),n.moveTo(t,40),n.lineTo(t,o-40),n.stroke(),n.beginPath(),n.moveTo(40,r),n.lineTo(a-40,r),n.stroke()}for(let t of e){let e=u(t.x),r=d(t.actual);n.beginPath(),n.arc(e,r,3,0,Math.PI*2),n.fillStyle=`#d0bcff80`,n.fill()}let f=[...e].sort((e,t)=>e.x-t.x);n.beginPath(),n.strokeStyle=`#00d1ff`,n.lineWidth=2,f.forEach((e,t)=>{let r=u(e.x),i=d(e.predicted);t===0?n.moveTo(r,i):n.lineTo(r,i)}),n.stroke(),n.fillStyle=`rgba(164,230,255,0.4)`,n.font=`9px "Space Grotesk"`,n.textAlign=`center`,n.fillText(`FEATURE X`,a/2,o-5),n.fillStyle=`#d0bcff`,n.fillText(`● Actual`,a-80,16),n.fillStyle=`#00d1ff`,n.fillText(`— Predicted`,a-80,28)}function A(e){let t=document.getElementById(`loss-curve-section`),n=document.getElementById(`loss-curve-canvas`),r=document.getElementById(`loss-curve-label`);if(!t||!n||!e||e.length===0)return;t.style.display=`block`;let i=e[e.length-1];r&&(r.textContent=`Loss: ${i.toFixed(5)}`);let a=n.getContext(`2d`),o=window.devicePixelRatio||1,s=n.parentElement.getBoundingClientRect();n.width=s.width*o,n.height=s.height*o,n.style.width=s.width+`px`,n.style.height=s.height+`px`,a.setTransform(o,0,0,o,0,0);let c=s.width,l=s.height,u={top:12,right:16,bottom:24,left:40},d=c-u.left-u.right,f=l-u.top-u.bottom;a.clearRect(0,0,c,l);let p=Math.max(...e,.001),m=t=>u.left+t/Math.max(e.length-1,1)*d,h=e=>u.top+f-(e-0)/(p-0)*f;a.strokeStyle=`rgba(164,230,255,0.05)`,a.lineWidth=1;for(let e=0;e<=4;e++){let t=u.top+e/4*f;a.beginPath(),a.moveTo(u.left,t),a.lineTo(u.left+d,t),a.stroke(),a.fillStyle=`rgba(164,230,255,0.3)`,a.font=`8px "Space Grotesk"`,a.textAlign=`right`,a.fillText((p-e/4*p).toFixed(3),u.left-4,t+3)}if(a.fillStyle=`rgba(164,230,255,0.3)`,a.font=`8px "Space Grotesk"`,a.textAlign=`center`,a.fillText(`0`,u.left,l-6),a.fillText(e.length,u.left+d,l-6),a.fillText(`Epochs`,u.left+d/2,l-6),e.length<2)return;let g=a.createLinearGradient(0,u.top,0,u.top+f);g.addColorStop(0,`rgba(0,209,255,0.25)`),g.addColorStop(1,`rgba(0,209,255,0)`),a.beginPath(),a.moveTo(m(0),h(e[0])),e.forEach((e,t)=>a.lineTo(m(t),h(e))),a.lineTo(m(e.length-1),u.top+f),a.lineTo(m(0),u.top+f),a.closePath(),a.fillStyle=g,a.fill(),a.shadowColor=`#00d1ff`,a.shadowBlur=6,a.beginPath(),a.strokeStyle=`#00d1ff`,a.lineWidth=2,e.forEach((e,t)=>{let n=m(t),r=h(e);t===0?a.moveTo(n,r):a.lineTo(n,r)}),a.stroke(),a.shadowBlur=0;let _=m(e.length-1),v=h(i);a.beginPath(),a.arc(_,v,4,0,Math.PI*2),a.fillStyle=`#00d1ff`,a.fill()}return(function(){if(t!==`knn`)return;let e=document.getElementById(`canvas-wrap`);if(!e)return;let n=null;e.addEventListener(`mousemove`,t=>{if(!s||!o.getNeighbors||!o.boundaryDrawn)return;let r=e.getBoundingClientRect(),i=t.clientX-r.left,a=t.clientY-r.top,c=document.getElementById(`main-canvas`);if(!c)return;let l=c.clientWidth,u=c.clientHeight,d=(i-50)/(l-100),f=1-(a-50)/(u-100);if(d<0||d>1||f<0||f>1){n&&(n.style.opacity=`0`);return}n||(n=document.createElement(`canvas`),n.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;transition:opacity 0.15s`,e.appendChild(n));let p=window.devicePixelRatio||1;n.width=l*p,n.height=u*p,n.style.width=l+`px`,n.style.height=u+`px`,n.style.opacity=`1`;let m=n.getContext(`2d`);m.setTransform(p,0,0,p,0,0),m.clearRect(0,0,l,u);let h=o.getNeighbors(d,f),g=(e,t)=>[50+e*(l-100),u-50-t*(u-100)],_=[`#00d1ff`,`#d0bcff`,`#34d399`],[v,y]=g(d,f);m.beginPath(),m.arc(v,y,6,0,Math.PI*2),m.fillStyle=`rgba(255,255,255,0.9)`,m.fill();for(let e of h){let[t,n]=g(o.data.points[e.idx][0],o.data.points[e.idx][1]);m.beginPath(),m.moveTo(v,y),m.lineTo(t,n),m.strokeStyle=`rgba(255,255,255,0.18)`,m.lineWidth=1,m.setLineDash([3,3]),m.stroke(),m.setLineDash([]),m.beginPath(),m.arc(t,n,10,0,Math.PI*2),m.strokeStyle=_[e.label%_.length]+`cc`,m.lineWidth=2,m.stroke()}let b={};for(let e of h)b[e.label]=(b[e.label]||0)+1;let x=Object.entries(b).sort((e,t)=>t[1]-e[1])[0];m.fillStyle=`rgba(11,19,38,0.88)`,m.strokeStyle=`rgba(164,230,255,0.2)`,m.lineWidth=1,m.beginPath(),m.roundRect(v+12,y-28,110,36,6),m.fill(),m.stroke(),m.fillStyle=`#00d1ff`,m.font=`bold 10px "Space Grotesk"`,m.textAlign=`left`,m.fillText(`→ Class ${x?x[0]:`?`}`,v+20,y-14),m.fillStyle=`rgba(164,230,255,0.5)`,m.font=`9px "Space Grotesk"`,m.fillText(`${o.k} neighbors polled`,v+20,y-2)}),e.addEventListener(`mouseleave`,()=>{n&&(n.style.opacity=`0`)})})(),()=>{v(),s&&s.destroy(),r&&r.parentNode&&r.parentNode.removeChild(r)}}function j(e){e.classList.add(`page-content`);let t=[{id:`collect`,name:`Data Collection`,icon:`cloud_download`,description:`Gather raw data from various sources — CSV files, databases, APIs, or web scraping. The quality and quantity of data directly impacts the model's performance.`,details:[`Define data requirements`,`Identify sources`,`Extract raw data`,`Store in structured format`],action:`#playground`,actionLabel:`Browse Datasets`},{id:`preprocess`,name:`Preprocessing`,icon:`auto_fix_high`,description:`Clean and prepare the data. Handle missing values, remove outliers, normalize features, and encode categorical variables. This is often the most time-consuming step in any ML project.`,details:[`Handle missing values (imputation)`,`Remove duplicates & outliers`,`Feature scaling (normalization)`,`Encode categorical data`],action:`#preprocessing`,actionLabel:`Open Preprocessing Visualizer`},{id:`split`,name:`Train/Test Split`,icon:`call_split`,description:`Split data into training and testing sets (typically 80/20). This ensures the model is evaluated on unseen data to measure how well it generalizes to real-world inputs.`,details:[`Shuffle data randomly`,`Split into train/test (80/20)`,`Optional: validation set`,`Stratified split for imbalanced data`],action:`#train-test-split`,actionLabel:`Open Split Visualizer`},{id:`select`,name:`Model Selection`,icon:`tune`,description:`Choose the right algorithm based on your problem type, data size, and desired interpretability. Compare candidates before committing to a final model.`,details:[`Classification vs Regression?`,`Linear vs Non-linear?`,`Consider dataset size`,`Evaluate complexity trade-offs`],action:`#explorer`,actionLabel:`Browse Algorithms`},{id:`train`,name:`Training`,icon:`model_training`,description:`Feed training data to the model. The algorithm adjusts its internal parameters (weights, splits, centroids) to minimise the loss function — the measure of how wrong its predictions are.`,details:[`Initialize parameters`,`Forward pass (predictions)`,`Compute loss function`,`Backward pass (gradient descent)`],action:`#workspace/linear-regression`,actionLabel:`See Training Live`},{id:`evaluate`,name:`Evaluation`,icon:`assessment`,description:`Measure model performance on the test set using metrics like accuracy, precision, recall, F1-score, or MSE. Identify overfitting or underfitting and iterate as needed.`,details:[`Predict on test data`,`Compute accuracy / MSE / R²`,`Confusion matrix & F1 Score`,`Cross-validation`],action:`#compare`,actionLabel:`Compare Models`}],n=0;e.innerHTML=`
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
        ${t.map((e,t)=>`
          ${t>0?`<div class="pipeline-connector ${t<=n?`active`:``}" id="conn-${t}"></div>`:``}
          <div class="pipeline-step ${t===n?`active`:t<n?`completed`:``}" id="step-${t}" data-idx="${t}">
            <div class="pipeline-step-circle">
              <span class="material-symbols-outlined" style="font-size:24px;color:${t<=n?`var(--primary)`:`var(--outline)`}">${e.icon}</span>
            </div>
            <span class="text-label-md" style="color:${t===n?`var(--primary)`:`var(--outline)`}">${e.name}</span>
          </div>
        `).join(``)}
      </div>

      <!-- Detail Panel -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-top:var(--space-2xl)">
        <div class="card-glass" id="pipeline-detail" style="padding:var(--space-xl)">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-lg)">
            <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:rgba(0,209,255,0.1);display:flex;align-items:center;justify-content:center">
              <span class="material-symbols-outlined text-primary" id="detail-icon" style="font-size:24px">${t[0].icon}</span>
            </div>
            <div>
              <div class="text-label-sm text-dim">Step ${n+1} of ${t.length}</div>
              <h3 class="text-headline-md" id="detail-title">${t[0].name}</h3>
            </div>
          </div>
          <p class="text-body-md text-muted" id="detail-desc" style="line-height:1.8;margin-bottom:var(--space-lg)">${t[0].description}</p>
          <div id="detail-checklist">
            ${t[0].details.map(e=>`
              <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                <span class="material-symbols-outlined text-success" style="font-size:18px">check_circle</span>
                <span class="text-body-sm">${e}</span>
              </div>
            `).join(``)}
          </div>
          <div id="detail-action" style="margin-top:var(--space-lg)">
            ${t[0].action?`<a href="${t[0].action}" class="btn btn-primary btn-sm">
              <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span> ${t[0].actionLabel}
            </a>`:``}
          </div>
        </div>

        <!-- Animated Canvas -->
        <div class="vis-canvas-wrap" style="min-height:350px">
          <canvas id="pipeline-canvas"></canvas>
        </div>
      </div>

      <!-- Nav buttons -->
      <div style="display:flex;justify-content:space-between;margin-top:var(--space-xl)">
        <button class="btn btn-secondary" id="pipeline-prev" ${n===0?`disabled style="opacity:0.4"`:``}>
          <span class="material-symbols-outlined" style="font-size:18px">arrow_back</span>
          Previous
        </button>
        <div style="display:flex;align-items:center;gap:var(--space-md)">
          <span class="text-label-sm text-dim" id="step-counter">Step 1 / ${t.length}</span>
        </div>
        <button class="btn btn-primary" id="pipeline-next">
          ${n<t.length-1?`Next Step`:`Restart`}
          <span class="material-symbols-outlined" style="font-size:18px">${n<t.length-1?`arrow_forward`:`restart_alt`}</span>
        </button>
      </div>
    </div>
  `;let r;a();function i(e){n=e;let r=t[e];t.forEach((t,n)=>{let r=document.getElementById(`step-${n}`);if(r){r.className=`pipeline-step ${n===e?`active`:n<e?`completed`:``}`;let t=r.querySelector(`.text-label-md`);t&&(t.style.color=n===e?`var(--primary)`:`var(--outline)`);let i=r.querySelector(`.material-symbols-outlined`);i&&(i.style.color=n<=e?`var(--primary)`:`var(--outline)`)}if(n>0){let t=document.getElementById(`conn-${n}`);t&&(t.className=`pipeline-connector ${n<=e?`active`:``}`)}}),document.getElementById(`detail-icon`).textContent=r.icon,document.getElementById(`detail-title`).textContent=r.name,document.getElementById(`detail-desc`).textContent=r.description,document.getElementById(`detail-checklist`).innerHTML=r.details.map(e=>`
      <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
        <span class="material-symbols-outlined text-success" style="font-size:18px">check_circle</span>
        <span class="text-body-sm">${e}</span>
      </div>
    `).join(``),document.getElementById(`detail-action`).innerHTML=r.action?`
      <a href="${r.action}" class="btn btn-primary btn-sm">
        <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span> ${r.actionLabel}
      </a>`:``,document.getElementById(`step-counter`).textContent=`Step ${e+1} / ${t.length}`;let i=document.getElementById(`pipeline-prev`),a=document.getElementById(`pipeline-next`);i&&(i.disabled=e===0,i.style.opacity=e===0?`0.4`:`1`),a&&(a.innerHTML=e<t.length-1?`Next Step <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>`:`<span class="material-symbols-outlined" style="font-size:18px">restart_alt</span> Restart`)}t.forEach((e,t)=>{let n=document.getElementById(`step-${t}`);n&&n.addEventListener(`click`,()=>i(t))}),document.getElementById(`pipeline-prev`).addEventListener(`click`,()=>{n>0&&i(n-1)}),document.getElementById(`pipeline-next`).addEventListener(`click`,()=>{n<t.length-1?i(n+1):i(0)});function a(){let e=document.getElementById(`pipeline-canvas`);if(!e)return;let t=e.getContext(`2d`),n=window.devicePixelRatio||1,i=e.parentElement.getBoundingClientRect();e.width=i.width*n,e.height=i.height*n,e.style.width=i.width+`px`,e.style.height=i.height+`px`,t.setTransform(n,0,0,n,0,0);let a=i.width,o=i.height,s=[];for(let e=0;e<40;e++)s.push({x:Math.random()*a,y:Math.random()*o,r:2+Math.random()*3,speed:.3+Math.random()*.7,angle:Math.random()*Math.PI*2,color:[`#00d1ff`,`#d0bcff`,`#34d399`,`#fbbf24`][Math.floor(Math.random()*4)]});function c(){t.clearRect(0,0,a,o);for(let e of s)e.x+=Math.cos(e.angle)*e.speed,e.y+=Math.sin(e.angle)*e.speed,e.x<0&&(e.x=a),e.x>a&&(e.x=0),e.y<0&&(e.y=o),e.y>o&&(e.y=0),t.beginPath(),t.arc(e.x,e.y,e.r,0,Math.PI*2),t.fillStyle=e.color+`60`,t.fill(),t.beginPath(),t.arc(e.x,e.y,e.r*.5,0,Math.PI*2),t.fillStyle=e.color,t.fill();for(let e=0;e<s.length;e++)for(let n=e+1;n<s.length;n++){let r=s[e].x-s[n].x,i=s[e].y-s[n].y,a=Math.sqrt(r*r+i*i);a<80&&(t.strokeStyle=`rgba(164,230,255,${.1*(1-a/80)})`,t.lineWidth=.5,t.beginPath(),t.moveTo(s[e].x,s[e].y),t.lineTo(s[n].x,s[n].y),t.stroke())}r=requestAnimationFrame(c)}c()}return()=>{r&&cancelAnimationFrame(r)}}var M={"linear-regression":h,knn:g,"decision-tree":_,kmeans:v,"neural-network":y,"random-forest":b,svm:x};function N(e){e.classList.add(`page-content`);let t=i.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``);e.innerHTML=`
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="aura aura-secondary" style="bottom:0;right:-200px"></div>

    <div class="container-wide" style="padding-top:var(--space-2xl);padding-bottom:var(--space-2xl)">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-xl)">
        <div>
          <div class="chip chip-secondary mb-md">Compare Mode</div>
          <h1 class="text-headline-lg">Compare Algorithms Side-by-Side</h1>
          <p class="text-body-md text-muted mt-sm">Run two algorithms on the same data and compare behavior, speed, and accuracy.</p>
        </div>
        <button class="btn btn-primary" id="compare-run-btn">
          <span class="material-symbols-outlined" style="font-size:18px">play_arrow</span>
          Run Both
        </button>
      </div>

      <div class="compare-grid" style="height:calc(100vh - 280px)">
        <!-- Left Panel -->
        <div class="compare-panel">
          <div class="compare-panel-header">
            <select class="select-field" id="algo-select-left" style="max-width:200px">
              ${t}
            </select>
            <span class="chip chip-primary" id="status-left">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" id="canvas-wrap-left" style="min-height:300px">
              <canvas id="canvas-left"></canvas>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="compare-panel">
          <div class="compare-panel-header">
            <select class="select-field" id="algo-select-right" style="max-width:200px">
              ${t}
            </select>
            <span class="chip chip-secondary" id="status-right">READY</span>
          </div>
          <div class="compare-panel-canvas">
            <div class="vis-canvas-wrap h-full" id="canvas-wrap-right" style="min-height:300px">
              <canvas id="canvas-right"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Metrics Comparison Table -->
      <div class="card" style="margin-top:var(--space-xl);padding:var(--space-lg)">
        <h3 class="text-headline-sm mb-md">Metrics Comparison</h3>
        <table class="metrics-table" id="compare-metrics">
          <thead>
            <tr><th>Metric</th><th id="th-left">Algorithm A</th><th id="th-right">Algorithm B</th></tr>
          </thead>
          <tbody id="compare-tbody">
            <tr><td colspan="3" class="text-muted text-center" style="padding:var(--space-xl)">Select algorithms and press Run Both to compare</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;let n=document.getElementById(`algo-select-left`),r=document.getElementById(`algo-select-right`);n.value=`knn`,r.value=`decision-tree`;let a=null,o=null,s=null,c=null,l=[];requestAnimationFrame(()=>{a=new w(document.getElementById(`canvas-left`)),o=new w(document.getElementById(`canvas-right`))}),document.getElementById(`compare-run-btn`).addEventListener(`click`,()=>{l.forEach(e=>cancelAnimationFrame(e)),l=[];let e=n.value,t=r.value;s=M[e](),c=M[t]();let f={};for(let[e,t]of Object.entries(s.params))f[e]=t.value;let p={};for(let[e,t]of Object.entries(c.params))p[e]=t.value;s.reset(f),c.reset(p),document.getElementById(`th-left`).textContent=i.find(t=>t.id===e)?.name||e,document.getElementById(`th-right`).textContent=i.find(e=>e.id===t)?.name||t,u(s,e,a,`status-left`,f),u(c,t,o,`status-right`,p),setTimeout(()=>d(),2e3),setTimeout(()=>d(),5e3)});function u(e,t,n,r,i){document.getElementById(r).textContent=`RUNNING`,document.getElementById(r).className=`chip chip-success`;let a=t===`linear-regression`||t===`neural-network`,o=t===`kmeans`||t===`random-forest`;if(a){let t=i.epochs||200,a;function o(){if(e.epoch>=t){document.getElementById(r).textContent=`COMPLETE`,e.render(n),d();return}let s=Math.max(1,Math.floor(t/100));for(let n=0;n<s&&e.epoch<t;n++)e.step(i.learningRate||.5);e.render(n),a=requestAnimationFrame(o),l.push(a)}o()}else if(o){let t;function i(){if(e.converged){document.getElementById(r).textContent=`CONVERGED`,e.render(n),d();return}e.step(),e.render(n),t=requestAnimationFrame(i),l.push(t)}i()}else e.step(i),e.render(n),document.getElementById(r).textContent=`COMPLETE`,d()}function d(){if(!s||!c)return;let e=s.getMetrics(),t=c.getMetrics(),n=[...new Set([...Object.keys(e),...Object.keys(t)])],r=document.getElementById(`compare-tbody`);r&&(r.innerHTML=n.map(n=>`
        <tr>
          <td class="text-label-md">${n}</td>
          <td>${e[n]===void 0?`—`:e[n]}</td>
          <td>${t[n]===void 0?`—`:t[n]}</td>
        </tr>
      `).join(``))}return()=>{l.forEach(e=>cancelAnimationFrame(e)),a&&a.destroy(),o&&o.destroy()}}var P=[{id:`iris`,name:`Iris`,description:`Classic multiclass classification dataset with 3 species of flowers.`,rows:150,features:4,icon:`local_florist`,color:`var(--primary)`},{id:`housing`,name:`Housing Prices`,description:`Predict house prices based on features like area, rooms, and location.`,rows:506,features:13,icon:`home`,color:`var(--secondary)`},{id:`titanic`,name:`Titanic`,description:`Binary classification — predict survival based on passenger data.`,rows:891,features:7,icon:`sailing`,color:`var(--tertiary)`}];function F(e){let t=e.trim().split(`
`);if(t.length<2)return{headers:[],rows:[],numericCols:[]};let n=t[0].split(`,`).map(e=>e.trim().replace(/^"|"$/g,``)),r=[];for(let e=1;e<t.length;e++){let i=t[e].split(`,`).map(e=>e.trim().replace(/^"|"$/g,``));if(i.length===n.length){let e={};n.forEach((t,n)=>{let r=parseFloat(i[n]);e[t]=isNaN(r)?i[n]:r}),r.push(e)}}return{headers:n,rows:r,numericCols:n.filter(e=>r.every(t=>typeof t[e]==`number`&&!isNaN(t[e])))}}var I={iris:{samples:150,features:4,classes:3,featureNames:[`Sepal Length`,`Sepal Width`,`Petal Length`,`Petal Width`],classNames:[`Setosa`,`Versicolor`,`Virginica`],classCounts:[50,50,50],task:`Classification`,description:`Classic multiclass flower classification. Each sample is a flower described by 4 measurements.`},housing:{samples:506,features:13,classes:null,featureNames:[`CRIM`,`ZN`,`INDUS`,`CHAS`,`NOX`,`RM`,`AGE`,`DIS`,`RAD`,`TAX`,`PTRATIO`,`B`,`LSTAT`],classNames:null,classCounts:null,task:`Regression`,description:`Boston house price prediction. Features describe neighbourhood characteristics. Target is median home value.`},titanic:{samples:891,features:7,classes:2,featureNames:[`Pclass`,`Sex`,`Age`,`SibSp`,`Parch`,`Fare`,`Embarked`],classNames:[`Did Not Survive`,`Survived`],classCounts:[549,342],task:`Classification`,description:`Predict Titanic passenger survival. A classic binary classification benchmark.`}};function L(e,t,n,r,i){let a=document.getElementById(e);if(!a||!t.length)return;let o=a.getContext(`2d`),s=window.devicePixelRatio||1,c=a.parentElement.getBoundingClientRect();a.width=c.width*s,a.height=c.height*s,a.style.width=c.width+`px`,a.style.height=c.height+`px`,o.setTransform(s,0,0,s,0,0);let l=c.width,u=c.height,d=t.filter(e=>e[n]!==void 0&&e[r]!==void 0&&!isNaN(parseFloat(e[n]))&&!isNaN(parseFloat(e[r])));if(d.length===0){o.fillStyle=`rgba(164,230,255,0.4)`,o.font=`14px "Space Grotesk"`,o.textAlign=`center`,o.fillText(`Selected columns have no numeric data`,l/2,u/2);return}let f=d.map(e=>parseFloat(e[n])),p=d.map(e=>parseFloat(e[r])),m=Math.min(...f),h=Math.max(...f),g=h-m||1,_=Math.min(...p),v=Math.max(...p),y=v-_||1,b=e=>56+(e-m)/g*(l-112),x=e=>u-56-(e-_)/y*(u-112),S=[`#00d1ff`,`#d0bcff`,`#34d399`,`#fbbf24`,`#ffb4ab`,`#f9a1ff`,`#4cd6ff`,`#ff6b6b`],C={};i&&i!==`__none__`&&[...new Set(d.map(e=>String(e[i])))].forEach((e,t)=>{C[e]=S[t%S.length]}),o.fillStyle=`rgba(11,19,38,0)`,o.fillRect(0,0,l,u),o.strokeStyle=`rgba(164,230,255,0.04)`,o.lineWidth=1;for(let e=0;e<=8;e++){let t=56+e/8*(l-112),n=56+e/8*(u-112);o.beginPath(),o.moveTo(t,56),o.lineTo(t,u-56),o.stroke(),o.beginPath(),o.moveTo(56,n),o.lineTo(l-56,n),o.stroke()}o.strokeStyle=`rgba(164,230,255,0.15)`,o.lineWidth=1.5,o.beginPath(),o.moveTo(56,u-56),o.lineTo(l-56,u-56),o.stroke(),o.beginPath(),o.moveTo(56,56),o.lineTo(56,u-56),o.stroke(),o.fillStyle=`rgba(164,230,255,0.4)`,o.font=`10px "Space Grotesk"`,o.textAlign=`center`,o.fillText(n.toUpperCase(),l/2,u-8),o.save(),o.translate(14,u/2),o.rotate(-Math.PI/2),o.fillText(r.toUpperCase(),0,0),o.restore(),o.fillStyle=`rgba(164,230,255,0.25)`,o.font=`8px "Space Grotesk"`;for(let e=0;e<=4;e++){let t=m+e/4*g,n=_+e/4*y;o.textAlign=`center`,o.fillText(t.toFixed(1),b(t),u-56+14),o.textAlign=`right`,o.fillText(n.toFixed(1),50,x(n)+3)}if(d.forEach(e=>{let t=b(parseFloat(e[n])),a=x(parseFloat(e[r])),s=i&&i!==`__none__`?String(e[i]):null,c=s?C[s]||S[0]:`#00d1ff`;o.beginPath(),o.arc(t,a,5,0,Math.PI*2),o.fillStyle=c+`25`,o.fill(),o.beginPath(),o.arc(t,a,3.5,0,Math.PI*2),o.fillStyle=c+`CC`,o.fill(),o.strokeStyle=c,o.lineWidth=.8,o.stroke()}),i&&i!==`__none__`){let e=Object.entries(C).slice(0,8),t=64;e.forEach(([e,n])=>{o.beginPath(),o.arc(l-56+8,t,5,0,Math.PI*2),o.fillStyle=n+`CC`,o.fill(),o.fillStyle=`rgba(218,226,253,0.7)`,o.font=`9px "Space Grotesk"`,o.textAlign=`left`,o.fillText(String(e).substring(0,14),l-56+18,t+3),t+=18})}o.fillStyle=`rgba(11,19,38,0.75)`,o.beginPath(),o.roundRect(64,64,140,42,6),o.fill(),o.fillStyle=`rgba(164,230,255,0.5)`,o.font=`9px "Space Grotesk"`,o.textAlign=`left`,o.fillText(`${d.length} points plotted`,72,78),o.fillStyle=`rgba(164,230,255,0.3)`,o.font=`8px "Space Grotesk"`,o.fillText(`X: ${m.toFixed(2)} → ${h.toFixed(2)}`,72,92),o.fillText(`Y: ${_.toFixed(2)} → ${v.toFixed(2)}`,136,92)}function R(e){e.classList.add(`page-content`);let t=null;e.innerHTML=`
    <div class="aura aura-primary" style="top:-100px;right:-150px"></div>
    <div class="aura aura-secondary" style="bottom:-100px;left:-200px"></div>
    <div class="container" style="padding-top:var(--space-xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Dataset Playground</div>
        <h1 class="text-display-md" style="max-width:600px">Explore &amp; Upload Datasets</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:550px">
          Use preloaded classic datasets or upload your own CSV. Inspect metadata, visualize your data as a scatter plot, and choose an algorithm to run.
        </p>
      </div>

      <!-- Preloaded Datasets -->
      <h2 class="text-headline-md mb-lg">Preloaded Datasets</h2>
      <div class="dataset-cards mb-2xl">
        ${P.map(e=>`
          <div class="card dataset-card-btn" style="cursor:pointer" data-id="${e.id}">
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md)">
              <div style="width:48px;height:48px;border-radius:var(--radius-lg);background:rgba(164,230,255,0.08);display:flex;align-items:center;justify-content:center">
                <span class="material-symbols-outlined" style="color:${e.color}">${e.icon}</span>
              </div>
              <div>
                <h3 class="text-title-lg">${e.name}</h3>
                <div class="text-label-sm text-dim">${e.rows} rows · ${e.features} features</div>
              </div>
            </div>
            <p class="text-body-sm text-muted mb-md">${e.description}</p>
            <button class="btn btn-outline btn-sm w-full">
              <span class="material-symbols-outlined" style="font-size:16px">info</span> Inspect Dataset
            </button>
          </div>
        `).join(``)}
      </div>

      <!-- Dataset Metadata Panel (preloaded) -->
      <div id="dataset-metadata" class="hidden" style="margin-bottom:var(--space-2xl)"></div>

      <!-- Custom Upload -->
      <h2 class="text-headline-md mb-lg">Upload Your Own CSV</h2>
      <div class="upload-zone" id="upload-zone">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline);margin-bottom:var(--space-md)">cloud_upload</span>
        <p class="text-body-lg" style="margin-bottom:var(--space-xs)">Drag &amp; drop your CSV file here</p>
        <p class="text-body-sm text-muted">or click to browse · max 5 MB</p>
        <input type="file" id="csv-input" accept=".csv" style="display:none" />
      </div>

      <!-- Upload Result Panel -->
      <div id="upload-result" class="hidden" style="margin-top:var(--space-xl)"></div>
    </div>`,document.querySelectorAll(`.dataset-card-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.dataset-card-btn`).forEach(e=>e.classList.remove(`card-selected`)),e.classList.add(`card-selected`),n(e.dataset.id)})});function n(e){let t=I[e],n=P.find(t=>t.id===e);if(!t||!n)return;let r=document.getElementById(`dataset-metadata`);r.classList.remove(`hidden`);let i=t.classCounts&&t.classNames?t.classNames.map((e,n)=>{let r=(t.classCounts[n]/t.samples*100).toFixed(0);return`
            <div style="margin-bottom:var(--space-sm)">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span class="text-body-sm">${e}</span>
                <span class="text-label-sm text-dim">${t.classCounts[n]} (${r}%)</span>
              </div>
              <div style="height:6px;background:var(--surface-container-highest);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${r}%;background:var(--primary);border-radius:3px"></div>
              </div>
            </div>`}).join(``):`<p class="text-body-sm text-muted">Continuous target (regression task)</p>`;r.innerHTML=`
      <div class="card-glass" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <div class="chip chip-${t.task===`Classification`?`primary`:`secondary`} mb-sm">${t.task}</div>
            <h3 class="text-headline-md">${n.name} Dataset</h3>
            <p class="text-body-sm text-muted mt-sm">${t.description}</p>
          </div>
          <a href="#workspace/${t.task===`Classification`?`knn`:`linear-regression`}" class="btn btn-primary btn-sm">
            <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span> Visualize
          </a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)">
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">SAMPLES</div>
            <div class="text-headline-md" style="color:var(--primary)">${t.samples}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">FEATURES</div>
            <div class="text-headline-md" style="color:var(--secondary)">${t.features}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">CLASSES</div>
            <div class="text-headline-md" style="color:var(--success)">${t.classes||`N/A`}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">TASK</div>
            <div class="text-headline-sm" style="color:var(--warning)">${t.task}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl)">
          <div>
            <div class="text-label-sm text-dim mb-md">FEATURE NAMES</div>
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
              ${t.featureNames.map(e=>`<span class="chip chip-primary" style="font-size:9px">${e}</span>`).join(``)}
            </div>
          </div>
          <div>
            <div class="text-label-sm text-dim mb-md">CLASS DISTRIBUTION</div>
            ${i}
          </div>
        </div>
      </div>`}let r=document.getElementById(`upload-zone`),i=document.getElementById(`csv-input`);r.addEventListener(`click`,()=>i.click()),r.addEventListener(`dragover`,e=>{e.preventDefault(),r.classList.add(`dragover`)}),r.addEventListener(`dragleave`,()=>r.classList.remove(`dragover`)),r.addEventListener(`drop`,e=>{e.preventDefault(),r.classList.remove(`dragover`);let t=e.dataTransfer.files[0];t&&a(t)}),i.addEventListener(`change`,()=>{i.files[0]&&a(i.files[0])});function a(e){if(!e.name.endsWith(`.csv`)){alert(`Please upload a CSV file (.csv extension required).`);return}if(e.size>5*1024*1024){alert(`File too large. Please use a CSV under 5 MB.`);return}let n=new FileReader;n.onload=n=>{t=F(n.target.result),o(e.name)},n.readAsText(e)}function o(e){let{headers:n,rows:r,numericCols:i}=t,a=document.getElementById(`upload-result`);a.classList.remove(`hidden`);let o=i[0]||n[0],s=i[1]||n[1]||n[0];a.innerHTML=`
      <!-- Metadata Summary -->
      <div class="card-glass" style="padding:var(--space-xl);margin-bottom:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <div class="chip chip-success mb-sm">Uploaded Successfully</div>
            <h3 class="text-headline-md">${e}</h3>
          </div>
          <a href="#workspace/linear-regression" class="btn btn-primary btn-sm">
            <span class="material-symbols-outlined" style="font-size:16px">play_arrow</span> Run Algorithm
          </a>
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-xl)">
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">ROWS</div>
            <div class="text-headline-md" style="color:var(--primary)">${r.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">COLUMNS</div>
            <div class="text-headline-md" style="color:var(--secondary)">${n.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">NUMERIC</div>
            <div class="text-headline-md" style="color:var(--success)">${i.length}</div>
          </div>
          <div class="glass-panel" style="padding:var(--space-md);border-radius:var(--radius-lg);text-align:center">
            <div class="text-label-sm text-dim">CATEGORICAL</div>
            <div class="text-headline-md" style="color:var(--warning)">${n.length-i.length}</div>
          </div>
        </div>

        <!-- Column chips -->
        <div class="text-label-sm text-dim mb-sm">COLUMNS <span style="opacity:0.5;font-weight:400">· green = numeric · yellow = categorical</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
          ${n.map(e=>`<span class="chip ${i.includes(e)?`chip-success`:`chip-warning`}" style="font-size:9px">${e}</span>`).join(``)}
        </div>
      </div>

      <!-- Visualization Section -->
      <div class="card-glass" style="padding:var(--space-xl);margin-bottom:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-lg)">
          <div>
            <h3 class="text-headline-md">Scatter Plot Visualization</h3>
            <p class="text-body-sm text-muted mt-sm">Select which columns to plot on each axis and optionally color points by a third column.</p>
          </div>
        </div>

        <!-- Column selectors -->
        <div style="display:flex;gap:var(--space-md);margin-bottom:var(--space-lg);flex-wrap:wrap">
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">X AXIS</div>
            <select class="select-field" id="scatter-x">
              ${i.map(e=>`<option value="${e}" ${e===o?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">Y AXIS</div>
            <select class="select-field" id="scatter-y">
              ${i.map(e=>`<option value="${e}" ${e===s?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
          <div style="flex:1;min-width:140px">
            <div class="text-label-sm text-dim mb-sm">COLOR BY (optional)</div>
            <select class="select-field" id="scatter-color">
              <option value="__none__">None</option>
              ${n.map(e=>`<option value="${e}">${e}</option>`).join(``)}
            </select>
          </div>
          <div style="display:flex;align-items:flex-end">
            <button class="btn btn-primary btn-sm" id="btn-replot">
              <span class="material-symbols-outlined" style="font-size:16px">refresh</span> Plot
            </button>
          </div>
        </div>

        <!-- Canvas -->
        <div class="vis-canvas-wrap" style="min-height:400px">
          <canvas id="scatter-canvas"></canvas>
        </div>
      </div>

      <!-- Data Table Preview -->
      <div class="card-glass" style="padding:0;overflow:hidden">
        <div style="padding:var(--space-md) var(--space-lg);border-bottom:1px solid var(--glass-border);display:flex;justify-content:space-between;align-items:center">
          <h3 class="text-headline-sm">Data Table Preview</h3>
          <span class="chip chip-primary" style="font-size:9px">Showing first 50 rows of ${r.length}</span>
        </div>
        <div style="max-height:340px;overflow:auto">
          <table class="data-preview-table">
            <thead><tr>${n.map(e=>`<th>${e} ${i.includes(e)?`<span style="color:var(--success);opacity:0.6">●</span>`:``}</th>`).join(``)}</tr></thead>
            <tbody>${r.slice(0,50).map(e=>`<tr>${n.map(t=>`<td>${e[t]===void 0?`—`:e[t]}</td>`).join(``)}</tr>`).join(``)}</tbody>
          </table>
        </div>
      </div>`;let c=()=>{let e=document.getElementById(`scatter-x`).value,t=document.getElementById(`scatter-y`).value,n=document.getElementById(`scatter-color`).value;requestAnimationFrame(()=>L(`scatter-canvas`,r,e,t,n))};document.getElementById(`btn-replot`).addEventListener(`click`,c),document.getElementById(`scatter-x`).addEventListener(`change`,c),document.getElementById(`scatter-y`).addEventListener(`change`,c),document.getElementById(`scatter-color`).addEventListener(`change`,c),requestAnimationFrame(()=>L(`scatter-canvas`,r,o,s,`__none__`))}}function z(){let e={age:[],income:[],score:[]},t=[];for(let n=0;n<80;n++){let n=18+Math.random()*50+(Math.random()<.05?100:0),r=2e4+Math.random()*8e4,i=30+Math.random()*70;e.age.push(Math.random()<.08?null:parseFloat(n.toFixed(1))),e.income.push(Math.random()<.06?null:parseFloat(r.toFixed(0))),e.score.push(Math.random()<.1?null:parseFloat(i.toFixed(1))),t.push(+(r>5e4&&i>60))}return{features:e,labels:t,featureNames:[`Age`,`Income`,`Score`]}}function B(e){let t=e.filter(e=>e!=null);if(!t.length)return{mean:0,median:0,min:0,max:0,std:0,missing:e.length};t.sort((e,t)=>e-t);let n=t.reduce((e,t)=>e+t,0)/t.length,r=t.length%2==0?(t[t.length/2-1]+t[t.length/2])/2:t[Math.floor(t.length/2)],i=Math.sqrt(t.reduce((e,t)=>e+(t-n)**2,0)/t.length);return{mean:n,median:r,min:t[0],max:t[t.length-1],std:i,missing:e.length-t.length}}function V(e){let t=e.filter(e=>e!==null),n=Math.min(...t),r=Math.max(...t)-n||1;return e.map(e=>e===null?null:(e-n)/r)}function H(e){let t=e.filter(e=>e!==null),n=t.reduce((e,t)=>e+t,0)/t.length,r=Math.sqrt(t.reduce((e,t)=>e+(t-n)**2,0)/t.length)||1;return e.map(e=>e===null?null:(e-n)/r)}function U(e){let t=e.filter(e=>e!==null),n=t.reduce((e,t)=>e+t,0)/t.length;return e.map(e=>e===null?parseFloat(n.toFixed(2)):e)}function W(e){let t=e.filter(e=>e!==null).sort((e,t)=>e-t),n=t.length%2==0?(t[t.length/2-1]+t[t.length/2])/2:t[Math.floor(t.length/2)];return e.map(e=>e===null?parseFloat(n.toFixed(2)):e)}function G(e,t=12){let n=e.filter(e=>e!==null&&!isNaN(e));if(!n.length)return{counts:Array(t).fill(0),edges:[]};let r=Math.min(...n),i=Math.max(...n),a=(i-r||1)/t,o=Array(t).fill(0);for(let e of n)o[Math.min(Math.floor((e-r)/a),t-1)]++;return{counts:o,min:r,max:i}}function K(e,t,n,r,i,a,o,s){let{counts:c}=a,l=Math.max(...c,1),u=r/c.length;e.fillStyle=`rgba(11,19,38,0.5)`,e.beginPath(),e.roundRect(t-8,n-24,r+16,i+40,8),e.fill(),e.fillStyle=o,e.font=`10px "Space Grotesk"`,e.textAlign=`left`,e.fillText(s,t,n-8);for(let r=0;r<c.length;r++){let a=c[r]/l*i,s=t+r*u,d=n+i-a;e.fillStyle=o+`25`,e.fillRect(s+1,d-2,u-2,a+2),e.fillStyle=o+`CC`,e.fillRect(s+1,d,u-2,a),e.fillStyle=o,e.fillRect(s+1,d,u-2,2)}e.strokeStyle=`rgba(164,230,255,0.15)`,e.lineWidth=1,e.beginPath(),e.moveTo(t,n+i),e.lineTo(t+r,n+i),e.stroke()}function q(e){e.classList.add(`page-content`);let t=z(),n=`mean`,r=`minmax`,i=0;e.innerHTML=`
    <div class="aura aura-primary" style="top:-100px;right:-200px"></div>
    <div class="aura aura-secondary" style="bottom:-100px;left:-200px"></div>
    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Data Preprocessing</div>
        <h1 class="text-display-md" style="max-width:700px">Preprocessing Visualizer</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:600px">
          Explore how missing value handling, feature scaling, and normalization transform your data before training.
        </p>
      </div>
      <div class="preprocess-controls-row">
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">FEATURE</div>
          <select class="select-field" id="pp-feature-select">
            ${t.featureNames.map((e,t)=>`<option value="${t}">${e}</option>`).join(``)}
          </select>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">IMPUTE METHOD</div>
          <div class="segmented-control" id="pp-impute-control">
            <button class="active" data-method="mean">Mean</button>
            <button data-method="median">Median</button>
            <button data-method="drop">Drop</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">SCALING</div>
          <div class="segmented-control" id="pp-scale-control">
            <button class="active" data-method="minmax">Min-Max</button>
            <button data-method="zscore">Z-Score</button>
            <button data-method="none">None</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-primary btn-sm w-full" id="pp-regenerate">
            <span class="material-symbols-outlined" style="font-size:16px">refresh</span> New Dataset
          </button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-top:var(--space-xl)">
        <div class="card-glass" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
            <span class="material-symbols-outlined text-warning" style="font-size:20px">warning</span>
            <h3 class="text-headline-sm">Raw Data (with missing values)</h3>
          </div>
          <div id="pp-raw-table-wrap" style="max-height:260px;overflow:auto;border-radius:var(--radius-md)">
            <table class="data-preview-table" id="pp-raw-table"></table>
          </div>
          <div id="pp-raw-stats" class="preprocess-stats-row" style="margin-top:var(--space-md)"></div>
        </div>
        <div class="card-glass" style="padding:var(--space-lg)">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
            <span class="material-symbols-outlined text-success" style="font-size:20px">check_circle</span>
            <h3 class="text-headline-sm">After Imputation</h3>
          </div>
          <div id="pp-clean-table-wrap" style="max-height:260px;overflow:auto;border-radius:var(--radius-md)">
            <table class="data-preview-table" id="pp-clean-table"></table>
          </div>
          <div id="pp-clean-stats" class="preprocess-stats-row" style="margin-top:var(--space-md)"></div>
        </div>
      </div>
      <div style="margin-top:var(--space-xl)">
        <h2 class="text-headline-md mb-md">Distribution: Before vs After Preprocessing</h2>
        <div class="vis-canvas-wrap" style="min-height:300px"><canvas id="pp-histogram-canvas"></canvas></div>
      </div>
      <div style="margin-top:var(--space-xl)">
        <h2 class="text-headline-md mb-md">Feature Scaling Comparison</h2>
        <div class="vis-canvas-wrap" style="min-height:280px"><canvas id="pp-scaling-canvas"></canvas></div>
      </div>
      <div class="card-glass" style="padding:var(--space-xl);margin-top:var(--space-xl);border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
          <span class="material-symbols-outlined text-primary" style="font-size:20px">lightbulb</span>
          <h3 class="text-headline-sm">How Preprocessing Helps</h3>
        </div>
        <div id="pp-explanation" class="text-body-md text-muted" style="line-height:1.8"></div>
      </div>
    </div>`,document.getElementById(`pp-feature-select`).addEventListener(`change`,e=>{i=parseInt(e.target.value),c()}),document.querySelectorAll(`#pp-impute-control button`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#pp-impute-control button`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),n=e.dataset.method,c()})}),document.querySelectorAll(`#pp-scale-control button`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#pp-scale-control button`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),r=e.dataset.method,c()})}),document.getElementById(`pp-regenerate`).addEventListener(`click`,()=>{t=z(),c()});function a(e){return t.features[Object.keys(t.features)[e]]}function o(e){return n===`mean`?U(e):n===`median`?W(e):e.filter(e=>e!==null)}function s(e){return r===`minmax`?V(e):r===`zscore`?H(e):e}function c(){l(),f(),p(),m()}function l(){let e=a(i),r=t.featureNames[i],s=o(e);document.getElementById(`pp-raw-table`).innerHTML=`<thead><tr><th>#</th><th>${r}</th><th>Status</th></tr></thead><tbody>${e.slice(0,30).map((e,t)=>`<tr style="${e===null?`background:rgba(255,180,171,0.08)`:``}"><td>${t+1}</td><td>${e===null?`<span style="color:var(--error);font-weight:700">MISSING</span>`:e}</td><td>${e===null?`<span class="chip chip-error" style="font-size:9px;padding:2px 8px">null</span>`:`<span class="chip chip-success" style="font-size:9px;padding:2px 8px">ok</span>`}</td></tr>`).join(``)}</tbody>`,document.getElementById(`pp-clean-table`).innerHTML=`<thead><tr><th>#</th><th>${r}</th><th>Source</th></tr></thead><tbody>${s.slice(0,30).map((t,r)=>{let i=n!==`drop`&&e[r]===null;return`<tr style="${i?`background:rgba(52,211,153,0.08)`:``}"><td>${r+1}</td><td>${t===null?`—`:typeof t==`number`?t.toFixed(2):t}</td><td>${i?`<span class="chip chip-primary" style="font-size:9px;padding:2px 8px">${n}</span>`:`<span class="chip chip-success" style="font-size:9px;padding:2px 8px">original</span>`}</td></tr>`}).join(``)}</tbody>`;let c=B(e),l=B(s);document.getElementById(`pp-raw-stats`).innerHTML=u(c,!0),document.getElementById(`pp-clean-stats`).innerHTML=u(l,!1)}function u(e,t){return`<div class="preprocess-stat"><span class="text-label-sm text-dim">MEAN</span><span class="text-headline-sm">${e.mean.toFixed(1)}</span></div><div class="preprocess-stat"><span class="text-label-sm text-dim">MEDIAN</span><span class="text-headline-sm">${e.median.toFixed(1)}</span></div><div class="preprocess-stat"><span class="text-label-sm text-dim">STD</span><span class="text-headline-sm">${e.std.toFixed(1)}</span></div>${t?`<div class="preprocess-stat"><span class="text-label-sm text-dim">MISSING</span><span class="text-headline-sm" style="color:var(--error)">${e.missing}</span></div>`:``}<div class="preprocess-stat"><span class="text-label-sm text-dim">RANGE</span><span class="text-headline-sm">${e.min.toFixed(0)}–${e.max.toFixed(0)}</span></div>`}function d(e){let t=document.getElementById(e);if(!t)return null;let n=t.getContext(`2d`),r=window.devicePixelRatio||1,i=t.parentElement.getBoundingClientRect();return t.width=i.width*r,t.height=i.height*r,t.style.width=i.width+`px`,t.style.height=i.height+`px`,n.setTransform(r,0,0,r,0,0),{ctx:n,w:i.width,h:i.height}}function f(){let e=d(`pp-histogram-canvas`);if(!e)return;let{ctx:c,w:l,h:u}=e;c.clearRect(0,0,l,u);let f=a(i),p=o(f),m=s(p),h=(l-80)/3,g=u-80;K(c,20,40,h-10,g,G(f),`#ffb4ab`,`RAW ${t.featureNames[i]}`),K(c,20+h+10,40,h-10,g,G(p),`#34d399`,`AFTER ${n.toUpperCase()}`),K(c,20+(h+10)*2,40,h-10,g,G(m),`#00d1ff`,`AFTER ${r.toUpperCase()}`)}function p(){let e=d(`pp-scaling-canvas`);if(!e)return;let{ctx:n,w:i,h:a}=e;n.clearRect(0,0,i,a);let c=Object.keys(t.features),l=[`#00d1ff`,`#d0bcff`,`#34d399`],u=(i-80)/c.length;for(let e=0;e<c.length;e++){let i=t.features[c[e]],d=s(o(i)),f=B(i);B(d);let p=40+e*u+u/2;n.fillStyle=l[e],n.font=`bold 11px "Space Grotesk"`,n.textAlign=`center`,n.fillText(t.featureNames[e].toUpperCase(),p,20);let m=Math.min((f.max-f.min)/(f.max||1)*(a-80),a-80);n.fillStyle=l[e]+`25`,n.fillRect(p-50-10,a-40-m,50,m),n.fillStyle=l[e]+`80`,n.fillRect(p-50-10,a-40-m,50,3),n.fillStyle=`rgba(164,230,255,0.4)`,n.font=`9px "Space Grotesk"`,n.fillText(`RAW`,p-50/2-10,a-24),n.fillText(`${f.min.toFixed(0)}–${f.max.toFixed(0)}`,p-50/2-10,a-12);let h=d.filter(e=>e!==null),g=Math.min(...h),_=Math.max(...h),v=Math.max(20,Math.min((_-g+.1)*(a-80),a-80));n.fillStyle=l[e]+`50`,n.fillRect(p+10,a-40-v,50,v),n.fillStyle=l[e],n.fillRect(p+10,a-40-v,50,3),n.fillStyle=`rgba(164,230,255,0.4)`,n.fillText(r.toUpperCase(),p+50/2+10,a-24),n.fillText(`${g.toFixed(2)}–${_.toFixed(2)}`,p+50/2+10,a-12)}}function m(){let e=document.getElementById(`pp-explanation`);if(!e)return;let t=B(a(i));e.innerHTML=`<p style="margin-bottom:var(--space-md)">${{mean:`<strong>Mean imputation</strong> replaces ${t.missing} missing values with the mean (${t.mean.toFixed(1)}). Preserves the average but may reduce variance.`,median:`<strong>Median imputation</strong> replaces ${t.missing} missing values with the median (${t.median.toFixed(1)}). More robust to outliers than mean.`,drop:`<strong>Dropping missing values</strong> removes ${t.missing} rows. Simplest approach but reduces dataset size.`}[n]}</p><p style="margin-bottom:var(--space-md)">${{minmax:`<strong>Min-Max normalization</strong> scales all values to [0, 1]: x' = (x - min) / (max - min). Preserves distribution shape but is sensitive to outliers.`,zscore:`<strong>Z-score standardization</strong> transforms to mean=0, std=1: x' = (x - μ) / σ. Preferred for algorithms assuming normal distributions.`,none:`<strong>No scaling</strong> — features remain in original ranges. Distance-based algorithms will be dominated by high-magnitude features.`}[r]}</p><p><strong>Why it matters:</strong> Preprocessing ensures all features contribute equally. Without scaling, Income (20k–100k) dominates Score (30–100) in distance-based algorithms.</p>`}requestAnimationFrame(()=>c());let h=()=>{f(),p()};return window.addEventListener(`resize`,h),()=>window.removeEventListener(`resize`,h)}function J(e){e.classList.add(`page-content`);let t=.8,n=!0,r=f(50,[[.3,.7],[.7,.3]],.13),i=[],a=[],o=0,s=null;function c(){let e=r.points.length,s=r.points.map((e,t)=>t);if(n){let e={};s.forEach(t=>{let n=r.labels[t];e[n]||(e[n]=[]),e[n].push(t)}),i=[],a=[];for(let n of Object.keys(e)){let r=e[n].sort(()=>Math.random()-.5),o=Math.floor(r.length*t);i.push(...r.slice(0,o)),a.push(...r.slice(o))}}else{let n=s.sort(()=>Math.random()-.5),r=Math.floor(e*t);i=n.slice(0,r),a=n.slice(r)}o=0,d()}function l(e){let t={};return e.forEach(e=>{let n=r.labels[e];t[n]=(t[n]||0)+1}),t}e.innerHTML=`
    <div class="aura aura-primary" style="top:50%;left:-200px"></div>
    <div class="aura aura-secondary" style="bottom:0;right:-200px"></div>
    <div class="container" style="padding-top:var(--space-2xl);padding-bottom:var(--space-3xl)">
      <div class="section-header" style="text-align:left;margin-bottom:var(--space-2xl)">
        <div class="chip chip-primary mb-md">Train / Test Split</div>
        <h1 class="text-display-md" style="max-width:700px">Interactive Data Splitting</h1>
        <p class="text-body-lg text-muted mt-sm" style="max-width:600px">
          Drag the slider to change the split ratio. Watch data points recolor in real time — cyan for training, purple for testing.
        </p>
      </div>

      <!-- Controls -->
      <div class="preprocess-controls-row">
        <div class="glass-panel preprocess-control-card" style="flex:2">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="text-label-sm text-dim">SPLIT RATIO</span>
            <span class="text-headline-sm text-primary" id="tts-ratio-val">${Math.round(t*100)}/${Math.round((1-t)*100)}</span>
          </div>
          <input type="range" id="tts-ratio-slider" min="50" max="95" step="5" value="${t*100}" />
          <div style="display:flex;justify-content:space-between;margin-top:4px">
            <span class="text-label-sm text-dim">50/50</span>
            <span class="text-label-sm text-dim">95/5</span>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <div class="text-label-sm text-dim mb-sm">STRATEGY</div>
          <div class="segmented-control" id="tts-strategy">
            <button class="active" data-val="true">Stratified</button>
            <button data-val="false">Random</button>
          </div>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-primary btn-sm w-full" id="tts-reshuffle">
            <span class="material-symbols-outlined" style="font-size:16px">shuffle</span> Reshuffle
          </button>
        </div>
        <div class="glass-panel preprocess-control-card">
          <button class="btn btn-secondary btn-sm w-full" id="tts-newdata">
            <span class="material-symbols-outlined" style="font-size:16px">refresh</span> New Data
          </button>
        </div>
      </div>

      <!-- Split Bar -->
      <div class="split-bar-container" style="margin-top:var(--space-lg)">
        <div class="split-bar">
          <div class="split-bar-train" id="tts-bar-train" style="width:${t*100}%">
            <span>Train <span id="tts-train-count">${i.length}</span></span>
          </div>
          <div class="split-bar-test" id="tts-bar-test" style="width:${(1-t)*100}%">
            <span>Test <span id="tts-test-count">${a.length}</span></span>
          </div>
        </div>
      </div>

      <!-- Scatter Canvas -->
      <div style="margin-top:var(--space-xl)">
        <div class="vis-canvas-wrap" style="min-height:420px">
          <canvas id="tts-canvas"></canvas>
          <div style="position:absolute;top:16px;right:16px;display:flex;gap:var(--space-sm)">
            <span class="chip chip-primary" style="font-size:9px">● Train</span>
            <span class="chip chip-secondary" style="font-size:9px">● Test</span>
          </div>
        </div>
      </div>

      <!-- Info panels -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-top:var(--space-xl)">
        <div class="card-glass" style="padding:var(--space-lg)">
          <h3 class="text-headline-sm mb-md" style="color:var(--primary)">Training Set</h3>
          <div id="tts-train-info"></div>
        </div>
        <div class="card-glass" style="padding:var(--space-lg)">
          <h3 class="text-headline-sm mb-md" style="color:var(--secondary)">Test Set</h3>
          <div id="tts-test-info"></div>
        </div>
      </div>

      <!-- Explanation -->
      <div class="card-glass" style="padding:var(--space-xl);margin-top:var(--space-xl);border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md)">
          <span class="material-symbols-outlined text-primary" style="font-size:20px">lightbulb</span>
          <h3 class="text-headline-sm">Understanding Train/Test Split</h3>
        </div>
        <div id="tts-explanation" class="text-body-md text-muted" style="line-height:1.8"></div>
      </div>
    </div>`;let u=document.getElementById(`tts-ratio-slider`);u.addEventListener(`input`,()=>{t=parseInt(u.value)/100,document.getElementById(`tts-ratio-val`).textContent=`${Math.round(t*100)}/${Math.round((1-t)*100)}`,c()}),document.querySelectorAll(`#tts-strategy button`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`#tts-strategy button`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),n=e.dataset.val===`true`,c()})}),document.getElementById(`tts-reshuffle`).addEventListener(`click`,()=>c()),document.getElementById(`tts-newdata`).addEventListener(`click`,()=>{r=f(50,[[.3,.7],[.7,.3]],.13),c()});function d(){s&&cancelAnimationFrame(s),o=0;function e(){o=Math.min(1,o+.06),p(),m(),o<1&&(s=requestAnimationFrame(e))}e()}function p(){let e=document.getElementById(`tts-canvas`);if(!e)return;let t=e.getContext(`2d`),n=window.devicePixelRatio||1,s=e.parentElement.getBoundingClientRect();e.width=s.width*n,e.height=s.height*n,e.style.width=s.width+`px`,e.style.height=s.height+`px`,t.setTransform(n,0,0,n,0,0);let c=s.width,l=s.height;t.clearRect(0,0,c,l),t.strokeStyle=`rgba(164,230,255,0.04)`,t.lineWidth=1;for(let e=0;e<=10;e++){let n=50+e/10*(c-100),r=50+e/10*(l-100);t.beginPath(),t.moveTo(n,50),t.lineTo(n,l-50),t.stroke(),t.beginPath(),t.moveTo(50,r),t.lineTo(c-50,r),t.stroke()}let u=new Set(i);for(let e=0;e<r.points.length;e++){let n=r.points[e],i=50+n[0]*(c-100),a=l-50-n[1]*(l-100),s=u.has(e)?[0,209,255]:[208,188,255],d=s[0],f=s[1],p=s[2],m=.3+o*.7;t.beginPath(),t.arc(i,a,8,0,Math.PI*2),t.fillStyle=`rgba(${d},${f},${p},${m*.15})`,t.fill(),t.beginPath(),t.arc(i,a,5,0,Math.PI*2),t.fillStyle=`rgba(${d},${f},${p},${m})`,t.fill(),r.labels[e]===1&&(t.strokeStyle=`rgba(${d},${f},${p},${m*.6})`,t.lineWidth=1,t.beginPath(),t.arc(i,a,8,0,Math.PI*2),t.stroke())}t.fillStyle=`rgba(164,230,255,0.3)`,t.font=`10px "Space Grotesk"`,t.textAlign=`center`,t.fillText(`${i.length} train / ${a.length} test`,c/2,l-15)}function m(){let e=l(i),r=l(a);document.getElementById(`tts-bar-train`).style.width=`${t*100}%`,document.getElementById(`tts-bar-test`).style.width=`${(1-t)*100}%`,document.getElementById(`tts-train-count`).textContent=i.length,document.getElementById(`tts-test-count`).textContent=a.length,document.getElementById(`tts-train-info`).innerHTML=`
      <div class="preprocess-stats-row">
        <div class="preprocess-stat"><span class="text-label-sm text-dim">SAMPLES</span><span class="text-headline-sm">${i.length}</span></div>
        ${Object.entries(e).map(([e,t])=>`<div class="preprocess-stat"><span class="text-label-sm text-dim">CLASS ${e}</span><span class="text-headline-sm">${t} (${(t/i.length*100).toFixed(0)}%)</span></div>`).join(``)}
      </div>`,document.getElementById(`tts-test-info`).innerHTML=`
      <div class="preprocess-stats-row">
        <div class="preprocess-stat"><span class="text-label-sm text-dim">SAMPLES</span><span class="text-headline-sm">${a.length}</span></div>
        ${Object.entries(r).map(([e,t])=>`<div class="preprocess-stat"><span class="text-label-sm text-dim">CLASS ${e}</span><span class="text-headline-sm">${t} (${(t/a.length*100).toFixed(0)}%)</span></div>`).join(``)}
      </div>`;let o=document.getElementById(`tts-explanation`);if(o){let e=Math.round(t*100);o.innerHTML=`
        <p style="margin-bottom:var(--space-md)"><strong>${e}/${100-e} split</strong> — ${e}% of data is used for training, ${100-e}% held out for testing. ${e>=80?`This is the most common split ratio, giving the model enough data to learn while keeping a fair test set.`:e>=70?`A 70/30 split provides a larger test set for more reliable evaluation, at the cost of less training data.`:`A 50/50 or 60/40 split is unusual — consider increasing training data for better model performance.`}</p>
        <p><strong>${n?`Stratified`:`Random`} split</strong> — ${n?`Class proportions are preserved in both sets. This ensures the test set is representative, especially important for imbalanced datasets.`:`Points are randomly assigned regardless of class. This may result in class imbalance between train and test sets.`}</p>`}}c();let h=()=>p();return window.addEventListener(`resize`,h),()=>{s&&cancelAnimationFrame(s),window.removeEventListener(`resize`,h)}}t(document.getElementById(`navbar`));var Y={landing:{render:e=>n(e)},explorer:{render:e=>o(e)},workspace:{render:(e,t)=>A(e,t)},pipeline:{render:e=>j(e)},compare:{render:e=>N(e)},playground:{render:e=>R(e)},preprocessing:{render:e=>q(e)},"train-test-split":{render:e=>J(e)}},X=document.getElementById(`page-content`);new e(Y,X),window.addEventListener(`hashchange`,()=>{if(window.location.hash.slice(1).split(`/`)[0]!==`workspace`){let e=document.getElementById(`algo-sidebar`);e&&e.closest(`div`)?.remove(),X.classList.remove(`page-with-sidebar`)}X.classList.remove(`page-content`)}),console.log(`🧠 Algonex initialized`);