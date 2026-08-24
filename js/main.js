(() => {
  'use strict';
  // LINE official-green + supplied icon release: 2026-08-24
  // line-icons8-brand-v1
  // Deployment verification marker: LINEで相談

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const floatingCall = document.querySelector('.floating-call');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const lineUrl = 'https://line.me/R/ti/p/@761qehyo';
  const lineIconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAAAsTAAALEwEAmpwYAAATvklEQVR4nO2deXCV1fnHH60CajeoVmuhKm5dBKetXX7FLjpUrIJrndqqDAXFKiKt7dRWq2NLa+nAaEHt1I601e6tFgsVSqHFvO8N2YGQkISEsGUhCWQhNwtZz2+eF7UEcnOXnPM+7/ue72fm6x96vcn9nvPNvfcsz0MEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEwK6VRyaBo5tJBceo5c2kAuVZJL9eTQYXJJQRGS441p/RtjvIEcepZceoCy6DO0iU6Rno4gFTbRmd6gubSOXIqLTyooKIqTQ2vJpQWUR++RnqbgeBy6llx6lRzqDcBkgYIsh3rIpVWURTOkp63dKDqJsuhWcqlIfFJA4ZRDBeTSzd5cAj7i0uXkUrb4BICiE+QYXSE9raPPJhpHDj1NLvWJDzoUNfWRQ8toLY2VnubRxKFLyKGtARhoKNraQpvpIunpHi2y6EZyqD0AgwvZsiXl0EzpaR8NXJqNj8yQgPrJoXukp3+4cenb5NBgAAYTslGON/e+KR2DcOLQXQgvJC7Hm4NzpeMQLmJ0g/cRRnrwIMj11EdZdL10LMIBrwDirDIUNDnUTjG6VDoewYb34HgZX3qwIMgdVsXeWQSQgKOHNKQHCYJUQjm0VDomweR1moLtIigE6vOO8oJj4MPkDm0OwOBAkEoqx/snLkC8xdFbRfIDA0FuiuKdEvAGR691yQ8KBLkpqwjvwv+7jC89GBCk0laMrpGOjzxcSUN6ICDIzUAOvUJWw/WJjpY4kR8MCHLTFM9dq2tsHS1AJz8QEORmKIfuI2tx6V/iAwBB7qi0hqyEa/Xikj4UdjnU7tUgtw4uui5tPgS5WvRpsg6HHgyA8RCkNGgBWcfRdifSxkOQ0qAVZB0ubQyA8ZHVGZvPUONzxqsJORPU2ze/Xfz3ibQcWk/W4dJOceNDpJPdk9X7896vphVPU3dU3KEe3fuo+tWBX6l/t/5blXeVq+ruatXS16Li/XGViI7+Du8xu7t3q4quCrWhdYN6oeEF9YO9P1B37bxLXVl8pZqYP9H7WdKvN1RyqJysw6UD4sYHWOfmnatm7Zilntj3hFrTvEY19zUrv+Cgxw7H1PK65Wr2ztnqI0UfUSe5J4l7Elg5VEvWge6BJwT2nqp71KpDq1RDb4MKGk29TWp182r1japvqEn5k8T9CtxWknU4NCBuvLD4ne3hPQ9773aDalCFCf7Izu/Q00umq1Nip9ge4AGyDmnThXRBwQXqR/t/pGqO1KioUN9Tr5bULFEXF14s7i9JyTqkDfdRY2Jj1G3lt3nfZfsH+1WUKYwXqvlV871VcGnfCQE2iLThPujM3DPVkzVPqoO9B5Vt8Gr30tql6uzcs8XHgRBgA0Q8uLx63NbXpmznyMAR9fyB570tMOlxIQRYI9KGG9BZuWd5wT3cf1g6N4GjZ7DHCzLvM0uPEyHAGpA2XKN4FXZR9SLV3t8unZPA0zXQ5f2RG5c9TnzcCAEeBdKGa9Lntn9OlXSWSOcidOzq3qW+VPol8fEjBDhDpA0fpc7JO0e91PhS6PZvgwavzJ+Xf574eBICnCbSho9CN5Xd5K2yAj3wmsFXK74qPq6EAKeBtOEZaGz2WO/0Ed51zcCfaEK7f2wd0oanqfMLzle57bnSczzy8M2qqVumio83IcBJkDY8Dd1afitWmH1eqebrjdLjTgjwCEgbnqIerH5QDagB6TltHfw1hbebpMefEOAESBueRHz/lScQkGVlw8pw3HayDmnDk1w++EPTH6TnLniDVw+9qk7LPk18XhACfAwBDu+6lnXScxYcx6a2TcEOsXVIGz6MuBbUnw/+WXqughEOfQT247R1SBs+jH5e93PpOQqS8Pum3wez6J51SBt+nBbvXyw9N0GKPFv/rPh8IQQ4AKa/IS4mB8LFQ7sfEp83CHAANGXLFO/gAAgXfYN9Xo1s6fmDAAuKOxbw0T0QTvYf2e9VP5GeRwiwkHhBBISb11peC0bReesQNvzeqnul5x6I0vdh6xA0+wP5H8DlhAjRNdDl1dtGgP1E0Ox/NP9Des4Bzbxy6BUE2FeEjOaGYSCazCidgQD7hoDJb4u9TZV2lkrPM2CIqu4qr2oKAuwHAiZzyw8QbR6SWtCyDp8NPjV2qtfYGkSbht4GmVtL1uGzwXMr50rPLeATC6sXIsDG8dng4o5i6XkFfCwaf7LfN5asw+fuCcAuri29FgE2SgSOTHKxOy41+9eDf/VWQHUXdSuIF6i/HPyLquiqSPr43sFetaF1g1cKaO+RvVrOGb988GXlHHa8xmQjwf89djimXmh4wWtglo7YOxPNzlcdWoUAG8UnY0/PPl3F++PaJwj3/L2y+Mq3fg6fx+UVUB1wW9LpJdOHPDcf/UxUHbOyq1JdVHDRW4/nqhVLapZk/PP5/+VFvzefj+s0J1oArO6uHnUdZ/5ZP6v5mdLd1vTdOe9GgI3hk7FfKf+KMkGiViA6iuHx/eThnvuXB3457Dv1x7Z+bNjHZ1Ie6D+t/xn2ckCiryHH/hEbjfhnbmzdqHQyt3IuAmwMn4z9Y9MflW76B/sTtgDhIvCjJdEVuWtKrhn2HXCk65I7u3am9bMf2PVAwudr6m0a8tjG3katY3X/rvuV7mqWhAAbwgdTeSWSP+rqhp8z0c/85LZPjuq5uwe6Ez73h4o+dMLjc9pzRvSAfx/+fpwqN5fdnPC5tsS3DHlsUbxI63jdXXW30km8P+7fySzr8MHUK7ZeoUwQpgCzvrP7O6EIMC886eaq7VchwEbwqS2KCcIWYP5+ubZlbWADzL+fqbF6ZO8jCLARfDD1T01/MjIpwhZg1ntz36vqe+p9C/BlRZd5q9nJtKJuhSqMFypTrG5ejQAbwQdTTdW7CmOAWZ/f/nlvAc6PAOtYzNPBviP7EGAjGDaU9xbTWbyxIcCsH+//sVUBHlSD3mo8Aqwbw4ZeUniJsUkR5gDzIQ8+NWVLgJlE++QI8GgwbOjVJVcrU4Q5wKyJ+RPVob5D1gR41o5ZCLB2DBt6R8UdxiZE2APMmrljpvfx0oYAz6+ajwBrx7ChprYlohJgFvcYMhXgT237lHdRIZm442BdT50yySN+bCVZh2FDv7vnu8r2APOFiEn5kxL+93HZ49S2jm3i+8Dck3lZ7TJlisX7FyPA2jFs6OP7Hle2B5gvcvB1QC7ml+gxHyz84JDbWlInsfgwx3/b/qtMsKx2GQKsHcOGPrb3MWWKMAWY+eG+H47o1ZzKOYE4Srlg1wJlgqW1SxFg7Rg2dFH1ImWKsAWYD298YfsXRvTrd42/Ew/wvMp5ygSP73scAdaOYUO/Xvl1ZYqwBZip7akdsZPfOza/wysMIBlgrgBigm/t/hYCrB3DhprcxghjgJl/Nv9zxE5+fODhutLrRAJ83677lCnuSVAgAQEeDYYN/WLJF41NiLAGOJV3o5GqOaYT4EsLL1UP73k4qbiUDr8Gk3y5/MsIsHYMG8qrq6YIc4D5fDjv0WbiaVgPcly+5XIEWDuGDeUzv1zYzARhDvCbdZPfufmdVgR4UA16hQ0RYN2YNtQltb1ju5FJEfYAM1yu1oYA78N1QkP4YKrtF/qTVeTklfqoB3h963oE2Ag+mPro3keNTIqoBLijv8NbK4hygB/b+xgCbAQfTJ1WPM33AHOB9VQO8XOpl+E6EvgZYIbPQvOZaN0BTvUyw7qWdSeUq9XJtOJpCLARfDCVF7Ja+1p9DXA64jPK39/zfdEAM8/VP6c9wOmI/4BwbSzdxPvjQzpMIMA68cNUQ6d7dAV4uG4OEgFmRjqBZTrALD5gktWWpXTyWstr/oQXATYnPoUT9ADfVHaTeID5k8r5BeeLBZjFXSF0MqdyDgJsDJ+MfV/e+1TfYJ/WicHd+HRW/J9ROmPIvmWiPdrh+hPxnq6uQHCtLP7akej59nTvOaGDYVCbsHf0d/hTzA4BNi/ukaMbDp2u3++p2qeGPDev4A73uCdrnjzh9+DAH9uZ8Fjx2ed04aqVwz3Xh4s+PGwJHv73unzgRS1dvNj4on/hRYDN6vod1yvdcFOxyQWTtfxux39C4JtDx2/v8NnuRH16+WP0WblnDXn8wuqFGb0ubmF65847hzzXhJwJKj+eP+zjuYfx2blnB+4q4dUlVyPARvHRXF7t5RM5JlY5+R4t11xK5eD+seJL9ryFMty7GtM10OV1VuR3RH4nTfS4N+GtGG6w/dOan6rsw9mjfm3cLPyJfU94LU2b+5qTrgmsbFipvrfne2n78JP9P9G+eLWtY9uIt64QYB34aa7hCh0gWNxWfpu/4UWAzYu7tbf0tUjPLWCYss6yEa9EIsC68Ntgg0crQXD4WsXX/A8vAuyPeFuhobdBeo4BQxTGC0eswIkA60TCZJe8ihQgegyogYwLFSDAmSBkNB/AKO0slZ5vQDO/qP+FXHgRYH/Ff6mT9ckF4aGxt1GNzxmPAPuKpNkuGW3lAfzlxrIbZcOLAPuv07JP8+ogg3DzTP0z8uFFgGXE1TNMFb4D5inuKE65GAECrBtpww238wBm6Rzo9K5XSs8fBDgA4hVMEB74XPjtFbeLzxsEOCDisiuvt70uPS9BivAlCOk5QwhwAEw/Rtz4q6SzRHpugiT8puE34nOFEODgBZh1Tt45WJkOMJvaNqkxsTHi84QQ4GAGmDUxf6La3b1beq6C4+AuG+KHNVwE+H9IGz6CLiy40EgBAJAZVd1VWqp+EAKsEWnDk+jcvHNPqMII/Keup05dUHCB+HwgBPg4pA1PQWdsPkOtaV4jPYet5UDPAa1F8wgB1oi04SmK75din9h/uGRtomqbgZR1SBueQYF4LjQHzMP1p0PxsdlFgEMlLvXK52+BOXZ07lCT8ieJjzUhwEmQNjxD8eH55XXLped5JMltz/UO1EiPMSHAKSBt+Ch1Xel12C/WCLdb5Sue0uNKCHCKSBuuQTzhuPg5riSOjucPPD9iT6ZQyDqkDdco3urgY34gPbis0aLqReLjRwhwBkgbbkDTS6arvPY86VyEAu4eeMOOG8THjBDgDJE23HCQuUYxSHw0csqWKeLjRAjwKJA23LC4uRYXW9vYujFpYzKb4JNt3OZGenwIAR4l0ob7qIsLL1ZLapYk7fIXZfiPGHsg0rfIRYD1I2240Nnqu6vu9lp3Ht8TOMpwUznedpP2nxBgjUgbLixumj1752zvI2Wixt1RgHv18vVMab8JAdaMtOEBCzP3tOUax1zWJyrfmbn5+enZp4v7SwiwAaQND7D4OOEtZbeop+ue9hbBwtZRkUu+8uUPaR/JT1mHtOEhDPVV269SC3YtUCsbVqrq7moV1I/MgarX7Pok65A2PAL66NaPeneVewd7pXPrfeznSx6B6ZTg+izrkDY8Qpq6Zaoq6ywTC29Tb5OauWOmuA8kKeuQNjxi4gvwEpcq+Ds61w+Tfv0kLeuQNjyC8rO7BG99cYeEyB7McNOUdUgbHkGtqFvhS3i5Wid/bJd+vRQkWYe04RHU4v2LjQaXF8v4/jP3kpJ+rYGTdUgbHkE9VfuUsfDyAZOPb/24+GsMrKxD2vAI6sXGF7UHl89s8yWEsdljxV9foGUd0oZHULqL0Jd2lqpPbP2E+OsKhaxD2vAIqqKrQktwuwe6ve+6eNel1GUd0oZHTBw2HVcUs9qyvPrX0q8ndLIOacMjJt7WGe2d3flV871KItKvJZSyDocGxE2PkG6vuD3jM8y/bfxteAuquwEQz2XrcCkubrzle8BF8SL12eLPiv/uoZdD7WQdLh0QNz5C+tvBv6UcXL5fPK9yHo5BuprkUC1Zh0s7xY2PkPjdNJWTVHzl71057xL/fSMlh8rJOlzaIG68JVtIHFwuAhC6lp3h0b/IOhx6NgDGR0YvNb50QnD5euGvG36tJhdMFv/9Iq7lZB0OLQyA8ZEqjMfVOfh+LoeZK15GsoB6EOXQ/WQdWfQZceMhyNWiT5N1bKJTvOV3efMhSGUsnsM8l63EpXXiAwBB7ijk0GqyFpcWiA8ABLmj0r1kLZtpArl0JACDAEEqbTnUQ3n0HrIal1aJDwQEuRnpZen4yJNFMwIwEBCkMtB06fgEA4fyAzAYEKTSUJ50bIKDS7cEYEAgSKWhWdKxCQ6KTiKXXg/AoECQSiqHHG/OgmPIpsvIoV7xwYEgd0T1kUNTpeMSTBxaFoABgiA1gpZIxyS4rKWx5FJRAAYJgtQJcqiASmmMdEyCTYwuJJfaxAcLgtwhaiWXJkvHIxw4NNP7riE/aBCkvLUZh66VjkW4cOhOcmhQfPAgu+XQIGXRHOk4hBOXvokQQ2JyaJAcelA6BuHGobuwvQQJqI9cmic9/aNBFl2PhS3IR7XiO69usuk8cignAIMLRVuF3k4IMLRP7NBSfKSGtMvx5tQS7PP6QYwuRV1piPQpyzvKC3yED5PH6AZcRYQoc+V6t4pwMUGYGF1DDv3dK3EiPymgYOsIOfQKLuMHtcaWQ/eRS2tQshaiN+XQYW9OcAE6l8ZLT1OQClyrN0b/51W+dOgZcmg9OVThdZLDllQU1eaN7dExXk8urfA6JnDRdWvrNgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIACz/8Dc8sX9Jwno6IAAAAASUVORK5CYII=';
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
        .floating-line{position:fixed;z-index:950;left:calc(50% + 6px);right:14px;bottom:calc(9px + env(safe-area-inset-bottom));min-height:54px;display:flex;align-items:center;justify-content:center;padding:12px 10px;border:1px solid #06C755;border-radius:12px;background:#06C755;color:#072d1b;box-shadow:0 10px 24px rgba(6,199,85,.18);opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity .25s var(--ease),visibility .25s var(--ease),transform .25s var(--ease),box-shadow .2s ease}
        .floating-line.is-active{opacity:1;visibility:visible;transform:none}
        .floating-line:active{box-shadow:0 6px 16px rgba(6,199,85,.14)}
        .floating-line .line-brand-icon{width:24px;height:24px;display:block;flex:0 0 auto;border-radius:6px;margin-right:7px}
        .floating-line span{font-size:15px;font-weight:850;white-space:nowrap;color:#072d1b}
      }
    `;
    document.head.appendChild(quickActionStyle);

    floatingLine = document.createElement('a');
    floatingLine.className = 'floating-line';
    floatingLine.href = lineUrl;
    floatingLine.target = '_blank';
    floatingLine.rel = 'noopener';
    floatingLine.setAttribute('aria-label', 'フクザキ商会のLINE公式アカウントで写真相談する');
    floatingLine.innerHTML = `<img class="line-brand-icon" src="${lineIconSrc}" alt="" aria-hidden="true"><span>LINEで写真相談</span>`;
    floatingCall.insertAdjacentElement('afterend', floatingLine);
  }

  if (body.classList.contains('home')) {
    if (!document.querySelector('[data-line-equal-priority-style]')) {
      const lineStyle = document.createElement('style');
      lineStyle.setAttribute('data-line-equal-priority-style', '');
      lineStyle.textContent = `
        .home .header-actions{gap:9px}
        .home .header-line-button{background:#06C755!important;color:#072d1b!important;border:1px solid #06C755!important;box-shadow:0 7px 18px rgba(6,199,85,.16)!important}
        .home .header-line-button .line-brand-icon{width:20px;height:20px;display:block;flex:0 0 auto;border-radius:5px}
        .home .header-line-button:hover{background:#06C755!important;color:#072d1b!important;box-shadow:0 9px 22px rgba(6,199,85,.22)!important}
        .home .hero-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}
        .home .hero-phone-block{width:100%}
        .home .hero-line-cta{background:#06C755!important;border:1px solid #06C755!important;color:#072d1b!important;box-shadow:0 10px 24px rgba(6,199,85,.16)!important}
        .home .hero-line-cta:hover{background:#06C755!important;box-shadow:0 13px 28px rgba(6,199,85,.22)!important}
        .home .hero-line-cta .hero-phone-cta__icon{background:transparent!important;color:#057a36!important;overflow:hidden}
        .home .hero-line-cta .hero-phone-cta__icon .line-brand-icon{width:100%;height:100%;display:block;object-fit:cover}
        .home .hero-line-cta .hero-phone-cta__content small{color:#0a3b23!important;opacity:1!important;font-weight:850!important}
        .home .hero-line-cta .hero-phone-cta__content strong{color:#061f14!important;text-shadow:none!important}
        .home .hero-line-cta .hero-phone-cta__arrow{color:#072d1b!important}
        .home .hero-line-note{color:#355e4c!important;font-weight:700!important;opacity:1!important}
        .home .mobile-menu .mobile-line-call{margin-top:12px;background:#06C755!important;color:#072d1b!important;border:1px solid #06C755!important;box-shadow:0 9px 22px rgba(6,199,85,.16)!important}
        .home .mobile-menu .mobile-line-call .line-brand-icon{width:32px;height:32px;display:block;margin:0 auto 7px;border-radius:8px}
        .home .mobile-menu .mobile-line-call small,.home .mobile-menu .mobile-line-call strong,.home .mobile-menu .mobile-line-call span{color:#072d1b!important;opacity:1!important}
        .home .contact-band-actions.contact-band-actions--three{grid-template-columns:repeat(3,1fr);max-width:1120px}
        .home .contact-line-display{background:#06C755!important;border:1px solid #06C755!important;color:#072d1b!important;box-shadow:0 9px 24px rgba(6,199,85,.16)!important}
        .home .contact-line-display .line-brand-icon{width:34px;height:34px;display:block;margin:0 auto 8px;border-radius:9px}
        .home .contact-line-display small{color:#0a3b23!important;opacity:1!important;font-weight:850!important}
        .home .contact-line-display strong{font-size:clamp(22px,2.5vw,34px);color:#061f14!important;text-shadow:none!important}
        .home .contact-line-display span{display:block;margin-top:5px;font-size:12px;font-weight:800;color:#0a3b23!important;opacity:1!important}
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
      headerLineButton.innerHTML = `<img class="line-brand-icon" src="${lineIconSrc}" alt="" aria-hidden="true">LINE相談`;
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
      mobileLineCall.innerHTML = `<img class="line-brand-icon" src="${lineIconSrc}" alt="" aria-hidden="true"><small>写真を見せながら相談できます</small><strong>LINEで写真相談</strong><span>機種名・症状・地域・写真を送信</span>`;
      mobileCall.insertAdjacentElement('afterend', mobileLineCall);
    }

    const heroActions = document.querySelector('.hero-actions');
    const currentHeroLine = heroActions?.querySelector(`a[href="${lineUrl}"]`);
    if (heroActions && currentHeroLine && !heroActions.querySelector('.hero-line-cta')) {
      const lineBlock = document.createElement('div');
      lineBlock.className = 'hero-phone-block';
      lineBlock.innerHTML = `
        <a class="hero-phone-cta hero-line-cta" href="${lineUrl}" target="_blank" rel="noopener" aria-label="LINEで写真を送って相談する">
          <span class="hero-phone-cta__icon" aria-hidden="true"><img class="line-brand-icon" src="${lineIconSrc}" alt=""></span>
          <span class="hero-phone-cta__content"><small>LINE公式アカウント</small><strong>LINEで写真相談</strong></span>
          <span class="hero-phone-cta__arrow" aria-hidden="true">→</span>
        </a>
        <span class="hero-phone-hours hero-line-note">機種名・症状・地域・写真を送る</span>
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
      contactLine.innerHTML = `<img class="line-brand-icon" src="${lineIconSrc}" alt="" aria-hidden="true"><small>LINE公式アカウント</small><strong>LINEで写真相談</strong><span>機種名・症状・地域・写真を送る</span>`;
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