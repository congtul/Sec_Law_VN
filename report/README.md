# Báo cáo LaTeX: vụ sàn taphoammo.net (CO5159)

Bản LaTeX của báo cáo, chuyển từ bản Google Docs mà nhóm đã chốt ngày 22/10/2026. Từ giờ bản LaTeX này là bản chính: muốn sửa chương nào thì sửa trực tiếp file của chương đó.

## Cấu trúc

| File | Nội dung |
|---|---|
| `main.tex` | Cấu hình chung (font, đầu/chân trang, đánh số), nạp các file bên dưới |
| `trang_bia.tex` | Trang bìa |
| `chuong1.tex` … `chuong6.tex` | Nội dung từng chương |
| `tai_lieu_tham_khao.tex` | Danh mục tài liệu tham khảo, chia nhóm |
| `figures/` | Hình: ảnh PNG và lưu đồ vẽ bằng TikZ (`.tex`) |
| `hcmut.png` | Logo trường |

## Đưa lên Overleaf

1. Tải thư mục `report/` về dưới dạng zip (hoặc nén thư mục này).
2. Trên Overleaf chọn **New Project → Upload Project**, rồi chọn file zip.
3. Vào **Menu → Main document** và chọn `main.tex`.
4. Vào **Menu → Compiler** và chọn **pdfLaTeX** (giống template, dùng `vntex`). Nếu bị lỗi font tiếng Việt thì đổi sang **XeLaTeX**. `main.tex` tự nhận trình biên dịch nên không cần sửa gì.
5. Bấm **Recompile** hai lần để cập nhật mục lục, số trang và số trích dẫn.

## Quy ước khi sửa

- **Trích dẫn** dùng khóa, ví dụ `\cite{bca-2026}` hoặc `\cite{luat-bvdlcn-2025,nd356-2025}`. Các khóa nằm ở `tai_lieu_tham_khao.tex`, và số thứ tự tự đánh theo thứ tự trong danh mục. Muốn thêm tài liệu thì thêm một dòng `\bibitem{khoa-moi} …`.
- **Tham chiếu mục** dùng nhãn, ví dụ `mục~\ref{sec:5.2.1}`. Nhãn đặt theo số mục lúc chuyển đổi. Nếu sau này chèn thêm mục thì số hiển thị vẫn tự cập nhật, chỉ còn tên nhãn là giữ số cũ.
- **Hình và bảng** tự đánh số theo chương (Hình 5.1, Bảng 2.1…), có nhãn `fig:…` và `tab:…`.
- Tránh gõ trực tiếp các ký tự `% & $ # _ { }`; hãy viết `\% \& \$ \# \_ \{ \}`.
