"use strict";

const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

/**
 * Класс корзина товаров
 * @param{string}
 * container - класс в html разметке, куда будем помещать
 * весь список товаров корзины
 */
class Cart {
  constructor(container = ".cart-list") {
    this.container = container;
    this.items = [];
    this.handler();
  }

  /**
   * Ф-ия возвращает объект преобразованный из файла json
   * @return{Obj} - названия товаров и их параметры
   */
  _getProduct() {
    return fetch(`${API}/getBasket.json`)
      .then((data) => data.json())
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Ф-ия добавляет элемпнты в массив или увеличивает количество товара, если такой уже находится в корзине
   * @param{obj} - список товаров, которые уже находятся в корзине
   */
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

  /**Ф-ия, которая вставляет в html разметку весь список товаров корзины
   */
  render() {
    let html = "";
    this.items.forEach((item) => {
      html += item.render();
    });
    document.querySelector(this.container).style.padding = "20px";
    document.querySelector(this.container).innerHTML = html;
  }

  /**Ф-ия, которая добавляет обработчик событий на кнопку с классом .cart-button
   * Событие - появление окна списка товаров корзины при клике на кнопку-козина
   */
  handler() {
    let cartButton = document.querySelector(".cart-button");
    cartButton.addEventListener("click", () => {
      let cartList = document.querySelector(".cart-list");
      if (cartList.style.display === "" && cartList.innerHTML !== "") {
        cartList.style.display = "flex";
      } else {
        cartList.style.display = "";
      }
      console.log(cartList.style.display);
    });
  }

  addEventBtnX() {
    let btnsX = document.querySelectorAll(".cart-items-delet");
    let listItems = document.querySelector(this.container);
    btnsX.forEach((btnX) => {
      btnX.addEventListener("click", (event) => {
        let newArrItems = this.items.filter((item) => {
          item.id !== event.target.parentNode.id;
        });
        this.items = newArrItems;
        this.deletItem(event.target);
        listItems.innerHTML.trim();
        if (listItems.innerHTML.trim() === "") {
          listItems.style.padding = "0";
        }
      });
    });
  }

  deletItem(btnX) {
    let cartItem = btnX.parentNode;
    cartItem.remove();
  }
}

/**
 * Класс - еденица товаров
 * Конструктор принимает параметры
 * @param{string} - title название товара,
 * @param{number} - price цена товара,
 * @param{number} - id номер товара,
 */
class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }

  /**Ф-ия, которая возвращает html разметку одной единицы товара
   * @return{string} - html разметка
   */
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

/**
 * Класс - список товаров
 * Конструктор принимает параметр
 * @param{string} - container название класса блока div, в
 * который будем вставлять все товары
 */
class GoodsList {
  constructor(container = ".goods-list") {
    this.container = container;
    this.goods = []; // массив товаров из JSON документа
  }

  /**
   * Ф-ия записывает объект с товарами в массив,
   * запускает метод render- отрисовка товаров на странице
   * и запускает ф-цию - обработчик событий на кнопку "Добавить в корзину"
   * @return{Obj} - объект с названиями товаров и их параметрами
   */
  fetchGoods() {
    return this._getProduct().then((data) => {
      this.goods = data; // data объект js
      this.render();
      this.addEventBtn();
    });
  }

  /**
   * Ф-ия возвращает объект преобразованный из строки json.
   * , сторку json извлекаем с помощью метода fetch, далее преобразум
   * с помощью метода json в объект
   * @return{Obj} - возвращаем объект
   */
  _getProduct() {
    return fetch(`${API}/catalogData.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  /**Ф-ия, которая вставляет html разметку всех товаров на страницу
   * @return{string} - html разметка
   */
  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      console.log(goodItem);
      listHtml += goodItem.render();
    });

    document.querySelector(this.container).innerHTML = listHtml;
  }

  /**Ф-ия, которая добавляет обработчик событий на кнопку с классом .goods-button
   * Событие - получение название и цены товара при клике на кнопку "Добавить" на
   * карточке товара
   * вызов метода addItem() - увеличение количества единиц товара
   * вызов метода render() - отрисовка корзины товаров
   */
  addEventBtn() {
    let btnsAdd = document.querySelectorAll(".goods-button");
    btnsAdd.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        let name = "";
        let price = "";
        let id = null;
        let div = event.target.parentNode.children;
        console.log(div);
        for (let children of div) {
          if (children.classList.contains("descr")) {
            console.log("товар");
            console.dir(children);
            let title = children.querySelector(".goods-title");
            let goodPrice = children.querySelector(".goods-price");
            let idNumber = children.id;
            console.log(idNumber);
            if (title) {
              name = title.innerHTML;
            }
            if (goodPrice) {
              price = goodPrice.innerHTML;
            }
            if (idNumber) {
              id = idNumber;
              console.log(id);
            }
          }
        }
        if (!name || !price || !id) {
          return;
        }
        let cartItem = new CartItem(name, price, id);
        console.log(cartItem);
        cart.addItem(cartItem);
        cart.render();
        cart.addEventBtnX();
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

/**
 * Класс товар корзины
 * Констпуктор принемает параметры
 * @param{string, number, number}
 * name - имя товара,
 * price - цена товара,
 * quantity - количество товара
 */
class CartItem {
  constructor(name, price, id, quantity = 1) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.quantity = quantity;
  }

  /**
   * Ф-ия создает разметку html товара корзины
   * @return{String} - html разметка еденицы товара в корзине
   */
  render() {
    return `<div class= "cart-items" id = "${this.id}">  
                <img class="cart-items-img" src="#" alt="">
                <div class="cart-items-descr">
                    <h3 class = "cart-items-title">${this.name}</h3>
                    <h3 class = "cart-items-price">${this.price}</h3>
                    <input class = "cart-items-count" value ="${this.quantity}">
                </div>
                <button class= "cart-items-delet">x</button>
          </div>
            `;
  }
}
