# Vụ việc sàn taphoammo.net

Bộ slide web (song ngữ Việt–Anh) cho bài tập lớn môn *Luật pháp, chính sách và chuẩn trong an ninh mạng*: áp dụng pháp luật bảo vệ dữ liệu cá nhân và an ninh mạng Việt Nam vào vụ việc sàn giao dịch taphoammo.net.

## Xem slide

Bật GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**, rồi mở `https://congtul.github.io/Sec_Law_VN/`.

## Phím tắt

| Phím | Tác dụng |
|---|---|
| ← → / Space | Chuyển slide |
| M | Mục lục |
| L | Đổi ngôn ngữ Việt / Anh |
| T | Sáng / tối |
| F | Toàn màn hình |

Mở thẳng một slide bằng `#s<số>`, ví dụ `#s25` là slide demo.

## Chỉnh sửa nhanh

Mọi thứ nằm trong `index.html`.

- **Tên thành viên:** sửa mảng `TEAM` (tìm `EDIT HERE`).
- **Kết quả demo chính thức (Bước 6B của notebook):** điền vào `RESULTS.official`, ví dụ `{ detect: 87.5, falseAlarm: 5.0, n: 40 }`.
- **Nội dung slide:** mỗi slide là một `<section class="slide">`; chữ tiếng Việt trong `<span class="vi">`, tiếng Anh trong `<span class="en">`.

Demo trên slide chạy lớp luật của công cụ GP1 ngay trong trình duyệt (cho kết quả trùng với notebook). Bản đầy đủ hai lớp nằm trong notebook `Demo_GP1_phat_hien_tin_dang.ipynb`.

Vụ án đang trong giai đoạn điều tra, chưa có bản án. Phần V4–V7 là phân tích của nhóm.
