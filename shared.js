/* 
   Rotaract Club of Thane Downtown - Shared Header & Footer Injection
   Maintains standard layouts and handles mobile nav drawers across pages.
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Header Nav
  injectHeader();
  
  // 2. Inject Footer
  injectFooter();
  
  // 3. Setup Scroll Event for Sticky Header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-nav');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
  
  // 4. Setup Mobile Nav Toggle
  setupMobileNav();
  
  // 5. Set Active Page
  setActivePage();

  // 6. Initialize Custom Cursor Follower
  initCustomCursor();
});

function injectHeader() {
  const headerHtml = `
    <nav class="header-nav">
      <div class="container nav-container">
        <div class="logo">
          <a href="index.html">
            <img src="https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/published/rctd-cranberry.png" alt="RC THANE DOWNTOWN Logo">
          </a>
        </div>
        <ul class="nav-menu">
          <li class="nav-item" data-page="index"><a href="index.html">Home</a></li>
          <li class="nav-item" data-page="about-us"><a href="about-us.html">About Us</a></li>
          <li class="nav-item" data-page="projects"><a href="projects.html">Projects</a></li>
          <li class="nav-item" data-page="our-team"><a href="our-team.html">Our Team</a></li>
          <li class="nav-item" data-page="our-calender"><a href="our-calender.html">Calendar</a></li>
          <li class="nav-item" data-page="contact-us"><a href="contact-us.html">Contact Us</a></li>
          <li class="nav-item" data-page="more-about-us"><a href="more-about-us.html">More About Us</a></li>
        </ul>
        <button class="hamburger" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Nav Drawer -->
    <div class="drawer-overlay"></div>
    <div class="mobile-drawer">
      <button class="drawer-close" aria-label="Close Navigation">&times;</button>
      <div class="logo">
        <img src="https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/published/rctd-cranberry.png" alt="RC THANE DOWNTOWN Logo" style="height: 50px;">
      </div>
      <ul class="mobile-nav-menu">
        <li class="mobile-nav-item" data-page="index"><a href="index.html">Home</a></li>
        <li class="mobile-nav-item" data-page="about-us"><a href="about-us.html">About Us</a></li>
        <li class="mobile-nav-item" data-page="projects"><a href="projects.html">Projects</a></li>
        <li class="mobile-nav-item" data-page="our-team"><a href="our-team.html">Our Team</a></li>
        <li class="mobile-nav-item" data-page="our-calender"><a href="our-calender.html">Calendar</a></li>
        <li class="mobile-nav-item" data-page="contact-us"><a href="contact-us.html">Contact Us</a></li>
        <li class="mobile-nav-item" data-page="more-about-us"><a href="more-about-us.html">More About Us</a></li>
      </ul>
    </div>
  `;
  
  // Insert at the top of the body
  document.body.insertAdjacentHTML('afterbegin', headerHtml);
}

function injectFooter() {
  const footerHtml = `
    <footer>
      <div class="container footer-grid">
        <div class="footer-about">
          <img src="https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/published/rctd-cranberry.png" alt="RC THANE DOWNTOWN Logo" class="footer-logo">
          <p>Building a family and shaping future leaders through impactful, sustainable initiatives that change lives, one step at a time.</p>
          <div class="footer-socials">
            <a href="https://www.facebook.com/rotaractclubofthanedowntown/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="https://www.instagram.com/rcthanedowntown/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://twitter.com/rcthanedowntown" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://www.youtube.com/channel/UC5Oi2K9UX49dN0Jz0Ak47FA" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="our-team.html">Our Team</a></li>
            <li><a href="our-calender.html">Calendar</a></li>
            <li><a href="contact-us.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h3>Meetings Info</h3>
          <p style="margin-bottom: 0.5rem; color: #94a3b8;">General Body Meetings held twice a month.</p>
          <p style="margin-bottom: 0.5rem; color: #94a3b8;"><strong>Venue:</strong> Thane, Maharashtra, India - 400601</p>
          <p style="color: #94a3b8;"><strong>Phone:</strong> +91 84518 91398</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Rotaract Club of Thane Downtown. All rights reserved.</p>
        <p class="weebly-ref">Krawzyraj</p>
      </div>
    </footer>
  `;
  
  // Insert at the bottom of the body
  document.body.insertAdjacentHTML('beforeend', footerHtml);
}

function setupMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  
  if (!hamburger || !closeBtn || !drawer || !overlay) return;
  
  const openMenu = () => {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  };
  
  const closeMenu = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = ''; // Enable background scrolling
  };
  
  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

function setActivePage() {
  // Get current page from URL
  let path = window.location.pathname;
  let page = path.split('/').pop().replace('.html', '');
  
  if (page === '' || page === 'index') {
    page = 'index';
  }
  
  // Mark active items in desktop header
  const desktopItems = document.querySelectorAll('.nav-item');
  desktopItems.forEach(item => {
    if (item.getAttribute('data-page') === page) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Mark active items in mobile drawer
  const mobileItems = document.querySelectorAll('.mobile-nav-item');
  mobileItems.forEach(item => {
    if (item.getAttribute('data-page') === page) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function initCustomCursor() {
  // Only initialize on desktop devices with hover support (prevent touch breakdown)
  if (window.matchMedia("(hover: none)").matches) return;

  // Create cursor elements in DOM
  const cursorHtml = `
    <div class="custom-cursor-dot"></div>
    <div class="custom-cursor-ring"></div>
  `;
  document.body.insertAdjacentHTML('beforeend', cursorHtml);

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!dot || !ring) return;

  // Activate cursor styles on body
  document.body.classList.add('custom-cursor-active');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let isMoving = false;

  // Track cursor coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Fade in cursor elements on first move
    if (!isMoving) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isMoving = true;
    }
  });

  // Mouse leave browser viewport handling
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isMoving = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    isMoving = true;
  });

  // Animation frame tick for smooth LERP inertia
  const tick = () => {
    // Lerp formula: current + (target - current) * factor
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    // Apply hardware-accelerated translations
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Hover transitions delegation
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    // Check if element or parent is interactive
    const isInteractive = target.closest('a, button, .movie-card, .suggestion-chip, .hamburger, .slider-dot, .slider-arrow, .gallery-item');
    
    if (isInteractive) {
      dot.classList.add('hover');
      ring.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    const isInteractive = target.closest('a, button, .movie-card, .suggestion-chip, .hamburger, .slider-dot, .slider-arrow, .gallery-item');
    
    if (isInteractive) {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    }
  });

  // Click pulse animation states
  document.addEventListener('mousedown', () => {
    dot.classList.add('active');
    ring.classList.add('active');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('active');
    ring.classList.remove('active');
  });
}
