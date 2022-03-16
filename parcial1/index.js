const URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
const getData = async () => {
  const response = await fetch(URL, {
    method: "GET",
  });
  return response.json();
};

let data;

getData().then((response) => {
  data = response;
  render();
});

cart = {};

let selectedOption = "Burguers";

// Renderizar la pagina a partir de data
render = () => {
  let mainDiv = document.getElementById("mainOptionDiv");
  mainDiv.innerHTML = "";
  let optionTitle = document.getElementsByClassName("mainOptionMenu")[0];
  optionTitle.innerHTML = selectedOption.toUpperCase();
  data
    .find((option) => option.name === selectedOption)
    .products.forEach((item) => {
      mainDiv.innerHTML += `<div class='col-12 col-md-3 mb-3 d-flex  justify-content-center'> \
    <div class='card menuItems text-center'>\
      <img src='${item.image}' class='card-img-top optionPhoto mx-auto mt-3 mb-1' alt=''  />\
      <div class='card-body d-flex align-items-center flex-column'>\
        <h5 class='card-title'>${item.name}</h5>\
        <div>\
          <p class='card-text description text-left'>\
            ${item.description}\
          </p>\
          <p class='card-text price text-left'>\
            $${item.price}\
          </p>\
        </div>\
        <button class='btn addToCart mt-auto' onclick="addItem('${item.name}', '${item.price}')">Add to cart</button>\
      </div>\
    </div>\
  </div>`;
    });
};

let itemCant = 0;

addItem = (name, price) => {
  let cantCarr = document.getElementById("cantCarr");
  cantCarr.innerHTML = `${++itemCant} Items`;
  cantCarr.style.color = "black";
  cart[name] = {
    price: price,
    cant: cart[name] ? cart[name].cant + 1 : 1,
  };
};

renderOption = (option) => {
  if (option != selectedOption) {
    let selectedA = document.getElementById(option);
    selectedA.classList.add("active");

    let oldSelected = document.getElementById(selectedOption);
    oldSelected.classList.remove("active");

    selectedOption = option;

    render();
  }
};

renderCart = () => {
  let mainDiv = document.getElementById("mainOptionDiv");
  mainDiv.innerHTML = "";
  let optionTitle = document.getElementsByClassName("mainOptionMenu")[0];
  optionTitle.innerHTML = "ORDER DETAIL";
  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  table.classList.add("table-borderless");

  let cont = 1;

  let thead = document.createElement("thead");
  let tr = document.createElement("tr");

  let thNum = document.createElement("th");
  thNum.innerHTML = "Item";
  tr.appendChild(thNum);

  let thQuant = document.createElement("th");
  thQuant.innerHTML = "Qty.";
  tr.appendChild(thQuant);

  let thDesc = document.createElement("th");
  thDesc.innerHTML = "Description";
  tr.appendChild(thDesc);

  let thUnitPrice = document.createElement("th");
  thUnitPrice.innerHTML = "Unit Price";
  tr.appendChild(thUnitPrice);

  let thAmount = document.createElement("th");
  thAmount.innerHTML = "Amount";
  tr.appendChild(thAmount);

  let thMod = document.createElement("th");
  thMod.innerHTML = "Modify";
  tr.appendChild(thMod);

  thead.appendChild(tr);
  table.appendChild(thead);

  let divFinal = document.createElement("div");
  divFinal.classList.add("row", "w-100");

  let totalDiv = document.createElement("div");
  totalDiv.classList.add(
    "col",
    "justify-content-start",
    "d-flex",
    "pl-5",
    "pb-5",
  );
  totalDiv.classList.add("totalDiv");
  totalDiv.innerHTML = `<h5 >Total: $${getTotal()}</h5>`;

  divFinal.appendChild(totalDiv);

  let divBtnCheckout = document.createElement("div");
  divBtnCheckout.classList.add(
    "col-12",
    "col-md-4",
    "p-0",
    "justify-content-center",
    "d-flex",
  );
  let btnCheckout = document.createElement("button");
  btnCheckout.classList.add("btnOrder", "btnCheckout");
  btnCheckout.innerHTML = "Confirm order";
  btnCheckout.onclick = () => {
    console.log(cart);
  };

  let btnCancel = document.createElement("button");
  btnCancel.classList.add("btnOrder", "btnCancel");
  btnCancel.setAttribute("data-toggle", "modal");
  btnCancel.setAttribute("data-target", "#exampleModalCenter");
  //btnCancel.setAttribute("data-backdrop", "false");
  btnCancel.innerHTML = "Cancel";

  divBtnCheckout.appendChild(btnCancel);
  divBtnCheckout.appendChild(btnCheckout);

  divFinal.appendChild(divBtnCheckout);

  mainDiv.appendChild(table);
  mainDiv.appendChild(divFinal);

  let tbody = document.createElement("tbody");
  for (let item in cart) {
    let tr = document.createElement("tr");

    let tdNum = document.createElement("td");
    tdNum.innerHTML = cont++;
    tr.appendChild(tdNum);

    let tdQuant = document.createElement("td");
    tdQuant.innerHTML = cart[item].cant;
    tr.appendChild(tdQuant);

    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = item;
    tr.appendChild(tdDesc);

    let tdUnitPrice = document.createElement("td");
    tdUnitPrice.innerHTML = cart[item].price;
    tr.appendChild(tdUnitPrice);

    let tdAmount = document.createElement("td");
    tdAmount.innerHTML = cart[item].cant * cart[item].price;
    tr.appendChild(tdAmount);

    let tdMod = document.createElement("td");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btnModify");
    btn.innerHTML = "-";
    btn.onclick = () => {
      deleteItem(item);
      renderCart();
    };
    let btnAdd = document.createElement("button");
    btnAdd.classList.add("btn");
    btnAdd.classList.add("btnModify");
    btnAdd.innerHTML = "+";
    btnAdd.onclick = () => {
      addItem(item, cart[item].price);
      renderCart();
    };

    let buttonRow = document.createElement("div");
    buttonRow.classList.add("d-flex", "justify-content-start");
    buttonRow.appendChild(btnAdd);
    buttonRow.appendChild(btn);

    tdMod.appendChild(buttonRow);

    tr.appendChild(tdMod);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
};

deleteItem = (item) => {
  cart[item].cant--;
  if (cart[item].cant === 0) {
    delete cart[item];
  }
  let cantCarr = document.getElementById("cantCarr");
  cantCarr.innerHTML = `${--itemCant} Items`;
};

getTotal = () => {
  let total = 0;
  for (let item in cart) {
    total += cart[item].cant * cart[item].price;
  }
  return total.toFixed(2);
};

cancelOrder = () => {
  cart = {};
  itemCant = 0;
  renderCart();
};
