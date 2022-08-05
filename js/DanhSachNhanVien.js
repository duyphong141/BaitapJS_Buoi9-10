function DanhSachNhanVien() {
    this.mangNV = [];
    this.themNV = function(nv) {
        this.mangNV.push(nv);
    }


    this.timViTri = function (ma) {
        console.log(ma);
        var viTri = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taiKhoan === ma) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaNV = function (ma) {
        var viTri = this.timViTri(ma);
        console.log(ma, viTri);
        if (viTri > -1) {
            this.mangNV.splice(viTri, 1)
        }
    }

    this.capNhatNV = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri > -1) {
            dsnv.mangNV[viTri] = nv;
        }
    }
}



//? Khai báo phương thức tìm kiếm 

DanhSachNhanVien.prototype.timKiem = function(tuKhoa) {
    var mangTK = [];
    var tuKhoaThuong = tuKhoa.toLowerCase();
    this.mangNV.map(function(nv) {
        var loaiNVThuong = nv.loaiNhanVien.toLowerCase();
        var viTriTK = loaiNVThuong.indexOf(tuKhoaThuong);
        if(viTriTK != -1) {
            mangTK.push(nv);
        }
    });
    
    return mangTK; 
}