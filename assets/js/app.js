/* =========================================================
   taphoammo.net case — deck content scripts
   Team names, demo results, title art, timelines, live demo.
   ========================================================= */

/* ================== EDIT HERE ================== */
// Team members, in presenting order (Người 1 … Người 5 in the outline).
window.TEAM = ['Người 1', 'Người 2', 'Người 3', 'Người 4', 'Người 5'];

// Figures from the notebook. Fill OFFICIAL with the Step 6B result
// once a member who never saw the code has written ~40 test listings.
window.RESULTS = {
  official: null, // e.g. { detect: 87.5, falseAlarm: 5.0, n: 40 }
  step6: [
    { vi: 'Chỉ luật', en: 'Rules only', detect: 100.0, falseAlarm: 0.0, disguised: 100.0 },
    { vi: 'Chỉ học máy', en: 'ML only', detect: 77.3, falseAlarm: 9.9, disguised: 68.2 },
    { vi: 'Kết hợp 2 lớp', en: 'Both layers', detect: 100.0, falseAlarm: 0.0, disguised: 100.0, best: true }
  ],
  rulesNoNormalize: 90.9,
  scanSeconds: 15,
  manualHours: 383
};
/* =============================================== */

(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (vi, en) => `<span class="en">${en}</span><span class="vi">${vi}</span>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (v) => v.toFixed(1).replace('.', ',');

  /* ---------- team chips ---------- */
  const AV = ['--c1', '--c2', '--c3', '--c4', '--c5'];
  const initials = (n) => n.trim().split(/\s+/).slice(-2).map((w) => w[0]).join('').toUpperCase();
  $$('.team[data-team]').forEach((box) => {
    box.innerHTML = window.TEAM.map((n, i) =>
      `<div class="member"><span class="av" style="background:var(${AV[i % AV.length]})">${esc(initials(n))}</span><div><b>${esc(n)}</b></div></div>`).join('');
  });

  /* ---------- presenter chips on chapter dividers ---------- */
  $$('[data-who-chip]').forEach((el) => {
    const names = el.dataset.whoChip.split(',').map((n) => window.TEAM[+n - 1]).filter(Boolean).join(' · ');
    el.innerHTML = `${t('Trình bày', 'Presenting')}: ${esc(names)}`;
  });

  /* ---------- quiz summary table (filled once quiz.js has run) ---------- */
  document.addEventListener('deck:ready', () => {
    const body = $('#quiz-answers');
    if (!body || !window.Quiz) return;
    const L = (o) => (typeof o === 'string' ? o : t(o.vi, o.en));
    body.innerHTML = window.Quiz.data.map((q, i) =>
      `<tr style="--i:${i}"><td class="mono">${i + 1}</td><td>${L(q.title)}</td><td class="good-t">${'ABCD'[q.ans]}. ${L(q.opts[q.ans])}</td></tr>`).join('');
  });

  /* ---------- title art: a wall of listings, some flagged, being scanned ---------- */
  const art = $('#title-art');
  if (art) {
    const flagged = new Set([2, 7, 9, 14, 19, 22, 27]);
    let cells = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 4; c++) {
        const i = r * 4 + c;
        const x = 30 + c * 140, y = 20 + r * 80;
        const f = flagged.has(i);
        cells += `<rect class="lst${f ? ' flag' : ''}" x="${x}" y="${y}" width="124" height="64" rx="10"/>` +
          `<rect class="${f ? 'flag-ln' : 'ln1'}" x="${x + 12}" y="${y + 16}" width="${f ? 80 : 64 + ((i * 7) % 30)}" height="7" rx="3.5"/>` +
          `<rect class="ln1" x="${x + 12}" y="${y + 32}" width="${40 + ((i * 13) % 50)}" height="6" rx="3" opacity=".6"/>` +
          `<rect class="ln1" x="${x + 12}" y="${y + 46}" width="${30 + ((i * 11) % 40)}" height="6" rx="3" opacity=".4"/>`;
      }
    }
    art.innerHTML = `<svg viewBox="0 0 600 680" aria-hidden="true">
      <defs><linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--accent)" stop-opacity="0"/>
        <stop offset=".85" stop-color="var(--accent)" stop-opacity=".22"/>
        <stop offset="1" stop-color="var(--accent)" stop-opacity=".55"/></linearGradient></defs>
      ${cells}<rect class="scan" x="0" y="0" width="600" height="46"/></svg>`;
  }

  /* ---------- timelines, drawn to scale ---------- */
  const T0 = Date.UTC(2021, 8, 1), T1 = Date.UTC(2026, 9, 1);
  const pos = (d) => ((Date.UTC(d[0], d[1] - 1, d[2] || 1) - T0) / (T1 - T0)) * 100;
  const ROWS = [
    { label: t('Sàn taphoammo.net', 'taphoammo.net'), sub: t('hoạt động', 'operating'),
      items: [{ type: 'bar', cls: 'case', from: [2021, 11], to: [2026, 2], when: t('Cuối 2021 → 2/2026', 'Late 2021 → Feb 2026'),
        text: t('Sàn hoạt động khoảng 4 năm, đến khi bị khám xét đồng loạt tại Hà Nội, Phú Thọ, Quảng Ninh.', 'The platform ran for about four years until simultaneous raids in Hanoi, Phu Tho and Quang Ninh.') }] },
    { label: t('Điều tra', 'Investigation'), sub: t('các mốc', 'milestones'),
      items: [
        { type: 'dot', at: [2025, 6], when: t('6/2025', 'Jun 2025'), text: t('Công an TP Hà Nội lập chuyên án.', 'Hanoi police open the case.') },
        { type: 'dot', at: [2026, 2], when: t('2/2026', 'Feb 2026'), text: t('6 tổ công tác khám xét, triệu tập đối tượng ở 3 tỉnh, thành.', 'Six teams raid and summon suspects in three provinces.') },
        { type: 'dot', at: [2026, 7, 10], when: t('9–10/7/2026', '9–10 Jul 2026'), text: t('Công bố khởi tố 3 bị can theo Điều 288 BLHS. Vụ án tiếp tục được điều tra mở rộng.', 'Three suspects charged under Penal Code Art. 288; the investigation continues.') }
      ] },
    { label: t('Luật ATTTM 2015 · ANM 2018', 'NIS Law 2015 · Cyber Law 2018'), sub: t('đến 1/7/2026', 'until 1 Jul 2026'),
      items: [{ type: 'bar', cls: 'law', from: [2021, 9], to: [2026, 7, 1], when: t('Trước 2021 → 1/7/2026', 'Before 2021 → 1 Jul 2026'),
        text: t('Đã cấm kinh doanh trái pháp luật thông tin cá nhân (ATTTM Đ7 k5) và yêu cầu lưu dữ liệu trong nước (ANM Đ26 k3). Hết hiệu lực từ 1/7/2026.', 'Already banned unlawful trading of personal information (NIS Art. 7(5)) and required in-country storage (Cyber Art. 26(3)). Repealed on 1 Jul 2026.') }] },
    { label: t('Nghị định 13/2023', 'Decree 13/2023'), sub: t('từ 1/7/2023', 'from 1 Jul 2023'),
      items: [{ type: 'bar', cls: 'law', from: [2023, 7, 1], to: [2026, 10, 1], when: t('Từ 1/7/2023', 'From 1 Jul 2023'),
        text: t('Dữ liệu cá nhân không được mua, bán dưới mọi hình thức (Đ3 k4).', 'Personal data may not be bought or sold in any form (Art. 3(4)).') }] },
    { label: t('Nghị định 52/2024', 'Decree 52/2024'), sub: t('từ 1/7/2024', 'from 1 Jul 2024'),
      items: [{ type: 'bar', cls: 'law', from: [2024, 7, 1], to: [2026, 10, 1], when: t('Từ 1/7/2024', 'From 1 Jul 2024'),
        text: t('Thay NĐ 101/2012; cấm trung gian thanh toán không phép và dùng dịch vụ thanh toán cho kinh doanh trái pháp luật (Đ8).', 'Replaces Decree 101/2012; bans unlicensed intermediation and payment services for unlawful business (Art. 8).') }] },
    { label: t('Luật BVDLCN 2025', 'PDP Law 2025'), sub: t('từ 1/1/2026', 'from 1 Jan 2026'),
      items: [{ type: 'bar', cls: 'newlaw', from: [2026, 1, 1], to: [2026, 10, 1], when: t('Từ 1/1/2026', 'From 1 Jan 2026'),
        text: t('Cấm mua bán dữ liệu cá nhân (Đ7 k6), phạt tới 10 lần khoản thu từ vi phạm.', 'Bans trading personal data (Art. 7(6)); fines up to 10× the proceeds.') }] },
    { label: t('Luật ANM 2025 · TMĐT 2025', 'Cyber 2025 · E-commerce 2025'), sub: t('từ 1/7/2026', 'from 1 Jul 2026'),
      items: [{ type: 'bar', cls: 'newlaw', from: [2026, 7, 1], to: [2026, 10, 1], when: t('Từ 1/7/2026', 'From 1 Jul 2026'),
        text: t('Luật ANM 2025 thay Luật ANM 2018 và Luật ATTTM 2015. Luật TMĐT 2025 bắt buộc sàn định danh người bán.', 'The 2025 Cyber Law replaces the 2018 and 2015 laws. The 2025 E-commerce Law requires platforms to verify sellers.') }] }
  ];
  function timeline(el, detail, rows, gap) {
    if (!el) return;
    const all = [];
    let html = '';
    rows.forEach((r) => {
      html += `<div class="tl-row"><div class="tl-label">${r.label}<small>${r.sub}</small></div><div class="tl-track">`;
      r.items.forEach((it) => {
        const k = all.push(it) - 1;
        if (it.type === 'bar') html += `<button type="button" class="tl-bar ${it.cls}" data-k="${k}" style="left:${pos(it.from)}%;width:${Math.max(1, pos(it.to) - pos(it.from))}%" aria-label="${esc(it.when.replace(/<[^>]+>/g, ' '))}"></button>`;
        else html += `<button type="button" class="tl-dot" data-k="${k}" style="left:${pos(it.at)}%" aria-label="${esc(it.when.replace(/<[^>]+>/g, ' '))}"></button>`;
      });
      html += '</div></div>';
    });
    if (gap) html += `<div class="tl-row"><div class="tl-label">${gap.label}<small>${gap.sub}</small></div><div class="tl-track"><div class="tl-bar gap" style="left:${pos(gap.from)}%;width:${pos(gap.to) - pos(gap.from)}%"></div></div></div>`;
    html += '<div class="tl-axis">' + [2022, 2023, 2024, 2025, 2026].map((y) => `<span style="left:${pos([y, 1, 1])}%">${y}</span>`).join('') + '</div>';
    el.innerHTML = html;
    if (!detail) return;
    const show = (k) => {
      $$('[data-k]', el).forEach((b) => b.classList.toggle('sel', +b.dataset.k === k));
      detail.innerHTML = `<span class="when">${all[k].when}</span><p>${all[k].text}</p>`;
    };
    $$('[data-k]', el).forEach((b) => b.addEventListener('click', () => { show(+b.dataset.k); b.blur(); }));
    show(0);
  }
  timeline($('#tl-main'), $('#tl-main-detail'), ROWS);
  timeline($('#tl-gap'), null, ROWS.slice(0, 2), { from: [2021, 11], to: [2025, 6], label: t('Chưa bị điều tra', 'Not yet investigated'), sub: t('≈ 3,5 năm', '≈ 3.5 years') });

  /* ---------- demo results ---------- */
  const R = window.RESULTS;
  const off = $('#res-official');
  if (off) {
    if (R.official) {
      off.innerHTML = `<div class="kicker">${t('Số chính thức · Bước 6B', 'Official · Step 6B')}</div>
        <div class="g2"><div class="kpi"><span class="v">${num(R.official.detect)}%</span><span class="l">${t('phát hiện đúng', 'detected')}</span></div>
        <div class="kpi"><span class="v">${num(R.official.falseAlarm)}%</span><span class="l">${t('báo nhầm', 'false alarms')}</span></div></div>
        <p class="small ink2 mt-s">${t(`Trên ${R.official.n} tin do thành viên không đọc code tự viết.`, `On ${R.official.n} listings written by a member who never saw the code.`)}</p>`;
    } else {
      off.classList.add('vcard', 'ours');
      off.innerHTML = `<div class="kicker">${t('Số chính thức · Bước 6B', 'Official · Step 6B')}</div>
        <p class="small">${t('Điền sau khi nhóm chạy khoảng 40 tin do thành viên không đọc code tự viết.', 'To be filled in after the team runs about 40 listings written by a member who never saw the code.')}</p>`;
    }
    $('#res-scan').textContent = `≈ ${R.scanSeconds} s`;
    $('#res-manual').innerHTML = `${R.manualHours} ${t('giờ', 'h')}`;
    $('#res-table').innerHTML =
      `<thead><tr><th>${t('Bước 6–7 · dữ liệu tự sinh', 'Steps 6–7 · synthetic data')}</th><th class="r">${t('Phát hiện đúng', 'Detected')}</th><th class="r">${t('Báo nhầm', 'False alarms')}</th><th class="r">${t('Tin ngụy trang', 'Obfuscated')}</th></tr></thead><tbody>` +
      R.step6.map((r) => `<tr${r.best ? ' class="hl"' : ''}><td>${t(r.vi, r.en)}</td><td class="r">${num(r.detect)}%</td><td class="r">${num(r.falseAlarm)}%</td><td class="r">${num(r.disguised)}%</td></tr>`).join('') +
      `<tr><td>${t('Luật, không chuẩn hóa chống ngụy trang', 'Rules without de-obfuscation')}</td><td class="r">—</td><td class="r">—</td><td class="r">${num(R.rulesNoNormalize)}%</td></tr></tbody>`;
  }

  /* ---------- live demo (rule layer) ---------- */
  const EXAMPLES = [
    { vi: 'Bán data', en: 'Data sale', text: 'Cần bán gấp 30k data khách hàng spa, đủ tên + sđt, mẫu 0938123456 / 0977654321' },
    { vi: 'Thuê OTP', en: 'OTP rental', text: 'Thuê số nhận 0TP tiktok, trả code 20 giây, giá 3k' },
    { vi: 'Bán via ngụy trang', en: 'Disguised account', text: 'Bán v.i.a ngoại có 2fa, kèm c o o k i e, bh 24h' },
    { vi: 'Khóa học (dễ nhầm)', en: 'Course (tricky)', text: 'Khóa học an toàn thông tin: cách nhận diện lừa đảo chiếm đoạt OTP. LH 0905111222' },
    { vi: 'Key bản quyền', en: 'Licence key', text: 'Bán key Windows 11 Pro chính hãng, có hóa đơn đỏ' }
  ];
  const LOAI = {
    BAN_DLCN: t('Mua bán dữ liệu cá nhân (V1)', 'Personal data sale (V1)'),
    BAN_TAI_KHOAN: t('Mua bán tài khoản (V2)', 'Account sale (V2)'),
    DICH_VU_XAC_THUC: t('Dịch vụ xác thực hộ (V3)', 'Verification for hire (V3)'),
    HOP_LE: t('Không thấy dấu hiệu', 'No signal')
  };
  const VERDICT = { block: t('CHẶN', 'BLOCK'), review: t('CHUYỂN NGƯỜI DUYỆT', 'HUMAN REVIEW'), allow: t('CHO PHÉP', 'ALLOW') };
  const input = $('#demo-input');
  const out = $('#demo-out');
  function runDemo() {
    const text = input.value;
    if (!text.trim()) { out.innerHTML = `<p class="small muted">${t('Nhập một tin đăng hoặc chọn ví dụ.', 'Type a listing or pick an example.')}</p>`; return; }
    const r = window.Detector.chamDiem(text);
    const why = [];
    r.tuKhop.forEach(([tk, loai]) => why.push(t(`từ khóa “${esc(tk)}” (${loai})`, `keyword “${esc(tk)}” (${loai})`)));
    if (r.coMau) why.push(t(`chứa mẫu dữ liệu cá nhân: ${r.dlcn.length} giá trị`, `personal data sample: ${r.dlcn.length} values`));
    else if (r.dlcn.length) why.push(t('một số liên hệ đơn lẻ, không tính là mẫu dữ liệu', 'a single contact number, not a data sample'));
    if (r.tru) why.push(t(`ngữ cảnh hợp lệ: ${r.nguCanh.map(esc).join(', ')} (trừ điểm)`, `legitimate context: ${r.nguCanh.map(esc).join(', ')} (deducted)`));
    if (r.luatCung) why.push(t('luật cứng: mẫu dữ liệu + từ khóa vi phạm → chặn ngay', 'hard rule: data sample + violation keyword → block'));
    const pct = Math.round(r.diemLuat * 100);
    out.innerHTML = `
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="verdict ${r.quyetDinh}">${VERDICT[r.quyetDinh]}</span><b>${LOAI[r.loai]}</b></div>
      <div><div class="small ink2">${t('Điểm luật', 'Rule score')}: <b class="mono">${r.diemLuat.toFixed(2)}</b></div>
        <div class="meter" role="img" aria-label="${pct}%"><i style="width:${pct}%"></i></div>
        <div class="meter-scale"><span style="left:0;transform:none">0</span><span style="left:40%">0,40</span><span style="left:70%">0,70</span><span style="left:100%;transform:translateX(-100%)">1</span></div></div>
      <div><div class="kicker">${t('Lý do', 'Reasons')}</div>${why.length ? `<ul class="reasons">${why.map((x) => `<li>${x}</li>`).join('')}</ul>` : '<p class="small muted">—</p>'}</div>
      <div><div class="kicker">${t('Sau chuẩn hóa', 'Normalised')}</div><div class="mono-box">${esc(r.chuanHoa) || '—'}</div></div>
      <div><div class="kicker">${t('Bản ghi nhật ký (đã che dữ liệu)', 'Log entry (masked)')}</div><div class="mono-box">${esc(window.Detector.che(text))}</div></div>`;
  }
  if (input && out) {
    const chips = $('#demo-chips');
    chips.innerHTML = EXAMPLES.map((ex, i) => `<button type="button" data-ex="${i}">${t(ex.vi, ex.en)}</button>`).join('');
    chips.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (!b) return;
      input.value = EXAMPLES[+b.dataset.ex].text;
      runDemo();
      b.blur();
    });
    let timer = null;
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(runDemo, 150); });
    input.value = EXAMPLES[0].text;
    runDemo();
  }
})();
