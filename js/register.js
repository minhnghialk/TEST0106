function uuid() {
    return (new Date().getMilliseconds() + Math.floor(Math.random() * 999999999));
}

let massage = "";
function showSnackbar(message) {
    let x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(
        function() {
        x.className = x.className.replace("show", "");
    }, 3000
    );
};
// showSnackbar("Hãy nhập đầy đủ thông tin");

// function myFunction() {
//     var x = document.getElementById("snackbar");
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
//   }
//   myFunction();

//   function showSnackbar() {
//     let x = document.getElementById("snackbar");
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
//   }
//   showSnackbar();

function register(e) {
    e.preventDefault();
    let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
    let valueEmail = document.getElementById("email").value;
    let valuePassword = document.getElementById("password").value;
    let valueConfirmPassword = document.getElementById("confirmPassword").value;

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
        );
    }

    // let checkEmail = isEmail(valueEmail);
    // if (checkEmail == false) {
    //     console.log("Email chưa đúng định dạng");
    // }

    if (valueEmail == "" || valuePassword == "" || valueConfirmPassword == "") {
        console.log("Vui lòng nhập đầy đủ thông tin");
        showSnackbar("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    for (let i = 0; i < listUsers.length; i++) {
        if (valueEmail == listUsers[i].email) {
            console.log("Email đã tồn tại");
            showSnackbar("Email đã tồn tại");
            return;
        }
        if (valuePassword != valueConfirmPassword) {
            showSnackbar("Mật khẩu không khớp");
            return;
        }
        else {
            showSnackbar("Đăng ký thành công");
        }
    }
    let detailUser = {
        email: valueEmail,
        password: valuePassword,
        idUser: uuid(),
        cartUser: [],
    };
    listUsers.push(detailUser);
    localStorage.setItem("listUsers", JSON.stringify(listUsers));
    window.location.href = "../html/login.html"

}



