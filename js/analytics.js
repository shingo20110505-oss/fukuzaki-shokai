(() => {
  'use strict';

  try {
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;
    if (navigator.webdriver === true || /bot|crawler|spider|slurp|bingpreview|headless/i.test(navigator.userAgent || '')) return;

    const script = document.currentScript;
    const endpoint = script?.src ? new URL('../analytics.php', script.src).pathname : '/analytics.php';
    const startedAt = Date.now();
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
      if (!last || startedAt - last > 30 * 60 * 1000) newSession = 1;
      localStorage.setItem(lastKey, String(startedAt));
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

    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const screenClass = viewportWidth < 768 ? 'small' : viewportWidth < 1200 ? 'medium' : 'large';
    const orientation = viewportWidth >= viewportHeight ? 'landscape' : 'portrait';
    const dpr = Math.min(4, Math.max(1, Math.round((window.devicePixelRatio || 1) * 2) / 2));
    const memory = Number(navigator.deviceMemory || 0);
    const memoryBucket = memory >= 8 ? '8plus' : memory >= 4 ? '4to7' : memory >= 2 ? '2to3' : memory > 0 ? 'under2' : 'unknown';
    const cores = Number(navigator.hardwareConcurrency || 0);
    const cpuBucket = cores >= 8 ? '8plus' : cores >= 4 ? '4to7' : cores >= 2 ? '2to3' : cores > 0 ? '1' : 'unknown';
    const touch = Number(navigator.maxTouchPoints || 0) > 0 ? 'touch' : 'no-touch';
    const language = String(navigator.language || 'unknown').toLowerCase().slice(0, 16);
    let timezone = 'unknown';
    try {
      timezone = String(Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown').slice(0, 64);
    } catch (_) {}

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const network = connection?.saveData
      ? 'save-data'
      : String(connection?.effectiveType || 'unknown').toLowerCase().slice(0, 16);

    let ref = 'direct';
    if (document.referrer) {
      try {
        const u = new URL(document.referrer);
        ref = u.hostname === location.hostname ? 'internal' : u.hostname.toLowerCase();
      } catch (_) {
        ref = 'unknown';
      }
    }

    const params = new URLSearchParams(location.search);
    const utmSource = (params.get('utm_source') || '').slice(0, 80);
    const utmMedium = (params.get('utm_medium') || '').slice(0, 80);
    const utmCampaign = (params.get('utm_campaign') || '').slice(0, 120);

    const base = {
      v: 2,
      path: location.pathname,
      ref,
      device,
      os,
      browser,
      screen: screenClass,
      orientation,
      dpr: String(dpr),
      memory: memoryBucket,
      cpu: cpuBucket,
      touch,
      language,
      timezone,
      network,
      firstEver,
      firstToday,
      newSession,
      utmSource,
      utmMedium,
      utmCampaign
    };

    const send = (event, extra = {}) => {
      try {
        const body = JSON.stringify({ ...base, event, ...extra });
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
      } catch (_) {}
    };

    send('pageview');

    const sendPerformance = () => {
      try {
        const nav = performance.getEntriesByType?.('navigation')?.[0];
        if (!nav) return;
        const bucket = value => {
          const n = Math.max(0, Math.round(Number(value) || 0));
          if (n < 250) return 'lt250';
          if (n < 500) return '250to499';
          if (n < 1000) return '500to999';
          if (n < 2000) return '1000to1999';
          if (n < 4000) return '2000to3999';
          return '4000plus';
        };
        send('performance', {
          ttfb: bucket(nav.responseStart),
          dom: bucket(nav.domContentLoadedEventEnd),
          load: bucket(nav.loadEventEnd || performance.now()),
          navType: String(nav.type || 'unknown').slice(0, 24)
        });
      } catch (_) {}
    };

    if (document.readyState === 'complete') {
      setTimeout(sendPerformance, 0);
    } else {
      window.addEventListener('load', () => setTimeout(sendPerformance, 0), { once: true });
    }

    document.addEventListener('click', event => {
      try {
        const link = event.target?.closest?.('a[href]');
        if (!link) return;
        const href = String(link.getAttribute('href') || '');
        let target = 'internal';
        if (href.startsWith('tel:')) target = 'phone';
        else if (/line\.me/i.test(href)) target = 'line';
        else {
          const url = new URL(link.href, location.href);
          if (url.hostname !== location.hostname) target = 'external';
        }
        if (target !== 'internal') send('click', { target });
      } catch (_) {}
    }, { passive: true, capture: true });

    let maxScroll = 0;
    const updateScroll = () => {
      try {
        const doc = document.documentElement;
        const total = Math.max(1, doc.scrollHeight - window.innerHeight);
        const pct = Math.max(0, Math.min(100, Math.round((window.scrollY / total) * 100)));
        if (pct > maxScroll) maxScroll = pct;
      } catch (_) {}
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    let engagementSent = false;
    const sendEngagement = () => {
      if (engagementSent) return;
      engagementSent = true;
      const seconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
      const timeBucket = seconds < 10 ? 'lt10s'
        : seconds < 30 ? '10to29s'
          : seconds < 60 ? '30to59s'
            : seconds < 180 ? '1to2m'
              : seconds < 600 ? '3to9m'
                : '10mplus';
      const scrollBucket = maxScroll < 25 ? '0to24'
        : maxScroll < 50 ? '25to49'
          : maxScroll < 75 ? '50to74'
            : maxScroll < 95 ? '75to94'
              : '95to100';
      send('engagement', { timeBucket, scrollBucket });
    };

    window.addEventListener('pagehide', sendEngagement, { once: true });
  } catch (_) {
    // This file is deliberately isolated: failures never touch the site UI.
  }
})();
