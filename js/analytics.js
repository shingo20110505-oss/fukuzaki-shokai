(() => {
  'use strict';
  try {
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;
    if (navigator.webdriver === true || /bot|crawler|spider|slurp|bingpreview/i.test(navigator.userAgent || '')) return;

    const script = document.currentScript;
    const endpoint = script?.src ? new URL('../analytics.php', script.src).pathname : '/analytics.php';
    const now = Date.now();
    const localDay = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });

    let firstEver = 0;
    let firstToday = 0;
    let newSession = 0;

    try {
      const everKey = 'fz_seen_v1';
      const dayKey = 'fz_day_v1';
      const lastKey = 'fz_last_v1';
      if (localStorage.getItem(everKey) !== '1') {
        firstEver = 1;
        localStorage.setItem(everKey, '1');
      }
      if (localStorage.getItem(dayKey) !== localDay) {
        firstToday = 1;
        localStorage.setItem(dayKey, localDay);
      }
      const last = Number(localStorage.getItem(lastKey) || '0');
      if (!last || now - last > 30 * 60 * 1000) newSession = 1;
      localStorage.setItem(lastKey, String(now));
    } catch (_) {
      newSession = 1;
    }

    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const device = /ipad|tablet|kindle|silk/i.test(ua)
      ? 'tablet'
      : /iphone|ipod|android.*mobile|mobile/i.test(ua)
        ? 'mobile'
        : 'desktop';

    let os = 'other';
    if (/iphone|ipad|ipod/i.test(ua)) os = 'ios';
    else if (/android/i.test(ua)) os = 'android';
    else if (/windows/i.test(ua) || /win/i.test(platform)) os = 'windows';
    else if (/macintosh|mac os x/i.test(ua) || /mac/i.test(platform)) os = 'macos';
    else if (/linux|x11/i.test(ua)) os = 'linux';

    let browser = 'other';
    if (/edg\//i.test(ua)) browser = 'edge';
    else if (/firefox\//i.test(ua)) browser = 'firefox';
    else if (/chrome\//i.test(ua) || /crios\//i.test(ua)) browser = 'chrome';
    else if (/safari\//i.test(ua) && !/chrome|crios|android/i.test(ua)) browser = 'safari';

    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const screen = width < 768 ? 'small' : width < 1200 ? 'medium' : 'large';

    let ref = 'direct';
    if (document.referrer) {
      try {
        const u = new URL(document.referrer);
        ref = u.hostname === location.hostname ? 'internal' : u.hostname.toLowerCase();
      } catch (_) {
        ref = 'unknown';
      }
    }

    const body = JSON.stringify({
      v: 1,
      path: location.pathname,
      ref,
      device,
      os,
      browser,
      screen,
      firstEver,
      firstToday,
      newSession
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        credentials: 'same-origin',
        keepalive: true,
        cache: 'no-store'
      }).catch(() => {});
    }
  } catch (_) {
    // Analytics is isolated and must never affect page rendering or controls.
  }
})();
