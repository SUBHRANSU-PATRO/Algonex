// ═══════════════════════════════════════════════════
// Algonex SPA Router
// Hash-based routing: #landing, #explorer, #workspace/linear-regression, etc.
// ═══════════════════════════════════════════════════

export class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
    this.currentCleanup = null;

    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  }

  resolve() {
    const hash = window.location.hash.slice(1) || 'landing';
    const parts = hash.split('/');
    const routeKey = parts[0];
    const params = parts.slice(1);

    const route = this.routes[routeKey];
    if (!route) {
      this.navigate('landing');
      return;
    }

    // Cleanup previous page
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      this.currentCleanup();
    }

    // Clear container
    this.container.innerHTML = '';

    // Render new page
    const cleanup = route.render(this.container, ...params);
    this.currentCleanup = cleanup || null;

    // Update active nav links
    document.querySelectorAll('.navbar-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkRoute = href.replace('#', '').split('/')[0];
      link.classList.toggle('active', linkRoute === routeKey);
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }

  navigate(route) {
    window.location.hash = `#${route}`;
  }
}
