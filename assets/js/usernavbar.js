/**
 * Navbar Component Logic
 *
 * WHAT THIS JS DOES:
 * 1. Active link highlighting — adds "active" class to current page link
 * 2. Dropdown backdrop — shows dark overlay when user menu opens
 * 3. Click outside to close — clicking backdrop closes the dropdown
 * 4. Scroll lock — prevents page scroll when dropdown is open
 *
 * FIXES APPLIED:
 * - Auto-initializes on DOM ready (no manual call needed)
 * - Removed manual toggler code (Bootstrap 5 handles collapse natively)
 * - Active-link matching now works with both absolute and relative hrefs
 */

function initNavbar(container) {
  if (!container) container = document;

  /* 1. Active link highlighting */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  container.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage || href === window.location.pathname) {
      link.classList.add('active');
    }
  });

  /* 2. User Dropdown Backdrop Logic */
  const userDropdown = container.querySelector('.nb-user-dropdown');
  const backdrop = document.getElementById('nbPageBackdrop');

  if (userDropdown && backdrop) {
    // When dropdown OPENS → show dark backdrop
    userDropdown.addEventListener('show.bs.dropdown', () => {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // When dropdown CLOSES → hide backdrop
    userDropdown.addEventListener('hide.bs.dropdown', () => {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Click on backdrop → close dropdown
    backdrop.addEventListener('click', () => {
      const dropdownToggle = userDropdown.querySelector('[data-bs-toggle="dropdown"]');
      if (dropdownToggle) {
        bootstrap.Dropdown.getInstance(dropdownToggle)?.hide();
      }
    });
  }

  console.log('✅ Navbar initialized');
}

/* Auto-run when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initNavbar(document));
} else {
  initNavbar(document);
}