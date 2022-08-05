function NhanVien(taiKhoan, hoTen, email, password, ngayLam, luongCoBan, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;

    this.tongLuong = 0;
    this.loaiNhanVien = '';

    this.tinhLuong = function () {
        if (this.chucVu == 'Giám đốc') {
            this.tongLuong = this.luongCoBan * 3
        } else if (this.chucVu == 'Trưởng phòng') {
            this.tongLuong = this.luongCoBan * 2
        } else if (this.chucVu == 'Nhân viên') {
            this.tongLuong = this.luongCoBan
        }
    };

    this.xepLoai = function() {
        if (this.gioLam >= 192) {
            this.loaiNhanVien = 'Xuất sắc'
        } else if (this.gioLam >= 176) {
            this.loaiNhanVien = 'Giỏi'
        } else if (this.gioLam >= 160) {
            this.loaiNhanVien = 'Khá'
        } else {
            this.loaiNhanVien = 'Trung bình'
        }
    };

}