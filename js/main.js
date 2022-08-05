var dsnv = new DanhSachNhanVien();
var validation = new Validation();
function getELE(id) {
    return document.getElementById(id);
}

function themNhanVien() {
    var taiKhoan = getELE('tknv').value;
    var hoTen = getELE('name').value;
    var email = getELE('email').value;
    var password = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

// console.log('thử nghiệm')
    //! kiểm tra validation
    var isValid = true;
    // 1. Kiểm tra tài khoản (check rỗng, không được trùng)
    isValid &= validation.checkEmpty(taiKhoan, 'tbTKNV', 'Tài khoản không được để trống') && validation.checkTaiKhoan(taiKhoan, 'tbTKNV', 'Tài khoản không được trùng', dsnv.mangNV) && validation.checkFormatTaiKhoan(taiKhoan, 'tbTKNV', 'Tài khoản phải chứa 4-6 ký số');

    // 2. Kiểm tra tên nhân viên (check rỗng, đúng định dạng )
    isValid &= validation.checkEmpty(hoTen, 'tbTen', 'Tên nhân viên không được để trống') && validation.checkName(hoTen, 'tbTen', 'Tên NV chỉ được chứa ký tự chữ');

    // 3. Kiểm tra email (check rỗng, đúng định dạng)
    isValid &= validation.checkEmpty(email, 'tbEmail', 'Email không được để trống') && validation.checkEmail(email, 'tbEmail', 'Email chưa đúng định dạng');

    // 4. Kiểm tra password (check rỗng, check format email: 6-10 ký tự)
    isValid &= validation.checkEmpty(password, 'tbMatKhau', 'Password không được để trống') && validation.checkPass(password, 'tbMatKhau', 'Password cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6-10 ký tự');

    // 5. Kiểm tra lương cơ bản (check rỗng, check từ 1 triệu đến 20 triệu)
    isValid &= validation.checkEmpty(luongCoBan, 'tbLuongCB', 'Lương không được để trống') && validation.checkLuongCoBan(luongCoBan, 'tbLuongCB', 'Lương cơ bản từ 1 triệu đến 20 triệu');

    // 6. Kiểm tra chức vụ
    isValid &= validation.checkDropdown('chucvu', 'tbChucVu', 'Chức vụ chưa được chọn');

    // 7. Kiểm tra số giờ làm (check rỗng, check từ 1 triệu đến 20 triệu)
    isValid &= validation.checkEmpty(gioLam, 'tbGiolam', 'Lương không được để trống') && validation.checkSoGioLam(gioLam, 'tbGiolam', 'Số giờ làm từ 80 đến 200 giờ một tháng');

    //8. Kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngayLam, 'tbNgay', 'Ngày làm không được để trống')

    if (isValid) {
        // tạo thể hiện nhân viên
        var nv = new NhanVien(taiKhoan, hoTen, email, password, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhLuong();
        console.log(nv.tongLuong)
        nv.xepLoai()
        console.log(nv.loaiNhanVien)
        dsnv.themNV(nv);
        hienThiDanhSach(dsnv.mangNV);
        setLocalStorage();
        resetForm();
    }
}

function hienThiDanhSach(mangNV) {
    var content = '';
    mangNV.map(function (nv) {
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                <button class="btn btn-info" onclick="xemChiTiet('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal" onclick="resetForm()")">Xem</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
            </tr>
        `;
    })
    console.log(content);
    getELE('tableDanhSach').innerHTML = content;
}

function setLocalStorage() {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem('DSNV') != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem('DSNV'));
    }

    hienThiDanhSach(dsnv.mangNV);
}

getLocalStorage();

// Xóa nhân viên
function xoaNhanVien(ma) {
    // console.log(ma);
    dsnv.xoaNV(ma);
    hienThiDanhSach(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

function xemChiTiet(ma) {
    console.log(ma);
    var viTri = dsnv.timViTri(ma);
    console.log(viTri);
    if (viTri > -1) {
        // tìm thấy
        var nvTim = dsnv.mangNV[viTri];
        getELE('tknv').value = nvTim.taiKhoan;
        getELE('tknv').disabled = true;
        getELE('name').value = nvTim.hoTen;
        getELE('email').value = nvTim.email;
        getELE('password').value = nvTim.password;
        getELE('datepicker').value = nvTim.ngayLam;
        getELE('luongCB').value = nvTim.luongCoBan;
        getELE('chucvu').value = nvTim.chucVu;
        getELE('gioLam').value = nvTim.gioLam;
    }

    var spanThongBao = document.getElementsByClassName('sp-thongbao');
    for (var i of spanThongBao) {
        i.innerHTML = '';
    }
}

function capNhatNhanVien() {
    var taiKhoan = getELE('tknv').value;
    var hoTen = getELE('name').value;
    var email = getELE('email').value;
    var password = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    //! kiểm tra validation
    var isValid = true;

   
    isValid &= validation.checkEmpty(hoTen, 'tbTen', 'Tên nhân viên không được để trống') && validation.checkName(hoTen, 'tbTen', 'Tên NV chỉ được chứa ký tự chữ');

   
    isValid &= validation.checkEmpty(email, 'tbEmail', 'Email không được để trống') && validation.checkEmail(email, 'tbEmail', 'Email chưa đúng định dạng');


    isValid &= validation.checkEmpty(password, 'tbMatKhau', 'Password không được để trống') && validation.checkPass(password, 'tbMatKhau', 'Password cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6-10 ký tự');

    isValid &= validation.checkEmpty(luongCoBan, 'tbLuongCB', 'Lương không được để trống') && validation.checkLuongCoBan(luongCoBan, 'tbLuongCB', 'Lương cơ bản từ 1 triệu đến 20 triệu');


    isValid &= validation.checkDropdown('chucvu', 'tbChucVu', 'Chức vụ chưa được chọn');


    isValid &= validation.checkEmpty(gioLam, 'tbGiolam', 'Lương không được để trống') && validation.checkSoGioLam(gioLam, 'tbGiolam', 'Số giờ làm từ 80 đến 200 giờ một tháng');


    isValid &= validation.checkEmpty(ngayLam, 'tbNgay', 'Ngày làm không được để trống');


    if (isValid) {   // tạo thể hiện nhân viên
        var nv = new NhanVien(taiKhoan, hoTen, email, password, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhLuong();
        nv.xepLoai()
        dsnv.capNhatNV(nv);
        hienThiDanhSach(dsnv.mangNV);
        setLocalStorage();
        resetForm();
    }

}

// Hàm reset
function resetForm() {
    getELE('formQLNV').reset();
    getELE('tknv').disabled = false;
    var spanThongBao = document.getElementsByClassName('sp-thongbao');
    for (var i of spanThongBao) {
        i.innerHTML = '';
    }

}


// hàm tìm kiếm
function timKiemTheoLoai() {
    var tuKhoa = getELE('searchName').value;
    var mangTK = dsnv.timKiem(tuKhoa.trim());

    hienThiDanhSach(mangTK);
}

getELE('searchName').onkeyup = timKiemTheoLoai;
