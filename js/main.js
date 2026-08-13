(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const floatingCall = document.querySelector('.floating-call');
  const menuLabel = menuButton?.querySelector('.sr-only');
  let lockedScrollY = 0;

  const setLoaded = () => root.classList.add('is-loaded');
  window.addEventListener('load', () => window.setTimeout(setLoaded, 420), { once: true });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) setLoaded();
  });
  window.setTimeout(setLoaded, 1600);

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    floatingCall?.classList.toggle('is-active', window.scrollY > 520);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const lockPage = () => {
    lockedScrollY = window.scrollY;
    body.classList.add('menu-open');
    body.style.position = 'fixed';
    body.style.top = `-${lockedScrollY}px`;
    body.style.right = '0';
    body.style.left = '0';
    body.style.width = '100%';
  };

  const unlockPage = () => {
    body.classList.remove('menu-open');
    body.style.position = '';
    body.style.top = '';
    body.style.right = '';
    body.style.left = '';
    body.style.width = '';
    window.scrollTo(0, lockedScrollY);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !mobileMenu) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (wasOpen) unlockPage();
    if (menuLabel) menuLabel.textContent = 'メニューを開く';
    if (restoreFocus) menuButton.focus({ preventScroll: true });
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'true');
    mobileMenu.hidden = false;
    mobileMenu.setAttribute('aria-hidden', 'false');
    lockPage();
    if (menuLabel) menuLabel.textContent = 'メニューを閉じる';
  };

  if (mobileMenu) {
    mobileMenu.hidden = true;
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) closeMenu();
  });

  window.addEventListener('pageshow', () => closeMenu());

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
