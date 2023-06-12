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
    this.cartItems = [];
    this.handlerBtnCart();
  }

  /**Ф-ия, которая добавляет обработчик событий на кнопку с классом .cart-button
   * Событие - появление окна списка товаров корзины при клике на кнопку-козина
   */
  handlerBtnCart() {
    let cartButton = document.querySelector(".cart-button");
    cartButton.addEventListener("click", () => {
      this.fetchCartItems();
      let cartList = document.querySelector(".cart-list");
      cartList.classList.toggle("invisible");
    });
  }

  /**
   * Ф-ия записывает объект с товарами в массив,
   * запускает метод renderCartList- отрисовка листа корзины
   * и запускает ф-цию - обработчик событий на кнопки "Удалить из корзины"
   * @return{Obj} - объект с названиями товаров и их параметрами
   */
  fetchCartItems() {
    return this._getProduct().then((data) => {
      this.cartItems = data.contents; // data объект js
      this.renderCartList();
      this.addEventBtnX();
    });
  }

  /**
   * Ф-ия возвращает результат действия функции fetch (объект), которая извлекает строку json с удаленного сервера
   * и возвращает oбъект Promise, после чего запускается обработчик then
   * параметром которого является анонимная ф-ция, которая вызывает метод json и
   * преобразут нашу строку json в объект
   * @return{Obj} - названия товаров и их параметры
   */
  _getProduct() {
    return fetch(`${API}/getBasket.json`) // fetch-функция извлечь, извлекаем из сервера файл- строку json, возвращает obj Promise
      .then((data) => data.json()) // метод json преобразует строку json в obj
      .catch((error) => {
        console.log(error);
      });
  }

  /**Ф-ия, которая вставляет в html разметку весь список товаров корзины
   пробегается по нашему списку товаров и создает для каждой позиции
   товара объект с параметрами товара, далее у каждого объекта товара
   вызываем метод renderCartItem(), который возвращает разметку html
   с параметрами о данном товаре
  */
  renderCartList() {
    let html = "";
    this.cartItems.forEach((item) => {
      let cartItem = new CartItem(
        item.product_name,
        item.price,
        item.id_product,
        item.quantity
      );
      html += cartItem.renderCartItem();
    });
    document.querySelector(this.container).innerHTML = html;
    console.log("Корзина товаров");
    console.log(this.cartItems);
  }

  /**Ф-ция, которая добавляет обработчик события на все кнопки "X" - удаление товара,
   * при совершении события "click" методом filter  по idубираем товар в нашем массиве корзины товара и
   * вызываем ф-цию deletItem()
   */
  addEventBtnX() {
    let btnsX = document.querySelectorAll(".cart-items-delet");
    let listItems = document.querySelector(this.container);
    btnsX.forEach((btnX) => {
      btnX.addEventListener("click", (event) => {
        let newArrItems = this.cartItems.filter((item) => {
          item.id_product !== event.target.parentNode.id;
        });
        this.carItems = newArrItems;
        this.deletItem(event.target);
        listItems.innerHTML.trim();
        if (listItems.innerHTML.trim() === "") {
          listItems.classList.add("invisible");
        }
      });
    });
  }

  /**Ф-ция, которая удаляет карточку товара (родительский узел) из разметки
   */
  deletItem(btnX) {
    let cartItem = btnX.parentNode;
    cartItem.remove();
  }

  /**Ф-ция, которая отр отрисовывает количество товара в списке товаров корзины на странице пользователя
   * @param{number} - id номер товара
   * @param{number} - count количество товара
   * @param{number} - price цена товара
   */
  renderQuantity(id, count, price) {
    let parent = document.getElementById(`${id}`);
    parent.querySelector(".cart-items-count").value = `${count}`;
    this.getPrice(id, count, price);
  }

  /**Ф-ция, которая считает стоимость выбранного количества одной позиции товара
   * @param{number} - id номер товара
   * @param{number} - count количество товара
   * @param{number} - price цена ед. товара
   */
  getPrice(id, count, price) {
    let parent = document.getElementById(`${id}`);
    let total = count * price;
    parent.querySelector(".cart-items-price").innerHTML = `$${total} `;
  }
}

const cart = new Cart();

/**
 * Класс товар корзины
 * Констпуктор принемает параметры
 * @param{string, number, number}
 * name - имя товара,
 * price - цена товара,
 * quantity - количество товара
 */
class CartItem {
  constructor(name, price, id, quantity) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.quantity = quantity;
  }

  /**
   * Ф-ия создает разметку html товара корзины
   * @return{String} - html разметка еденицы товара в корзине
   */
  renderCartItem() {
    return `<div class= "cart-items" id = "${this.id}">  
                <img class="cart-items-img" src="#" alt="">
                <div class="cart-items-descr">
                    <h3 class = "cart-items-title">${this.name}</h3>
                    <h3 class = "cart-items-price">$${this.price}</h3>
                    <input class = "cart-items-count" value ="${this.quantity}">
                </div>
                <button class= "cart-items-delet">x</button>
          </div>
            `;
  }
}

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
    this.filtered = [];
    this.fetchGoods();
  }

  /**
   * Ф-ия записывает объект с товарами в массив,
   * запускает метод renderGoodsList- отрисовка товаров на странице
   * и запускает ф-цию - обработчик событий на кнопку "Добавить в корзину"
   * @return{Obj} - объект с названиями товаров и их параметрами
   */
  fetchGoods() {
    return this._getProduct().then((data) => {
      this.goods = data; // data объект js
      this.renderGoodsList();
      this.addEventBtn();
      this.handlerSearch();
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
  renderGoodsList() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.renderGood();
    });
    console.log("Список товаров на экране");
    console.log(this.goods);

    document.querySelector(this.container).innerHTML = listHtml;
  }

  /**Ф-ия, которая добавляет обработчик событий на кнопку с классом .goods-button
   * Событие - получение название и цены товара при клике на кнопку "Добавить" на
   * карточке товара
   * вызов метода catchProduct() - ловим товар
   */
  addEventBtn() {
    let btnsAdd = document.querySelectorAll(".goods-button");
    btnsAdd.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        this.catchProduct(event.target);
      });
    });
  }

  /**
   * Ф-ция, которая получает информацию о товаре по переданному target
   * @param {*obj} target - объект кнопки "Добавить" по которой нажали
   */
  catchProduct(target) {
    let name = "";
    let price = "";
    let id = null;
    let children = target.parentNode.children;
    for (let child of children) {
      if (child.classList.contains("descr")) {
        let title = child.querySelector(".goods-title");
        let goodPrice = child.querySelector(".goods-price");
        let idNumber = child.id;
        if (title) {
          name = title.innerHTML;
        }
        if (goodPrice) {
          price = parseInt(
            goodPrice.innerHTML
              .split("")
              .slice(1)
              .map((string) => +string)
              .join("")
          );
        }
        if (idNumber) {
          id = idNumber;
        }
      }
    }
    if (!name || !price || !id) {
      return;
    }
    const eventEl = new EventTarget(name, price, id);
    eventEl.compare();
  }

  handlerSearch() {
    let formSearch = document.querySelector(".menu-search");
    formSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      this.filterProduct(
        formSearch.querySelector(".search-input").value.trim()
      );
    });
  }

  filterProduct(value) {
    let regexp = new RegExp(value, "i");
    this.filtered = this.goods.filter((good) => regexp.test(good.product_name));
    console.log(this.filtered);
    this.goods.forEach((good) => {
      let goodHtml = document.getElementById(`${good.id_product}`);
      if (!this.filtered.includes(good)) {
        goodHtml.parentNode.classList.add("invisible");
      } else {
        goodHtml.parentNode.classList.remove("invisible");
      }
    });
  }
}

/**
 * Класс - единица товаров
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
  renderGood() {
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

const list = new GoodsList();

/**
 * Класс - информация о товаре, который хотим положить в корзину
 * Конструктор принимает параметры
 * @param{string} - name название товара,
 * @param{number} - price цена товара,
 * @param{number} - id номер товара,
 */
class EventTarget {
  constructor(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
  }

  /**
   * Ф-ция, которая сравнивает есть ли такой товар в корзине товаров, если
   * есть увеличиваем количество товара и вызываем
   * метод renderQuantity(), иначе добавляем товар в список корзины и отрисовывваем заново
   */
  compare() {
    cart.cartItems.forEach((cartItem) => {
      if (cartItem.id_product === parseInt(this.id)) {
        let count = cartItem.quantity;
        count += 1;
        cartItem.quantity = count;
        cart.renderQuantity(this.id, count, this.price);
      }
    });
  }
}
