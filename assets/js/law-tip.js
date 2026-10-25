/* Rê chuột (hoặc Tab tới) một chip .cite[data-law] để xem nguyên văn điều khoản.
   Nội dung lấy từ window.LAW_TEXT (assets/js/law-text.js, sinh từ legal/*.txt). */
(function () {
  const LAW = window.LAW_TEXT || {};
  let tip, hideTimer;

  const build = () => {
    tip = document.createElement('div');
    tip.className = 'law-tip';
    tip.setAttribute('role', 'tooltip');
    tip.hidden = true;
    tip.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    tip.addEventListener('mouseleave', hideSoon);
    document.body.appendChild(tip);
  };

  const render = (keys) => keys.map((k) => {
    const e = LAW[k];
    if (!e) return '';
    return '<div class="lt-item">' +
      '<div class="lt-ref">' + e.doc + ' · ' + e.ref + '</div>' +
      '<div class="lt-art">' + e.art + '</div>' +
      (e.lead ? '<div class="lt-lead">' + e.lead + '</div>' : '') +
      '<div class="lt-body">' + e.html + '</div></div>';
  }).join('');

  const show = (el) => {
    const keys = (el.dataset.law || '').split(/\s+/).filter(Boolean);
    const body = render(keys);
    if (!body) return;
    clearTimeout(hideTimer);
    const note = document.documentElement.lang === 'en' ? '<div class="lt-note">Original Vietnamese text</div>' : '';
    tip.innerHTML = note + body;
    tip.style.maxHeight = '';
    tip.hidden = false;
    // đặt dưới chip nếu đủ chỗ, không thì đặt phía còn nhiều chỗ hơn và cho cuộn, không bao giờ che chip
    const r = el.getBoundingClientRect(), w = tip.offsetWidth, vw = window.innerWidth, vh = window.innerHeight, gap = 8;
    const below = vh - r.bottom - 2 * gap, above = r.top - 2 * gap;
    const useBelow = tip.offsetHeight <= below || below >= above;
    tip.style.maxHeight = Math.min(tip.offsetHeight, useBelow ? below : above) + 'px';
    const h = tip.offsetHeight;
    const left = Math.min(Math.max(gap, r.left + r.width / 2 - w / 2), vw - w - gap);
    const top = useBelow ? r.bottom + gap : r.top - h - gap;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  };

  function hideSoon() { clearTimeout(hideTimer); hideTimer = setTimeout(() => { tip.hidden = true; }, 180); }

  const init = () => {
    build();
    document.addEventListener('mouseover', (ev) => { const c = ev.target.closest && ev.target.closest('.cite[data-law]'); if (c) show(c); });
    document.addEventListener('mouseout', (ev) => { const c = ev.target.closest && ev.target.closest('.cite[data-law]'); if (c && !c.contains(ev.relatedTarget)) hideSoon(); });
    document.addEventListener('focusin', (ev) => { const c = ev.target.closest && ev.target.closest('.cite[data-law]'); if (c) show(c); });
    document.addEventListener('focusout', (ev) => { if (ev.target.closest && ev.target.closest('.cite[data-law]')) hideSoon(); });
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') tip.hidden = true; });
    const hideNow = () => { clearTimeout(hideTimer); tip.hidden = true; };
    window.addEventListener('hashchange', hideNow);
    document.addEventListener('slide:enter', hideNow);
    document.addEventListener('lang:change', hideNow);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
