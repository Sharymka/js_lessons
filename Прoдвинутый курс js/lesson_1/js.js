const goods = [
  { img: "img/shirt.webp", title: "Shirt", price: 150 },
  { img: "img/sock.webp", title: "Socks", price: 50 },
  { img: "img/jacket.jpeg", title: "Jacket", price: 350 },
  { img: "img/shoes.jpg", title: "Shoes", price: 250 },
];

const renderGoodsItem = (item) => {
  return `<div class= "goods-item">
              <div class = "img">
                <img class="goods-img" src="${item.img}" alt="">
              </div>
              <div class = "descr">
                <h3 class = "goods-title">${item.title}</h3>
                <h3 class = "goods-price">$${item.price}</h3> 
              </div>
              <button class="goods-button" type="button">Добавить</button>         
          </div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map((item) => renderGoodsItem(item));

  // document.querySelector(".goods-list").innerHTML = goodsList;
  // запятые появлялись, так как в разметку вставляли целый массив, элементы которого отделены запятыми.
  // необходимо вставлять каждый элемент массива по очереди

  goodsList.forEach((element) => {
    console.log(element);
    document
      .querySelector(".goods-list")
      .insertAdjacentHTML("beforeend", element);
  });
};

document.querySelector(".goods-list").classList.add("container");
renderGoodsList(goods);
