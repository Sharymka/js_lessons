"use strict";

class GoodsItem {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `<div class= "goods-item">
                <div class = "img">
                  <img class="goods-img" src="${this.img}" alt="">
                </div>
                <div class = "descr">
                  <h3 class = "goods-title">${this.title}</h3>
                  <h3 class = "goods-price">$${this.price}</h3>
                </div>
                <button class="goods-button" type="button">Добавить</button>
            </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { img: "img/shirt.webp", title: "Shirt", price: 150 },
      { img: "img/sock.webp", title: "Socks", price: 50 },
      { img: "img/jacket.jpeg", title: "Jacket", price: 350 },
      { img: "img/shoes.jpg", title: "Shoes", price: 250 },
    ];
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  totalPrice() {
    let sum = 0;
    this.goods.forEach((good) => {
      sum += this.goods.price;
    });
    return sum;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

class CartItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.count = 1;
  }

  increase() {
    this.count += 1;
  }

  decrease() {
    if (this.count === 1) {
      return;
    }

    this.count -= 1;
  }

  renderHtml() {
    return `
    <div class = "car-item">
      <img class="car-item-img" src="${this.img}" alt="">
        </div>
          <div class = "car-item-descr">
            <h3 class = "car-item-title">${this.name}</h3>
            <p class = "car-item-count">${this.count}</p>
            <h3 class = "car-item-price">$${this.price}</h3>
          </div>
        <div>`;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    const cartItem = new CartItem(item.name, item.price);
    this.items.push(cartItem);
  }

  deleteItem(index) {
    this.items.splice(index);
  }

  clear() {
    this.items = [];
  }

  info() {
    let count = 0;
    let price = 0;

    this.items.forEach((item) => {
      count += item.count;
      price += item.price * item.count;
    });

    return {
      count,
      price,
    };
  }

  renderHtml() {
    const html = this.items
      .map((item) => {
        const itemHtml = item.renderHtml();
        const button = `<button>Удалить</button>`;

        return itemHtml + button;
      })
      .join();

    return `<div>${html}</div>`;
  }
}

const cart = new Cart();
cart.addItem({ name: "test", price: 150 });
cart.addItem({ name: "test2", price: 150 });
cart.addItem({ name: "test3", price: 250 });

console.log(cart.renderHtml());
