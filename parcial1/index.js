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
  console.log(data);
  render();
});

let selectedOption = "Burguers";

// Renderizar la pagina a partir de data
render = () => {
  data
    .find((option) => option.name === selectedOption)
    .products.forEach((item) => {
      console.log(item);
      let mainDiv = document.getElementById("mainOptionDiv");
      mainDiv.innerHTML += `<div class='col-3'> \
    <div class='card' style='width: 18rem'>\
      <img src='${item.image}' class='card-img-top' alt='' />\
      <div class='card-body'>\
        <h5 class='card-title'>${item.name}</h5>\
        <p class='card-text'>\
          ${item.description}\
        </p>\
        <p class='card-text'>\
          ${item.price}\
        </p>\
        <a href='#' class='btn addToCart' onclick="addItem()">Add to cart</a>\
      </div>\
    </div>\
  </div>;`;
    });
};

let itemCant = 0;

addItem = () => {
  let cantCarr = document.getElementById("cantCarr");
  cantCarr.innerHTML = `${++itemCant} items`;
};

renderOption = (option) => {
  selectedOption = option;
  render();
};
