/* GP1 rule layer, ported from the notebook Demo_GP1_phat_hien_tin_dang.ipynb (Steps 2–3).
   Verified to give the same score as the Python version on 1,028 listings. */
const Detector = (() => {
  function boDau(s) {
    return s.replace(/đ/g, "d").replace(/Đ/g, "D").normalize("NFD").replace(/\p{Mn}/gu, "");
  }
  const LEET = { "4": "a", "3": "e", "0": "o", "1": "i", "5": "s", "7": "t" };
  function doiLeet(tu) {
    if (/^\d+(?:k|tr|h|m|d|s|fa|gb|mb|th|nam)$/.test(tu)) return tu;
    if ((tu.match(/[a-z]/g) || []).length < 2) return tu;
    return tu.replace(/[431057]/g, c => LEET[c]);
  }
  function chuanHoa(text) {
    let s = boDau(String(text).toLowerCase());
    s = s.replace(/\b(?=\w*[a-z])(?=\w*\d)\w+\b/g, doiLeet);
    s = s.replace(/\b(?:[a-z][.\-*_ ]){2,}[a-z]\b/g, m => m.replace(/[.\-*_ ]/g, ""));
    s = s.replace(/[^a-z0-9\s]/g, " ");
    return s.replace(/\s+/g, " ").trim();
  }
  const RE_SDT = /(?<!\d)(?:\+84|0)[35789](?:[\s.\-]?\d){8}(?!\d)/g;
  const RE_CCCD = /(?<!\d)0\d{11}(?!\d)/g;
  const RE_EMAIL = /[\w.\-]+@[\w\-]+\.[a-z]{2,}/gi;
  function timDLCN(text) {
    const out = [];
    for (const m of text.matchAll(RE_CCCD)) out.push(["CCCD", m[0]]);
    for (const m of text.matchAll(RE_SDT)) {
      const so = m[0].replace(/\D/g, "");
      if (!out.some(([, g]) => g === so)) out.push(["SĐT", m[0]]);
    }
    for (const m of text.matchAll(RE_EMAIL)) out.push(["Email", m[0]]);
    return out;
  }
  const TU_KHOA = {
    BAN_DLCN: { "data": 1.0, "du lieu khach hang": 2.0, "thong tin khach hang": 2.0, "danh sach khach hang": 2.0,
      "data khach": 2.0, "kho du lieu": 1.5, "cccd": 1.5, "can cuoc": 1.5, "cmnd": 1.5, "anh 2 mat": 2.0,
      "so dien thoai": 1.0, "sdt": 1.0, "list email": 2.0, "record": 1.0, "chu xe": 1.5, "ho so vay": 1.5,
      "bao test": 1.0, "so tai khoan ngan hang": 1.5, "chua ai goi": 2.0 },
    BAN_TAI_KHOAN: { "via": 2.0, "clone": 2.0, "acc": 1.5, "nick": 1.0, "tai khoan": 0.5, "2fa": 1.0, "cookie": 1.5,
      "ngam": 1.0, "trust": 1.5, "hotmail": 1.5, "reg": 1.5, "bm": 1.5, "full info": 2.0, "doi pass": 2.0,
      "nguyen zin": 1.5, "mat khau": 1.0, "sang ten": 1.0, "limit": 1.0 },
    DICH_VU_XAC_THUC: { "otp": 2.0, "thue so": 2.0, "nhan sms": 2.0, "sim ao": 2.0, "sms ao": 2.0, "verify": 1.5,
      "xac minh ho": 2.5, "kyc ho": 2.5, "ekyc": 1.5, "checkpoint": 1.5, "mo khoa": 1.0, "khang": 1.0,
      "bypass": 2.0, "vuot": 1.0, "lach": 1.5, "khong chinh chu": 2.5, "ma xac thuc": 1.5 },
  };
  const NGU_CANH = { "chinh hang": 1.5, "hoa don": 1.0, "ban quyen": 1.5, "giay phep": 1.0, "khoa hoc": 1.5,
    "huong dan": 1.0, "tu van": 1.0, "tuan thu": 1.5, "bao mat": 1.0, "doanh nghiep": 0.5 };
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rx = tk => new RegExp("\\b" + esc(tk) + "\\b");
  const RX = {};
  for (const [loai, ds] of Object.entries(TU_KHOA)) { RX[loai] = {}; for (const tk of Object.keys(ds)) RX[loai][tk] = rx(tk); }
  const RX_NC = {}; for (const tk of Object.keys(NGU_CANH)) RX_NC[tk] = rx(tk);
  function khop(tk, r, vb, vbDinh) {
    if (r.test(vb)) return true;
    const d = tk.replace(/ /g, "");
    return d.length >= 5 && vbDinh.includes(d);
  }
  function chamDiem(text) {
    const vb = chuanHoa(text), vbDinh = vb.replace(/ /g, "");
    const diem = { BAN_DLCN: 0, BAN_TAI_KHOAN: 0, DICH_VU_XAC_THUC: 0 };
    const tuKhop = [];
    for (const [loai, ds] of Object.entries(RX)) {
      for (const [tk, r] of Object.entries(ds)) {
        if (khop(tk, r, vb, vbDinh)) { diem[loai] += TU_KHOA[loai][tk]; tuKhop.push([tk, loai]); }
      }
    }
    const dlcn = timDLCN(text);
    const coMau = dlcn.some(([l]) => l === "CCCD") || new Set(dlcn.map(([, g]) => g)).size >= 2;
    if (coMau) diem.BAN_DLCN += 2.5;
    const nguCanh = Object.keys(NGU_CANH).filter(tk => khop(tk, RX_NC[tk], vb, vbDinh));
    const tru = nguCanh.reduce((a, tk) => a + NGU_CANH[tk], 0);
    const loaiMax = Object.keys(diem).reduce((a, b) => (diem[b] > diem[a] ? b : a));
    const diemLuat = Math.min(1, Math.max(0, (diem[loaiMax] - 0.7 * tru) / 4));
    const luatCung = coMau && Object.values(diem).some(v => v >= 1.5);
    const loai = diem[loaiMax] > 0 ? loaiMax : "HOP_LE";
    let quyetDinh = "allow";
    if (luatCung || diemLuat >= 0.7) quyetDinh = "block"; else if (diemLuat >= 0.4) quyetDinh = "review";
    return { chuanHoa: vb, diem, diemLuat, luatCung, loai, quyetDinh, tuKhop, dlcn, coMau, nguCanh, tru };
  }
  function che(text) {
    const cheSo = m => { const so = m.replace(/\D/g, ""); return so.slice(0, 3) + "*".repeat(Math.max(0, so.length - 5)) + so.slice(-2); };
    return text.replace(RE_CCCD, cheSo).replace(RE_SDT, cheSo).replace(RE_EMAIL, m => m.slice(0, 2) + "***@" + m.split("@")[1]);
  }
  return { chuanHoa, chamDiem, che };
})();
window.Detector = Detector;
