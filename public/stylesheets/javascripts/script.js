// Add an 'active' class to the current page's navbar link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const currentUrl = window.location.href;
  
    navLinks.forEach(link => {
      if (link.href === currentUrl) {
        link.classList.add('active');
      }
    });
  });
  