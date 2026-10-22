# Thực trạng mua bán dữ liệu cá nhân qua vụ việc sàn taphoammo.net và giải pháp pháp lý

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

Chân mỗi slide ghi nguồn dạng [n], cùng số với danh mục tài liệu tham khảo trong báo cáo (`report/tai_lieu_tham_khao.tex`).

Mở thẳng một slide: `#/25`, hoặc theo tên: `#/demo`, `#/quiz`. Thêm `?check` vào URL để kiểm tra slide nào bị tràn chữ.

## Chỉnh sửa nhanh

- **Tên thành viên:** `assets/js/app.js`, mảng `TEAM`. Tên tự hiện ở trang bìa, slide chia chương và góc trên mỗi slide (người trình bày).
- **Kết quả demo trên bộ kiểm tra 120 tin:** `assets/js/app.js`, `RESULTS.rows` (khớp bảng kết quả ở mục 5.2.1 của báo cáo).
- **Câu hỏi quiz:** `assets/js/quiz.js`, mảng `QUIZ`.
- **Nội dung slide:** `index.html`. Mỗi slide là một `<section class="slide">`; chữ tiếng Việt trong `<span class="vi">`, tiếng Anh trong `<span class="en">`.

Demo trên slide chạy module quét từ khóa + Regex của công cụ phát hiện tin đăng ngay trong trình duyệt (`assets/js/detector.js`), cho điểm trùng với notebook `Demo_phat_hien_tin_dang.ipynb`.

Vụ án đang trong giai đoạn điều tra, chưa có bản án. Bốn hành vi ở mục 3.2 là phân tích của nhóm.
