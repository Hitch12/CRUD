const addProductInput = document.getElementById("addProductInput");
const countProductInput = document.getElementById("countProductInput");
const priceInput = document.getElementById("priceInput");
const totalPriceInput = document.getElementById("totalPriceInput");
const categoryInput = document.getElementById("categoryInput");
const btnAddProduct = document.getElementById("btnAddProduct");
const updateProduct = document.getElementById("updateProduct");
const searchInput = document.getElementById("searchInput");
let btnUpdate = Array.from(document.querySelectorAll("#btnUpdate"));
let btnDelete = Array.from(document.querySelectorAll("#btnDelete"));
let idSelect = -1;
let mood = "can delete";
let productList = [];

//if there is data in localStorage
if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  display();
  btnDelete = Array.from(document.querySelectorAll("#btnDelete"));
  btnUpdate = Array.from(document.querySelectorAll("#btnUpdate"));
}

//---------------------------- calc total --------------------------------

function getTotalPrice() {
  let totalPrice = countProductInput.value * priceInput.value;
  totalPriceInput.value = totalPrice;
  return totalPrice;
}
priceInput.addEventListener("keyup", getTotalPrice);
countProductInput.addEventListener("keyup", getTotalPrice);

//---------------------------- add --------------------------------

function addProduct() {
  if (
    validateProductNameInput() &&
    validateProductCountInput() &&
    validateProductPriceInput() &&
    validateProductCategoryInput()
  ) {
    let newProduct = {
      name: addProductInput.value,
      count: countProductInput.value,
      price: priceInput.value,
      totalPrice: getTotalPrice(),
      category: categoryInput.value,
    };
    productList.push(newProduct);
    localStorage.setItem("productList", JSON.stringify(productList));
    display();
    clearProduct();
  }
  else{
    alert('Validation Error')
  }
}
btnAddProduct.addEventListener("click", addProduct);

//---------------------------- display --------------------------------

function display() {
  let temp = "";
  for (let i = 0; i < productList.length; i++) {
    temp += `
        <tr>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].count}</td>
            <td>${productList[i].totalPrice}</td>
            <td>${productList[i].category}</td>
            <td><button id="btnDelete" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            <td><button id="btnUpdate" onclick="update(${i})" class="btn btn-success">Update</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = temp;

  //delete all
  if (productList.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
    <button class="btn btn-danger w-25 my-2 rounded-5" onclick="deleteAll()">Delete All (${productList.length})</button>
    `;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}

//---------------------------- clear --------------------------------

function clearProduct() {
  addProductInput.value = "";
  priceInput.value = "";
  countProductInput.value = "";
  categoryInput.value = "";
}

//---------------------------- delete --------------------------------

function deleteProduct(index) {
  if (mood === "can delete") {
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    display();
  }
}

//---------------------------- delete all --------------------------------

function deleteAll() {
  if (mood === "can delete") {
    localStorage.clear("productList");
    productList.splice(0);
    display();
  }
}

//---------------------------- update --------------------------------

function update(index) {
  if (
    validateProductNameInput() &&
    validateProductCountInput() &&
    validateProductPriceInput() &&
    validateProductCategoryInput()
  ) {
    addProductInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    countProductInput.value = productList[index].count;
    categoryInput.value = productList[index].category;
    idSelect = index;
    btnAddProduct.classList.replace("d-block", "d-none");
    updateProduct.classList.replace("d-none", "d-block");
    mood = "cannot delete";
    scroll({
      top: 0,
      behavior: "smooth",
    });
  }
  else{
    alert('Validation Error')
  }
}
updateProduct.addEventListener("click", function () {
  productList[idSelect].name = addProductInput.value;
  productList[idSelect].price = priceInput.value;
  productList[idSelect].count = countProductInput.value;
  productList[idSelect].category = categoryInput.value;
  localStorage.setItem("productList", JSON.stringify(productList));
  display();
  btnAddProduct.classList.replace("d-none", "d-block");
  updateProduct.classList.replace("d-block", "d-none");
  mood = "can delete";
  clearProduct();
});

//---------------------------- search --------------------------------

searchInput.addEventListener("keyup", function () {
  let temp = "";
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      temp += `
        <tr>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].count}</td>
          <td>${productList[i].totalPrice}</td>
          <td>${productList[i].category}</td>
          <td><button id="btnDelete" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
          <td><button id="btnUpdate" onclick="update(${i})" class="btn btn-success">Update</button></td>
        </tr>
      `;
    }
  }
  document.getElementById("tbody").innerHTML = temp;
});

//---------------------------- validation functions --------------------------------

function validateProductNameInput() {
  regex = /[a-z0-9A-Z]{1,25}/;
  if (regex.test(addProductInput.value)) {
    return true;
  } else {
    return false;
  }
}
function validateProductCountInput() {
  regex = /[0-9]{1,25}/;
  if (regex.test(countProductInput.value)) {
    return true;
  } else {
    return false;
  }
}
function validateProductPriceInput() {
  regex = /[0-9]{1,8}/;
  if (regex.test(priceInput.value)) {
    return true;
  } else {
    return false;
  }
}
function validateProductCategoryInput() {
  regex = /[a-z0-9A-Z]{1,25}/;
  if (regex.test(categoryInput.value)) {
    return true;
  } else {
    return false;
  }
}
