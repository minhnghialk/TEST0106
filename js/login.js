// let message = "";
// function showSnackbar() {
//     let x = document.getElementById("snackbar");
//     x.innerHTML = message;
//     x.className = "show";
//     setTimeout(
//         function() {
//             className = className.replace("show", "");
//         }, 3000
//     );
// };

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

function login(e) {
    e.preventDefault();
    let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
    let valueEmail = document.getElementById("email").value;
    let valuePassword = document.getElementById("password").value;

    for (let i = 0; i < listUsers.length; i++) {
        if (valueEmail == listUsers[i].email && valuePassword == listUsers[i].password) {
            localStorage.setItem("checkLogin", listUsers[i].idUser);
            window.location.href = "../index.html"
        }
        else {
            showSnackbar("Tài khoản hoặc mật khẩu không đúng")
        }
    }
}