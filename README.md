# Vụ việc sàn taphoammo.net

Bộ slide web song ngữ Việt–Anh cho bài tập lớn môn *Luật pháp, chính sách và chuẩn trong an ninh mạng*: áp dụng pháp luật bảo vệ dữ liệu cá nhân và an ninh mạng Việt Nam vào vụ việc sàn giao dịch taphoammo.net.

Khung trình chiếu (giao diện, điều hướng, mục lục, chế độ cuộn, quiz) dùng lại từ bộ slide *Biometric Template Protection* của Nhóm 3.

**Xem slide:** https://congtul.github.io/Sec_Law_VN/

## Phím tắt

| Phím | Tác dụng |
|---|---|
| ← → / Space | Chuyển slide |
| L | Đổi ngôn ngữ Việt / Anh |
| T | Sáng / tối |
| V | Chế độ trình chiếu / chế độ cuộn |
| M | Mục lục |
| F | Toàn màn hình |
| A–D, R | Chọn đáp án và hiện đáp án trong quiz |

Mở thẳng một slide: `#/25`, hoặc theo tên: `#/demo`, `#/quiz`. Thêm `?check` vào URL để kiểm tra slide nào bị tràn chữ.

## Chỉnh sửa nhanh

- **Tên thành viên:** `assets/js/app.js`, mảng `TEAM`. Tên tự hiện ở trang bìa, slide chia chương và góc trên mỗi slide (người trình bày).
- **Kết quả demo chính thức (Bước 6B của notebook):** `assets/js/app.js`, `RESULTS.official`, ví dụ `{ detect: 87.5, falseAlarm: 5.0, n: 40 }`.
- **Câu hỏi quiz:** `assets/js/quiz.js`, mảng `QUIZ`.
- **Nội dung slide:** `index.html`. Mỗi slide là một `<section class="slide">`; chữ tiếng Việt trong `<span class="vi">`, tiếng Anh trong `<span class="en">`.

Demo trên slide chạy lớp luật của công cụ GP1 ngay trong trình duyệt (`assets/js/detector.js`), cho điểm trùng với notebook `Demo_GP1_phat_hien_tin_dang.ipynb`.

Vụ án đang trong giai đoạn điều tra, chưa có bản án. Phần V4–V7 là phân tích của nhóm.
