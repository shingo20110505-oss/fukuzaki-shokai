(() => {
  'use strict';
  // LINE equal-priority consultation release: 2026-08-24

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const floatingCall = document.querySelector('.floating-call');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const lineUrl = 'https://line.me/R/ti/p/@761qehyo';
  let lockedScrollY = 0;

  let floatingLine = document.querySelector('.floating-line');
  if (!floatingLine && floatingCall) {
    const quickActionStyle = document.createElement('style');
    quickActionStyle.setAttribute('data-line-quick-action-style', '');
    quickActionStyle.textContent = `
      .floating-line{display:none}
      @media(max-width:760px){
        .floating-call{left:14px!important;right:calc(50% + 6px)!important;padding:12px 10px!important}
        .floating-call strong{display:none!important}
        .floating-call span{font-size:15px!important;white-space:nowrap}
        .floating-line{position:fixed;z-index:950;left:calc(50% + 6px);right:14px;bottom:calc(9px + env(safe-area-inset-bottom));min-height:54px;display:flex;align-items:center;justify-content:center;padding:12px 10px;border-radius:12px;background:#06c755;color:#fff;box-shadow:0 14px 34px rgba(13,41,64,.25);opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity .25s var(--ease),visibility .25s var(--ease),transform .25s var(--ease)}
        .floating-line.is-active{opacity:1;visibility:visible;transform:none}
        .floating-line span{font-size:15px;font-weight:800;white-space:nowrap}
      }
    `;
    document.head.appendChild(quickActionStyle);

    floatingLine = document.createElement('a');
    floatingLine.className = 'floating-line';
    floatingLine.href = lineUrl;
    floatingLine.target = '_blank';
    floatingLine.rel = 'noopener';
    floatingLine.setAttribute('aria-label', 'フクザキ商会のLINE公式アカウントで写真相談する');
    floatingLine.innerHTML = '<span>LINEで写真相談</span>';
    floatingCall.insertAdjacentElement('afterend', floatingLine);
  }

  if (body.classList.contains('home')) {
    if (!document.querySelector('[data-line-equal-priority-style]')) {
      const lineStyle = document.createElement('style');
      lineStyle.setAttribute('data-line-equal-priority-style', '');
      lineStyle.textContent = `
        .home .header-actions{gap:9px}
        .home .header-line-button{background:#06c755;box-shadow:0 8px 22px rgba(6,199,85,.22)}
        .home .header-line-button:hover{background:#05ad49;box-shadow:0 11px 26px rgba(6,199,85,.28)}
        .home .hero-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}
        .home .hero-phone-block{width:100%}
        .home .hero-line-cta{background:#06c755;border-color:rgba(0,120,47,.18);box-shadow:0 12px 30px rgba(6,199,85,.20)}
        .home .hero-line-cta:hover{background:#05ad49;box-shadow:0 16px 34px rgba(6,199,85,.28)}
        .home .hero-line-note{color:#497363}
        .home .mobile-menu .mobile-line-call{margin-top:12px;background:#06c755;box-shadow:0 12px 28px rgba(6,199,85,.20)}
        .home .contact-band-actions.contact-band-actions--three{grid-template-columns:repeat(3,1fr);max-width:1120px}
        .home .contact-line-display{background:rgba(6,199,85,.10)}
        .home .contact-line-display small{color:#7ce5a3}
        .home .contact-line-display strong{font-size:clamp(22px,2.5vw,34px)}
        .home .contact-line-display span{display:block;margin-top:5px;font-size:12px;font-weight:800;color:rgba(255,255,255,.72)}
        @media(max-width:1180px){.home .header-line-button{display:none}}
        @media(max-width:760px){
          .home .header-call-button,.home .header-line-button{display:none!important}
          .home .hero-actions{grid-template-columns:1fr}
          .home .hero-phone-block{width:100%}
          .home .contact-band-actions.contact-band-actions--three{grid-template-columns:1fr}
        }
      `;
      document.head.appendChild(lineStyle);
    }

    const headerCallButton = document.querySelector('.header-call-button');
    if (headerCallButton && !document.querySelector('.header-line-button')) {
      const headerLineButton = document.createElement('a');
      headerLineButton.className = 'header-call-button header-line-button';
      headerLineButton.href = lineUrl;
      headerLineButton.target = '_blank';
      headerLineButton.rel = 'noopener';
      headerLineButton.setAttribute('aria-label', 'フクザキ商会のLINE公式アカウントで相談する');
      headerLineButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16v12H9l-5 4v-4H4z"/></svg>LINE相談';
      headerCallButton.insertAdjacentElement('afterend', headerLineButton);
    }

    const mobileCall = mobileMenu?.querySelector('.mobile-call');
    if (mobileCall && !mobileMenu.querySelector('.mobile-line-call')) {
      const mobileLineCall = document.createElement('a');
      mobileLineCall.className = 'mobile-call mobile-line-call';
      mobileLineCall.href = lineUrl;
      mobileLineCall.target = '_blank';
      mobileLineCall.rel = 'noopener';
      mobileLineCall.setAttribute('aria-label', 'LINEで写真を送って相談する');
      mobileLineCall.innerHTML = '<small>写真を見せながら相談できます</small><strong>LINEで写真相談</strong><span>機種名・症状・地域・写真を送信</span>';
      mobileCall.insertAdjacentElement('afterend', mobileLineCall);
    }

    const heroActions = document.querySelector('.hero-actions');
    const currentHeroLine = heroActions?.querySelector(`a[href="${lineUrl}"]`);
    if (heroActions && currentHeroLine && !heroActions.querySelector('.hero-line-cta')) {
      const lineBlock = document.createElement('div');
      lineBlock.className = 'hero-phone-block';
      lineBlock.innerHTML = `
        <a class="hero-phone-cta hero-line-cta" href="${lineUrl}" target="_blank" rel="noopener" aria-label="LINEで写真を送って相談する">
          <span class="hero-phone-cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v12H9l-5 4v-4H4z"/></svg></span>
          <span class="hero-phone-cta__content"><small>LINEで写真相談</small><strong>写真で相談する</strong></span>
          <span class="hero-phone-cta__arrow" aria-hidden="true">→</span>
        </a>
        <span class="hero-phone-hours hero-line-note">機種名・症状・地域・写真を送信</span>
      `;
      currentHeroLine.replaceWith(lineBlock);
    }

    const contactActions = document.querySelector('.contact-band-actions');
    if (contactActions && !contactActions.querySelector('.contact-line-display')) {
      contactActions.classList.add('contact-band-actions--three');
      const contactLine = document.createElement('a');
      contactLine.className = 'phone-display contact-line-display';
      contactLine.href = lineUrl;
      contactLine.target = '_blank';
      contactLine.rel = 'noopener';
      contactLine.setAttribute('aria-label', 'LINE公式アカウントで写真相談する');
      contactLine.innerHTML = '<small>LINE公式アカウント</small><strong>LINEで写真相談</strong><span>機種名・症状・地域・写真を送る</span>';
      contactActions.appendChild(contactLine);
    }
  }

  const setLoaded = () => root.classList.add('is-loaded');
  window.addEventListener('load', () => window.setTimeout(setLoaded, 420), { once: true });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) setLoaded();
  });
  window.setTimeout(setLoaded, 1600);

  const updateHeader = () => {
    const showQuickActions = window.scrollY > 520;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    floatingCall?.classList.toggle('is-active', showQuickActions);
    floatingLine?.classList.toggle('is-active', showQuickActions);
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
