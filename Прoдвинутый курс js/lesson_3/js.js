"use strict";

const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// КОРЗИНА
class Cart {
  constructor(container = ".cart-items") {
    this.container = container;
    this.items = [];
    this.handler();
  }

  _getProduct() {
    return fetch(`${API}/getBasket.json`)
      .then((data) => data.json())
      .catch((error) => {
        console.log(error);
      });
  }

  addItem(item) {
    for (let el of this.items) {
      if (el.name === item.name) {
        el.quantity += 1;
        return;
      }
    }
    this.items.push(item);
    console.log(this.items);
  }

  render() {
    let html = "";
    this.items.forEach((item) => {
      html += item.render();
    });

    document.querySelector(this.container).innerHTML = html;
  }

  handler() {
    let cartButton = document.querySelector(".cart-button");
    cartButton.addEventListener("click", () => {
      let cartList = document.querySelector(".cart-items");
      if (cartList.style.display === "") {
        cartList.style.display = "block";
      } else {
        cartList.style.display = "";
      }
      console.log(cartList.style.display);
    });
  }
}

class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }

  render() {
    return `<div class= "goods-item">
                <div class = "img">
                  <img class="goods-img" src="#" alt="">
                </div>
                <div class = "descr" id="${this.id}">
                  <h3 class = "goods-title">${this.title}</h3>
                  <h3 class = "goods-price">$${this.price}</h3>
                </div>
                <button class="goods-button" type="button" id="${this.id}" >Добавить</button>
            </div>`;
  }
}

const cart = new Cart();

class GoodsList {
  constructor(container = ".goods-list") {
    this.container = container;
    this.goods = []; // массив товаров из JSON документа
  }

  fetchGoods() {
    return this._getProduct().then((data) => {
      this.goods = data; // data объект js
      this.render();
      this.addEventBtn();
    });
  }

  _getProduct() {
    return fetch(`${API}/catalogData.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(this.container).innerHTML = listHtml;
  }

  addEventBtn() {
    let btnsAdd = document.querySelectorAll(".goods-button");
    btnsAdd.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        let name = "";
        let price = "";
        let div = event.target.parentNode.children;
        console.log(div);
        for (let children of div) {
          if (children.classList.contains("descr")) {
            let title = children.querySelector(".goods-title");
            let goodPrice = children.querySelector(".goods-price");
            if (title) {
              name = title.innerHTML;
            }
            if (goodPrice) {
              price = goodPrice.innerHTML;
            }
          }
        }
        if (!name || !price) {
          return;
        }
        let cartItem = new CartItem(name, price);
        console.log(cartItem);
        cart.addItem(cartItem);
        cart.render();
      });
    });
  }

  totalPrice() {
    let sum = 0;
    this.goods.forEach((good) => {
      sum += good.price;
    });
    return sum;
  }
}

const list = new GoodsList();

list.fetchGoods().then(() => {
  console.log(list.totalPrice());
});

class CartItem {
  constructor(name, price, quantity = 1) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  render() {
    return `<div class = "cart-items-descr">
                <h3 class = "cart-items-title">${this.name}</h3>
                <p class = "cart-items-count">${this.quantity} шт.</p>
                <h3 class = "cart-items-price">${this.price}</h3>
            </div> <hr> `;
  }
}
