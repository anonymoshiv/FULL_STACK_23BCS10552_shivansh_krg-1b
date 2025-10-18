// Redirect to Role Pages
function redirectTo(role) {
    window.location.href = `${role}.html`;
  }
  
  // Sample Auth Check (for all pages)
  function checkAuth() {
    // In real app, check cookies/localStorage
    const currentPage = window.location.pathname.split('/').pop();
    if (!currentPage.includes('index.html')) {
      const role = currentPage.split('.')[0];
      console.log(`Authenticated as ${role}`);
    }
  }
  
  // Initialize on each page load
  document.addEventListener('DOMContentLoaded', checkAuth);