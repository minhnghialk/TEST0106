const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
});

let massage = "";
function showSnackbar(message) {
    let x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show"; 
    setTimeout(
        function() {
        x.className = x.className.replace("show", "");
    }, 5000
    );
};

// hàm hiện giỏ hàng
function showCartUser() {
    // lấy ra id của user khi đăng nhâp 
    let idLogin = localStorage.getItem("checkLogin");
    // lấy ra listUsers
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    for(let i = 0; i < listUsers.length; i++) {
        console.log("111");
        // lấy ra giỏ hàng của user
        if (idLogin == listUsers[i].idUser) {
            console.log(listUsers[i].cartUser);

            // lấy tất cả id của sản phẩm
            let allIdProduct = [];
            for (j = 0; j < listUsers[i].cartUser.length; j++) {
                allIdProduct.push(listUsers[i].cartUser[j].id);
            }
            console.log("Id của tất cả sản phẩm đã 'add to cart'",allIdProduct);

            // lọc tất cả những id này không cho nó trùng nhau
            let FilterIdDuplicate = [...new Set (allIdProduct)];
            let resultFilter = [];
            for (k = 0; k < FilterIdDuplicate.length; k++) {
                for (let m = 0; m < listUsers[i].cartUser.length; m++) {
                    if (FilterIdDuplicate[k] == listUsers[i].cartUser[m].id) {
                        resultFilter.push(listUsers[i].cartUser[m]);
                        break;
                    }
                }
            }
            // kết quả sau khi lọc
            console.log("kết quả sau khi lọc những id không trùng lặp nhau",resultFilter);
            
            // sau khi lọc xong rồi đem đi render
            let result = "";
            for (let n = 0; n < resultFilter.length; n++) {
                for (let l = 0; l < allIdProduct.length; l++) {
                    if (allIdProduct[l] == resultFilter[n].id) {
                        resultFilter[n].quantity = ++resultFilter[n].quantity;
                    }
                }
                result += ` <tr>
                <td>${n + 1}</td>
                <td>
                    <img src=${resultFilter[n].src} alt="">
                </td>
                <td>${resultFilter[n].name}</td>
                <td>${VND.format(resultFilter[n].price)}</td>
                <td >
                <i class="fa-solid fa-minus btn" onclick="decrease(${resultFilter[n].id})"></i>
                <span class="quantity__text">${resultFilter[n].quantity}</span>
                <i class="fa-solid fa-plus btn" onclick="increase(${resultFilter[n].id})"></i>
                </td>
                <td>${VND.format(resultFilter[n].price * resultFilter[n].quantity)}</td>
                <td>
                  <i class="fa-solid fa-trash" onclick="deleteItem(${resultFilter[n].id})"></i>
                </td>
              </tr> `;
            }
            document.getElementById("render").innerHTML = `  <tr>
            <th>STT</th>
            <th>Ảnh sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xoá</th>
          </tr> ${result} `;
          result = "";
        }
    }
}
showCartUser();

// hàm giảm số lượng sản phẩm
function decrease(idProduct) {
    console.log("idProduct", idProduct);

    // lấy ra id của user khi đăng nhâp 
    let idLogin = localStorage.getItem("checkLogin");
    // lấy ra listUsers
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    for (let i = 0; i < listUsers.length; i++) {
        if (idLogin == listUsers[i].idUser) {
            for (let j = 0; j < listUsers[i].cartUser.length; j++) {
                if (idProduct == listUsers[i].cartUser[j].id) {
                    listUsers[i].cartUser[j].quantity = --listUsers[i].cartUser[j].quantity;
                    localStorage.setItem("listUsers", JSON.stringify(listUsers));
                    showCartUser();
                    return;
                }
            }
        }
    }
}

// hàm tăng số lượng sản phẩm
function increase(idProduct) {
    console.log("2", 2);

    // lấy ra id của user khi đăng nhâp 
    let idLogin = localStorage.getItem("checkLogin");
    // lấy ra listUsers
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    // lấy ra giỏ hàng của user
    for (let i = 0; i < listUsers.length; i++) {
        if (idLogin == listUsers[i].idUser) {
            for (let j = 0; j < listUsers[i].cartUser.length; j++) {
                if (idProduct == listUsers[i].cartUser[j].id) {
                    listUsers[i].cartUser[j].quantity = ++listUsers[i].cartUser[j].quantity;
                    localStorage.setItem("listUsers", JSON.stringify(listUsers));
                    showCartUser();
                    return;
                }
            }
        }
    }
}

// hàm xoá sản phẩm
function deleteItem(idProduct) {
    console.log("3", 3);

    // lấy ra id của user khi đăng nhâp 
    let idLogin = localStorage.getItem("checkLogin");
    // lấy ra listUsers
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    for (let i = 0; i < listUsers.length; i++) {
        if (idLogin == listUsers[i].idUser) {
            for (let j = 0; j < listUsers[i].cartUser.length; j++) {
                if (idProduct == listUsers[i].cartUser[j].id) {
                    // xoá sản phẩm khỏi giỏ hàng
                    listUsers[i].cartUser.splice(j, 1);
                    showSnackbar("Xoá sản phẩm khỏi giỏ hàng thành công");
                    break;
                }
            }
            localStorage.setItem("listUsers", JSON.stringify(listUsers));
            showCartUser();
            return;
        }
    }
}



