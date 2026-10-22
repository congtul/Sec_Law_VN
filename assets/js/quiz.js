/* =========================================================
   taphoammo.net case — Quiz (10 questions)
   Engine adapted from the Group 3 BTP deck.
   Presenting: → / Space reveals the answer, → again moves on.
   A–D (or 1–4) picks an option, R reveals.
   ========================================================= */
(function () {
  'use strict';

  const L = (o) => (typeof o === 'string' ? o : `<span class="en">${o.en}</span><span class="vi">${o.vi}</span>`);
  const KIND = {
    law: { en: 'Law', vi: 'Pháp luật' },
    fact: { en: 'The case', vi: 'Vụ việc' },
    tool: { en: 'Tool', vi: 'Công cụ' }
  };
  const LET = ['A', 'B', 'C', 'D'];

  const QUIZ = [
    {
      kind: 'fact', ch: '1.1', ans: 1,
      title: { en: 'The charge', vi: 'Tội danh khởi tố' },
      q: { en: 'Under which article of the Penal Code were the three suspects charged?', vi: 'Ba bị can bị khởi tố theo điều nào của Bộ luật Hình sự?' },
      opts: [{ en: 'Article 159', vi: 'Điều 159' }, { en: 'Article 288', vi: 'Điều 288' }, { en: 'Article 290', vi: 'Điều 290' }, { en: 'Article 291', vi: 'Điều 291' }],
      why: { en: 'Art. 288: illegal provision or use of information on computer and telecom networks. The Penal Code has no dedicated personal-data offence yet.', vi: 'Điều 288: tội đưa hoặc sử dụng trái phép thông tin mạng máy tính, mạng viễn thông. BLHS chưa có tội danh riêng về dữ liệu cá nhân.' }
    },
    {
      kind: 'law', ch: '2.2', ans: 0,
      title: { en: 'Banned in any form', vi: 'Cấm dưới mọi hình thức' },
      q: { en: 'Which provision says “personal data may not be bought or sold in any form”?', vi: 'Quy định nào nêu “dữ liệu cá nhân không được mua, bán dưới mọi hình thức”?' },
      opts: [{ en: 'Decree 13/2023, Art. 3(4)', vi: 'NĐ 13/2023, Điều 3 khoản 4' }, { en: 'Advertising Law 2012, Art. 8', vi: 'Luật Quảng cáo 2012, Điều 8' }, { en: 'Decree 52/2024, Art. 8', vi: 'NĐ 52/2024, Điều 8' }, { en: 'Cybersecurity Law 2018, Art. 26', vi: 'Luật ANM 2018, Điều 26' }],
      why: { en: 'A principle of Decree 13/2023, in force from 1 Jul 2023.', vi: 'Nguyên tắc của Nghị định 13/2023, có hiệu lực từ 1/7/2023.' }
    },
    {
      kind: 'fact', ch: '1.1', ans: 1,
      title: { en: 'Platform fee', vi: 'Phí trung gian' },
      q: { en: 'How much did the platform charge as an intermediary fee on each deal?', vi: 'Sàn thu phí trung gian bao nhiêu trên mỗi giao dịch?' },
      opts: [{ en: 'Under 1%', vi: 'Dưới 1%' }, { en: '3–5%', vi: '3–5%' }, { en: '10%', vi: '10%' }, { en: '20–30%', vi: '20–30%' }],
      why: { en: 'Investigators said the platform held funds, guaranteed deals and took 3–5% per deal, over more than 53 million transactions.', vi: 'Theo cơ quan điều tra, sàn giữ tiền, bảo đảm giao dịch và thu phí 3–5% mỗi giao dịch, trên hơn 53 triệu giao dịch.' }
    },
    {
      kind: 'law', ch: '3', ans: 1,
      title: { en: 'Charged or our analysis', vi: 'Khởi tố hay nhóm phân tích' },
      q: { en: 'How do the three acts in 3.1 differ from the four in 3.2?', vi: 'Ba hành vi ở mục 3.1 khác bốn hành vi ở mục 3.2 ở điểm nào?' },
      opts: [{ en: 'The 3.1 acts are more serious', vi: 'Hành vi ở 3.1 nặng hơn' }, { en: 'The 3.1 acts are within the charge; the 3.2 acts are our analysis of published facts', vi: 'Hành vi ở 3.1 thuộc nội dung khởi tố; hành vi ở 3.2 là nhóm phân tích từ dữ kiện đã công bố' }, { en: 'The 3.2 acts have no facts behind them', vi: 'Hành vi ở 3.2 chưa có dữ kiện' }, { en: 'No difference', vi: 'Không khác nhau' }],
      why: { en: 'The facts behind the four acts in 3.2 were published by investigators; only the conclusion “this breaches provision X” is ours.', vi: 'Dữ kiện của bốn hành vi ở 3.2 do cơ quan điều tra công bố; chỉ kết luận “vi phạm quy định X” là của nhóm.' }
    },
    {
      kind: 'law', ch: '3.2', ans: 1,
      title: { en: 'If the platform had a licence', vi: 'Nếu sàn có giấy phép' },
      q: { en: 'If the platform held a payment-intermediary licence, would its payment role still be a violation?', vi: 'Nếu sàn có giấy phép trung gian thanh toán, việc làm trung gian thanh toán còn là vi phạm không?' },
      opts: [{ en: 'No, it would be lawful', vi: 'Không, khi đó là hợp pháp' }, { en: 'Yes, under Decree 52/2024 Art. 8(8)', vi: 'Có, theo NĐ 52/2024 Điều 8 khoản 8' }, { en: 'Only after a verdict', vi: 'Chỉ khi có bản án' }, { en: 'Up to the Ministry of Industry and Trade', vi: 'Tùy Bộ Công Thương' }],
      why: { en: 'Using payment services for unlawful business is banned either way. The licence only decides clause 7, or clauses 8 and 12.', vi: 'Dùng dịch vụ thanh toán để kinh doanh trái pháp luật vẫn bị cấm. Giấy phép chỉ quyết định áp khoản 7, hay khoản 8 và 12.' }
    },
    {
      kind: 'law', ch: '3.1', ans: 1,
      title: { en: 'Accounts are personal data', vi: 'Tài khoản là dữ liệu cá nhân' },
      q: { en: 'Why is selling social media accounts also selling personal data?', vi: 'Vì sao bán tài khoản mạng xã hội cũng là bán dữ liệu cá nhân?' },
      opts: [{ en: 'Accounts have passwords', vi: 'Vì tài khoản có mật khẩu' }, { en: 'Digital account information is basic personal data (Decree 13, Art. 2(3)(k))', vi: 'Thông tin tài khoản số là dữ liệu cá nhân cơ bản (NĐ 13, Đ2 k3 điểm k)' }, { en: 'Because the press says so', vi: 'Vì báo chí nói vậy' }, { en: 'It is not', vi: 'Không phải' }],
      why: { en: 'This is why Decree 13 applies to account trading alongside Art. 288.', vi: 'Đây là căn cứ để áp NĐ 13 cho hành vi mua bán tài khoản, bên cạnh Điều 288.' }
    },
    {
      kind: 'law', ch: '2.2', ans: 1,
      title: { en: 'Which law now?', vi: 'Luật nào đang có hiệu lực?' },
      q: { en: 'From 1 Jul 2026, what replaced the 2018 Cybersecurity Law and the 2015 Network Information Security Law?', vi: 'Từ 1/7/2026, luật nào thay Luật ANM 2018 và Luật ATTTM 2015?' },
      opts: [{ en: 'PDP Law 2025', vi: 'Luật BVDLCN 2025' }, { en: 'Cybersecurity Law 2025', vi: 'Luật An ninh mạng 2025' }, { en: 'E-commerce Law 2025', vi: 'Luật TMĐT 2025' }, { en: 'Nothing replaced them', vi: 'Không có luật thay thế' }],
      why: { en: 'Law 116/2025/QH15. The violations are still analysed under the old laws, which were in force when the acts happened.', vi: 'Luật số 116/2025/QH15. Phân tích vi phạm vẫn dùng luật cũ vì hành vi xảy ra khi luật cũ còn hiệu lực.' }
    },
    {
      kind: 'fact', ch: '4.1', ans: 1,
      title: { en: 'What investigators named', vi: 'Điều cơ quan điều tra nêu' },
      q: { en: 'Which challenge did investigators themselves name as making tracing hard?', vi: 'Thách thức nào được chính cơ quan điều tra nêu là gây khó truy vết?' },
      opts: [{ en: 'Slang in listings', vi: 'Tin đăng dùng từ lóng' }, { en: 'Offshore servers and rented domains', vi: 'Máy chủ ở nước ngoài, tên miền đi thuê' }, { en: 'The corporate shell', vi: 'Vỏ bọc doanh nghiệp' }, { en: 'Transaction volume', vi: 'Khối lượng giao dịch lớn' }],
      why: { en: 'The case took about 8 months from opening (June 2025) to the raids (February 2026).', vi: 'Chuyên án mất khoảng 8 tháng từ khi lập (6/2025) đến khi khám xét (2/2026).' }
    },
    {
      kind: 'tool', ch: '5.2', ans: 1,
      title: { en: 'A contact number', vi: 'Một số điện thoại liên hệ' },
      q: { en: 'A legitimate listing includes one contact phone number. How does the listing detector treat it?', vi: 'Một tin hợp lệ có ghi một số điện thoại liên hệ. Công cụ phát hiện tin đăng xử lý thế nào?' },
      opts: [{ en: 'Block it', vi: 'Chặn ngay' }, { en: 'Not a data sample: it needs an ID number or two or more values', vi: 'Không tính là mẫu dữ liệu: cần số CCCD hoặc từ 2 giá trị trở lên' }, { en: 'Send it to human review', vi: 'Chuyển người duyệt' }, { en: 'Delete the number', vi: 'Xóa số điện thoại' }],
      why: { en: 'Every seller leaves a contact number, so this rule keeps false alarms down.', vi: 'Người bán nào cũng để số liên hệ, nên quy tắc này giảm báo nhầm.' }
    },
    {
      kind: 'tool', ch: '6.1', ans: 1,
      title: { en: 'Two modules together', vi: 'Kết hợp hai module' },
      q: { en: 'On the 120-listing test set, what did combining both modules change?', vi: 'Trên bộ kiểm tra 120 tin, kết hợp hai module thay đổi kết quả thế nào?' },
      opts: [{ en: 'Recall and false alarms both fell', vi: 'Recall và báo nhầm cùng giảm' }, { en: 'Recall rose to 93.3%; false alarms rose to 5.0%', vi: 'Recall tăng lên 93,3%; báo nhầm tăng lên 5,0%' }, { en: 'Recall stayed the same', vi: 'Recall không đổi' }, { en: 'False alarms fell to 0%', vi: 'Báo nhầm về 0%' }],
      why: { en: 'The two modules miss different listings, so together they catch more. All 3 false alarms only went to human review; none were blocked.', vi: 'Hai module bỏ sót những tin khác nhau nên kết hợp bắt được nhiều hơn. Cả 3 tin báo nhầm chỉ bị chuyển người duyệt, không bị chặn.' }
    }
  ];

  const ICON_OK = '<svg class="ic ok" viewBox="0 0 30 30" aria-hidden="true"><path d="M7 15.5l5.5 5.5L23.5 9"/></svg>';
  const ICON_NO = '<svg class="ic no" viewBox="0 0 30 30" aria-hidden="true"><path d="M9.5 9.5l11 11M20.5 9.5l-11 11"/></svg>';

  function render(q, i) {
    const s = document.createElement('section');
    const t = q.t || 20;
    s.className = 'slide quiz-q';
    s.id = 'q' + (i + 1);
    s.dataset.ch = 'q';
    s.dataset.ans = q.ans;
    s.dataset.t = t;
    s.dataset.tocEn = `Q${i + 1} · ${q.title.en}`;
    s.dataset.tocVi = `Câu ${i + 1} · ${q.title.vi}`;

    const rows = [`<div class="row" style="--i:0"><span class="chip good">✓ ${LET[q.ans]}</span><span><b>${L(q.opts[q.ans])}</b></span></div>`];
    let k = 1;
    if (q.why) rows.push(`<div class="row" style="--i:${k++}"><span class="chip">${L({ en: 'Why', vi: 'Vì sao' })}</span><span>${L(q.why)}</span></div>`);
    if (q.gain) rows.push(`<div class="row" style="--i:${k++}"><span class="chip good">${L({ en: 'Gain', vi: 'Được' })}</span><span>${L(q.gain)}</span></div>`);
    if (q.give) rows.push(`<div class="row" style="--i:${k++}"><span class="chip warn">${L({ en: 'Give up', vi: 'Đánh đổi' })}</span><span>${L(q.give)}</span></div>`);
    const fig = q.fig ? q.fig() : '';

    s.innerHTML = `
      <div class="q-head">
        <div>
          <div class="q-tags">
            <span class="q-no">${L({ en: 'Q', vi: 'Câu ' })}${i + 1}<span style="opacity:.65">/${QUIZ.length}</span></span>
            <span class="chip ${q.kind === 'tool' ? 'warn' : 'ch'}">${L(KIND[q.kind])}</span>
            <span class="chip">${L({ en: 'Ch.', vi: 'Mục' })}&nbsp;${q.ch}</span>
          </div>
          <h2>${L(q.title)}</h2>
        </div>
        <div class="timer" aria-hidden="true">
          <svg viewBox="0 0 62 62"><circle class="track" cx="31" cy="31" r="26"/><circle class="bar" cx="31" cy="31" r="26"/></svg>
          <div class="tn">${t}</div>
        </div>
      </div>
      <div class="q-body">
        <p class="q-text">${L(q.q)}</p>
        <div class="opts" role="group">
          ${q.opts.map((o, j) => `<button type="button" class="opt" data-j="${j}" style="--d:${j * 70}ms"><span class="lt">${LET[j]}</span><span class="ot">${L(o)}</span>${ICON_OK}${ICON_NO}</button>`).join('')}
        </div>
        <div class="q-foot">
          <button type="button" class="reveal-btn">${L({ en: 'Reveal answer', vi: 'Hiện đáp án' })} <kbd>→</kbd></button>
          <div class="explain${fig ? ' has-fig' : ''}" aria-live="polite">
            <div class="stack-s">${rows.join('')}</div>
            ${fig ? `<div class="efig">${fig}</div>` : ''}
          </div>
        </div>
      </div>`;
    return s;
  }

  /* ---------- state ---------- */
  const results = {};
  let timer = null;

  function stopTimer() {
    if (!timer) return;
    clearInterval(timer.id);
    timer.el.classList.remove('run', 'late');
    timer = null;
  }
  function startTimer(s) {
    stopTimer();
    if (s.classList.contains('revealed') || document.documentElement.classList.contains('doc-mode')) return;
    const el = s.querySelector('.timer');
    const tn = el.querySelector('.tn');
    let left = +s.dataset.t;
    el.classList.remove('run', 'late');
    void el.offsetWidth; // restart the CSS animation
    el.style.setProperty('--t', left + 's');
    el.classList.add('run');
    tn.textContent = left;
    const id = setInterval(() => {
      left -= 1;
      tn.textContent = Math.max(0, left);
      if (left <= 0) { el.classList.add('late'); clearInterval(id); }
    }, 1000);
    timer = { id, el };
  }

  function pick(s, j) {
    if (!s || s.classList.contains('revealed')) return;
    const opts = s.querySelectorAll('.opt');
    const o = opts[j];
    if (!o) return;
    const was = o.classList.contains('picked');
    opts.forEach((x) => x.classList.remove('picked'));
    if (!was) o.classList.add('picked');
  }

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function burst(el) {
    if (!el || reduced()) return;
    const slide = el.closest('.slide');
    const sr = slide.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const scale = sr.width / slide.offsetWidth || 1;
    const cx = (er.left - sr.left + er.width / 2) / scale;
    const cy = (er.top - sr.top + er.height / 2) / scale;
    const cs = getComputedStyle(slide);
    const colors = ['--good', '--cq', '--accent', '--fig-1', '--fig-2', '--fig-4'].map((v) => cs.getPropertyValue(v).trim());
    for (let i = 0; i < 34; i++) {
      const p = document.createElement('i');
      p.className = 'spark';
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = colors[i % colors.length];
      if (i % 3 === 0) p.style.borderRadius = '50%';
      if (i % 4 === 1) { p.style.width = '5px'; p.style.height = '12px'; }
      slide.appendChild(p);
      const a = Math.random() * Math.PI * 2;
      const d = 110 + Math.random() * 230;
      const dx = Math.cos(a) * d;
      const dy = Math.sin(a) * d * 0.62 - 50;
      const anim = p.animate([
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.8}px), calc(-50% + ${dy * 0.8}px)) scale(1) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 90}px)) scale(.4) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], { duration: 950 + Math.random() * 650, easing: 'cubic-bezier(.12,.75,.3,1)', fill: 'forwards' });
      anim.onfinish = () => p.remove();
    }
  }

  function reveal(s, opts = {}) {
    if (!s || s.classList.contains('revealed')) return;
    const ans = +s.dataset.ans;
    const list = s.querySelectorAll('.opt');
    list[ans].classList.add('correct');
    const picked = s.querySelector('.opt.picked');
    if (picked) {
      const ok = +picked.dataset.j === ans;
      if (!ok) picked.classList.add('wrong-pick');
      results[s.id] = ok;
    }
    s.classList.add('revealed');
    stopTimer();
    if (!opts.silent) setTimeout(() => burst(list[ans]), 380);
    updateScore();
  }

  function reset() {
    document.querySelectorAll('.quiz-q').forEach((s) => {
      s.classList.remove('revealed');
      s.querySelectorAll('.opt').forEach((o) => o.classList.remove('picked', 'correct', 'wrong-pick'));
    });
    Object.keys(results).forEach((k) => delete results[k]);
    updateScore();
  }

  function updateScore() {
    const box = document.getElementById('quiz-score');
    if (!box) return;
    const vals = Object.values(results);
    const n = vals.length;
    const ok = vals.filter(Boolean).length;
    box.classList.toggle('show', n > 0);
    box.innerHTML = `<span class="en">Your picks: <b>${ok} / ${n}</b> correct</span><span class="vi">Bạn chọn đúng: <b>${ok} / ${n}</b> câu</span>`;
  }

  /* ---------- mount ---------- */
  const intro = document.getElementById('quiz');
  if (intro) {
    let anchor = intro;
    QUIZ.forEach((q, i) => {
      const s = render(q, i);
      anchor.after(s);
      anchor = s;
    });
  }

  document.addEventListener('click', (e) => {
    const o = e.target.closest('.quiz-q .opt');
    if (o) { pick(o.closest('.slide'), +o.dataset.j); o.blur(); return; }
    const r = e.target.closest('.quiz-q .reveal-btn');
    if (r) { reveal(r.closest('.slide')); r.blur(); return; }
    if (e.target.closest('[data-quiz-reset]')) { reset(); e.target.closest('[data-quiz-reset]').blur(); }
  });

  document.addEventListener('slide:enter', (e) => {
    const s = e.detail.slide;
    if (s.classList.contains('quiz-q')) startTimer(s);
    else stopTimer();
  });

  const revealAll = () => document.querySelectorAll('.quiz-q').forEach((s) => reveal(s, { silent: true }));
  window.addEventListener('beforeprint', revealAll);
  if (new URLSearchParams(location.search).has('reveal')) revealAll();

  window.Quiz = { reveal, pick, reset, data: QUIZ };
})();
