// Route preloader utility for better performance
export const preloadRoute = (routeImport: () => Promise<any>) => {
  // Preload the route when user hovers or focuses on navigation
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  
  // Start preloading the module
  routeImport().catch(() => {
    // Silently fail if preload doesn't work
  });
};

// Preload critical routes on user interaction
export const preloadCriticalRoutes = () => {
  // Preload most commonly accessed routes
  const criticalRoutes = [
    () => import('@/pages/Dashboard'),
    () => import('@/pages/Records'),
  ];
  
  criticalRoutes.forEach(route => {
    setTimeout(() => preloadRoute(route), 2000); // Preload after 2 seconds
  });
};

// Preload on hover/focus for navigation items
export const addPreloadListeners = () => {
  // Add event listeners for navigation preloading
  const navLinks = document.querySelectorAll('[data-preload]');
  
  navLinks.forEach(link => {
    const routeName = link.getAttribute('data-preload');
    
    const preloadHandler = () => {
      switch (routeName) {
        case 'dashboard':
          preloadRoute(() => import('@/pages/Dashboard'));
          break;
        case 'records':
          preloadRoute(() => import('@/pages/Records'));
          break;
        case 'reports':
          preloadRoute(() => import('@/pages/Reports'));
          break;
        case 'settings':
          preloadRoute(() => import('@/pages/Settings'));
          break;
        case 'payments':
          preloadRoute(() => import('@/pages/PaymentInput'));
          break;
      }
    };
    
    link.addEventListener('mouseenter', preloadHandler, { once: true });
    link.addEventListener('focus', preloadHandler, { once: true });
  });
}; 