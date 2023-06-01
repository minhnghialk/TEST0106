// let listOfAllProducts = [
//     {
//         src: "/image/VersaceEros.jpg",
//         name: "Versace Eros",
//         price: 2500000,
//     }, 

//     {
//         src: "/image/DiorSauvage.jpg",
//         name: "Dior Sauvage",
//         price: 2750000,
//     },

//     {
//         src: "/image/JuicyCouture.jpg",
//         name: "Juicy Couture",
//         price: 2000000,
//     },

//     {
//         src: "/image/ChanelCoco.png.webp",  
//         name: "Chanel Coco",
//         price: 3400000,
//     },

//     {
//         src: "/image/HermèsTerreDHermèsEauTresEDT.jpg",
//         name: "Hermès Terre D Hermès Eau Tres EDT",
//         price: 3050000,
//     }, 

//     {
//         src: "/image/ArmafClubDeNuitIntenseForMan.jpg",
//         name: "Armaf Club De Nuit Intense For Man",
//         price: 1800000,
//     },

//     {
//         src: "/image/ArmafClubDeNuitEDPForWoman.jpeg",
//         name: "Armaf Club De Nuit EDP For Woman",
//         price: 2800000,
//     },

//     {
//         src: "/image/LouisVuittonLVLImmensiteEDP.jpg",
//         name: "Louis Vuitton LV L Immensite EDP",
//         price: 8000000,
//     },

//     {
//         src: "/image/ParfumsDeMarlyHerodForMenEDP.jpg",
//         name: "Parfums De Marly Herod For Men EDP", 
//         price: 4800000,
//     },

//     {
//         src: "/image/FredericMalleGeraniumPourMonsieurEDP.jpg",
//         name: "Frederic Malle Geranium Pour Monsieur EDP",
//         price: 5370000,
//     },

//     {
//         src: "/image/PacoRabannePhantomEDT.jpg",
//         name: "Paco Rabanne Phantom EDT",
//         price: 3300000,
//     },

//     {
//         src: "/image/ValentinoDonnaForWomen.jpg",
//         name: "Valentino Donna For Women",
//         price: 3200000,
//     },
// ];

function renderListProducts() {
  let listOfAllProducts = JSON.parse(localStorage.getItem("listOfAllProducts"));
    let result = "";
    for (let i = 0; i < listOfAllProducts.length; i++) {
      result += ` <div class="card">
      <div class="card-img">
        <img
          src=
          ${listOfAllProducts[i].src}
          alt=""
        />
      </div>

      <div class="card-title">
        <h3>${listOfAllProducts[i].name}</h3>
        <p>Eau de Parfum</p>
      </div>

      <div class="card-details">
        <div class="price">
          <span>Price</span>
          <p>${listOfAllProducts[i].price}</p>
        </div>

        <div class="volume">
          <span>Item Volume</span>
          <p>100ml</p>
        </div>
      </div>

      <button onclick="addToCart(${listOfAllProducts[i].id})" > Add To Cart </button>
    </div>`
    }
    document.getElementById("listproducts").innerHTML = result;
}
renderListProducts();

function uuid() {
    return (new Date().getMilliseconds() + Math.floor(Math.random() * 999999999));
}
for (let i = 0; i < listOfAllProducts.length; i++) {
  listOfAllProducts[i].id = uuid();
  listOfAllProducts[i].quantity = 0;
}
console.log(listOfAllProducts);


function checkLogout() {
  let confirmLogout = confirm ("Bạn có muốn thoát không?");
  if (confirmLogout) {
    localStorage.removeItem("checkLogin");
    document.getElementsByClassName("logout")[0].style.display = "none";
    document.getElementById("totalCountProducts").innerHTML = 0;
  }
}

function checkLogin() {
  let getIsLogin = localStorage.getItem("checkLogin");
  if (getIsLogin == null) {
    return false;
  }
  else {
    return true;
  }
}
let listProducts = JSON.parse(localStorage.getItem("listOfAllProducts"));

if (checkLogin()) {
  document.getElementsByClassName("logout")[0].style.display = "block";
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

let massage1 = "";
function showSnackbarAfter(message1) {
    let y = document.getElementById("snackbar-1");
    y.innerHTML = message1;
    y.className = "show1";
    message = "";
    setTimeout(
        function() {
        y.className = y.className.replace("show1", "");
    }, 3000
    );
};

function addToCart(idProduct) {
  console.log("id của từng sản phẩm khi click vào 'add to cart' ",idProduct);
  if (idProduct == undefined) {
    return;
  }
  let checkIsLogin = localStorage.getItem("checkLogin");
  if (checkIsLogin == null) {
    showSnackbar("Bạn chưa đăng nhập, không thể mua hàng!");
    return;
  }
  else{
    showSnackbar("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
  }
  let listOfAllProducts = JSON.parse(localStorage.getItem("listOfAllProducts"));
  let listUsers = JSON.parse(localStorage.getItem("listUsers"));
  for (let i = 0; i < listUsers.length; i++) {
    if (checkIsLogin == listUsers[i].idUser) {
      
      //lấy giỏ hàng của user
      listUsers[i].cartUser;
     for (let j = 0; j < listOfAllProducts.length; j++) {
      if (listOfAllProducts[j].id == idProduct) {
        console.log(listOfAllProducts[j].id);
        // tìm thấy thông tin sản phẩm dựa vào id
        // duyệt trong giỏ hàng của user xem đã có trong giỏ hàng hay chưa
        if(listUsers[i].cartUser.length == 0){
          listUsers[i].cartUser.push(listOfAllProducts[j]);
          showSnackbar("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
          localStorage.setItem("listUsers",JSON.stringify(listUsers));
          showCartTotal();
          return;
        }
        let flag = true;
        for (let index = 0; index < listUsers[i].cartUser.length; index++) {
          if (idProduct == listUsers[i].cartUser[index].id) {
            listUsers[i].cartUser[index].quantity = ++listUsers[i].cartUser[index].quantity;
            localStorage.setItem("listUsers",JSON.stringify(listUsers));
            showCartTotal();
            flag = false;
            break;
          }
        }
        console.log(flag);
        if (flag == false) {
          showSnackbarAfter("Bạn đã mua thêm một sản phẩm đã có trong giỏ hàng");
        }
        else {
          listUsers[i].cartUser.push(listOfAllProducts[j]);
          localStorage.setItem("listUsers",JSON.stringify(listUsers));
          showCartTotal();
        }
      }
     }
    }
  }
}
addToCart();
localStorage.setItem("listUsers",JSON.stringify(listUsers));
// hàm hiển thị số lượng mặt hàng trong giỏ hàng
// function showCartItemCount() {
//   console.log("abc");
//   // lấy ra id của user khi đăng nhâp 
//   let idLogin = localStorage.getItem("checkLogin");
//   // lấy ra listUsers
//   let listUsers = JSON.parse(localStorage.getItem("listUsers"));

//   // nếu người dùng chưa đăng nhập thì sẽ hiển thị số lượng sản phẩm là 0
//   if (idLogin == null) {
//     document.getElementById("totalCountProduct").innerHTML = 0;
//   }
//   else {
//     for (let i = 0; i < listUsers.length; i++) {
//       if (idLogin == listUsers[i].idUser) {
//         let totalQuantity = 0;
//         for (let j = 0; j < listUsers[i].cartUser; j++) {
//           totalQuantity += listUsers[i].cartUser[j].quantity;
//         }
//         console.log("totalQuantity", totalQuantity);
//         return totalQuantity;
//       }
//     }
//     return 0;
//   }
// }
// showCartItemCount();

let currentPage = 1; // trang hiện tại
let totalItemPage = 3; // số lượng sản phẩm trên một trang
let start = (currentPage - 1) * totalItemPage;
let end = currentPage * totalItemPage;

function showCurrentPage(page) {
    start = (page -1) * totalItemPage; // vị trí bắt đầu của danh sách sản phẩm trên trang hiện tại
    end = page * totalItemPage; // vị trí kết thúc của danh sách sản phẩm trên trang hiện tại
}
showCurrentPage(currentPage);

function showListPage() {
  let result = "";
  for (let i = 0; i < Math.ceil(12 / totalItemPage); i++) {
    result += ` <li class="item-page" onclick="pageNow(${i})"> ${i + 1} </li> `
  }
  document.getElementById("listPage").innerHTML = result;
  document.getElementsByClassName("item-page")[0].classList.add("active-page");
}
showListPage();

// hàm click vào từng page
function pageNow(pageNow) {
  console.log("pageNow", 1);

  let listItemPage = document.getElementsByClassName("item-page");
  for (let i = 0; i < listItemPage.length; i++) {
    if (i == pageNow) {
      listItemPage[i].classList.add("active-page");
    }
    else {
      listItemPage[i].classList.remove("active-page");
    }
  }
}

// hàm giảm page
function decreasePage() {
  console.log("increasePage", 1);
  currentPage--;
  if (currentPage == Math.ceil(12 / totalItemPage)) {
    currentPage = Math.ceil(12 / totalItemPage) - 1;
  }
  
  let listItemPage = document.getElementsByClassName("item-page");
  console.log("listItemPage", listItemPage);
  for (let i = 0; i < listItemPage.length; i++) {
    if (i == currentPage -1) {
      listItemPage[i].classList.add("active-page");
    }
    else {
      listItemPage[i].classList.remove("active-page");
    }
  }
  console.log("currentPage", currentPage);
  showCurrentPage(currentPage);
  renderListProducts();
}

// hàm tăng page
function increasePage() {
  console.log("increasePage", 1);
  currentPage++;
  if (currentPage == Math.ceil(12 / totalItemPage)) {
    currentPage = Math.ceil(12 / totalItemPage);
  }
  
  let listItemPage = document.getElementsByClassName("item-page");
  console.log("listItemPage", listItemPage);
  for (let i = 0; i < listItemPage.length; i++) {
    if (i == currentPage -1) {
      listItemPage[i].classList.add("active-page");
    }
    else {
      listItemPage[i].classList.remove("active-page");
    }
  }
  console.log("currentPage", currentPage);
  showCurrentPage(currentPage);
  renderListProducts();
}

function countTotalCart() {
    // lấy ra id của user khi đăng nhâp 
    let idLogin = localStorage.getItem("checkLogin");
    // lấy ra listUsers
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    for(let i = 0; i < listUsers.length; i++) {
        console.log("111");
        // lấy ra giỏ hàng của user
        if (idLogin == listUsers[i].idUser) {
            let result = 0;
            for (let j in listUsers[i].cartUser) {
              result += listUsers[i].cartUser[j].quantity + 1;
            }
            return result
        }
        return 0
}
}


function showCartTotal () {
  document.getElementById("totalCountProduct").innerText = countTotalCart();
}
showCartTotal();











