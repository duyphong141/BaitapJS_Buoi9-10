function Validation() {
    this.checkEmpty = function (inputVal, spanID, message) {

        if (inputVal.trim() != '') {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = 'none';
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;
    };

    this.checkTaiKhoan = function (inputVal, spanID, message, mangNV) {
        var isExist = false;

        isExist = mangNV.some(function (nv) {
        
            console.log(inputVal.replaceAll(' ', ''));
            return nv.taiKhoan === inputVal.replaceAll(' ', '');
        })

        if (isExist) {
            // mã bị trùng => dữ liệu không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = 'block';
            return false;
        } else { 
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
    }

    this.checkFormatTaiKhoan = function (inputVal, spanID, message) {
        var pattern = /^[0-9]{4,6}$/;

        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;

    }

    this.checkName = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        if (inputVal.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = '';
            // ẩn thẻ
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;
    }

    this.checkEmail = function (inputVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
        if (inputVal.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = '';
            // ẩn thẻ
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;
    }

    this.checkPass = function (inputVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/ 
        if (inputVal.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = '';
            // ẩn thẻ
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;
    }

    this.checkLuongCoBan = function (inputVal, spanID, message) {
        // var pattern = /^[0-9]$/;
        console.log(inputVal)
        if (inputVal >= 1000000 && inputVal <= 20000000) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;

    }

    this.checkDropdown = function (selectID, spanID, message) {
        var indexOption = document.getElementById(selectID).selectedIndex;
        if (indexOption != 0) {

            //hợp lệ
            document.getElementById(spanID).innerHTML = '';
            // ẩn thẻ
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;
    }

    this.checkSoGioLam = function (inputVal, spanID, message) {

        if (inputVal >= 80 && inputVal <= 200) {
            document.getElementById(spanID).innerHTML = '';
            document.getElementById(spanID).style.display = 'none';
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = 'block';
        return false;

    }


}