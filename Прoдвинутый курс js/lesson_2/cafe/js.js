"use strict";
// * Некая сеть фастфуда предлагает несколько видов гамбургеров:
// a. Маленький (50 рублей, 20 калорий).
// b. Большой (100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// a. С сыром (+10 рублей, +20 калорий).
// b. С салатом (+20 рублей, +5 калорий).
// © geekbrains.ru 7
// c. С картофелем (+15 рублей, +10 калорий).
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить
// майонезом (+20 рублей, +5 калорий).
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно
// использовать примерную архитектуру класса со следующей страницы, но можно использовать
// и свою.

class Humburger {
  constructor(order) {
    this.size = order.size;
    this.stuffing = order.stuffing;
    this.toppings = order.topping;
    this.price = 0;
    this.caloric = 0;
  }
  /**
   * Ф-ия, которая получает итоговую стоимость и калорийность бургера
   */
  getPrice() {
    this.sizePrice(this.size);
    this.stuffingPrice(this.stuffing);
    this.toppingsPrice(this.toppings);
  }

  /**
   * Ф-ия, которая получает стоимость и калорийность бургера исходя из его размера,
   * @param{String} - размер бургера, обязательный параметр
   */
  sizePrice(size) {
    switch (size) {
      case "big":
        this.price += 100;
        this.caloric += 40;
        break;
      case "small":
        this.price += 50;
        this.caloric += 20;
        break;
    }
  }

  /**
   * Ф-ия, которая получает стоимость бургера и калорийность, исходя из его начинки,
   * @param{String} - начинка бургера, обязательный параметр
   */
  stuffingPrice(stuffing) {
    if (stuffing === "chees") {
      this.price += 10;
      this.caloric += 20;
    } else if (stuffing === "salad") {
      this.price += 20;
      this.caloric += 5;
    } else if (stuffing === "potato") {
      this.price += 15;
      this.caloric += 10;
    }
  }

  /**
   * Ф-ия, которая получает стоимость и калорийность бургера при добавлении дополнительных ингредиентов,
   * @param{String} - начинка бургера, обязательный параметр
   */
  toppingsPrice(toppings) {
    toppings.forEach((topping) => {
      switch (topping) {
        case "condiment":
          this.price += 15;
          break;
        case "mayonnaise":
          this.price += 20;
          this.caloric += 5;
          break;
      }
    });
  }
}

class Order {
  constructor() {
    this.burgerOrder = {
      size: "big",
      stuffing: "chees",
      topping: [],
      price: 0,
      caloric: 0,
    };
  }

  /**
   * Ф-ия, которая устанавливает обработчик события на все input[type='radio'],
   * добавляем размер и начинку в зависимости от выбора пользователя, возможен один из предложенных вариантов
   */
  handlerInputRadio() {
    let inputs = document.querySelectorAll("input[type='radio']");
    console.log(inputs);
    inputs.forEach((input) => {
      input.addEventListener("click", (event) => {
        switch (event.target.name) {
          case "size":
            this.burgerOrder.size = event.target.value;
            break;
          case "stuffing":
            this.burgerOrder.stuffing = event.target.value;
            break;
        }
      });
    });
  }

  /**
   * Ф-ия, которая устанавливает обработчик события на все input[type='checkbox'],
   * бобавляем дополнительные инргедиенты в бургер, в зависимости от выбора пользователя,
   * воможные варианты: добавить все, добавить что-то одно, ничего не добавлять
   */
  handlerInputCheckbox() {
    let inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach((input) => {
      input.addEventListener("click", (event) => {
        if (!event.target.hasAttribute("checked")) {
          event.target.setAttribute("checked", "");
          this.burgerOrder.topping.push(event.target.name);
        } else {
          event.target.removeAttribute("checked");
          this.burgerOrder.topping = this.burgerOrder.topping.filter(
            (top) => top !== event.target.name
          );
        }
      });
    });
  }

  /**
   * Ф-ия, которая устанавливает обработчик события на кнопку "Заказать",
   */
  handlerButtonOrder() {
    let btnOrder = document.querySelector(".order-btn");
    btnOrder.addEventListener("click", () => {
      this.makeOrder();
      this.getResult();
    });
  }
  /**
   * Ф-ия, которая делает заказ,
   */
  makeOrder() {
    const humburger = new Humburger(this.burgerOrder);
    humburger.getPrice();
    this.price = humburger.price;
    this.caloric = humburger.caloric;
  }

  /**
   * Ф-ия, которая находит div в который записываем разметку( информация о стоимости и калорийности бургера),
   */
  getResult() {
    let descOrder = document.querySelector(".desc-order");
    descOrder
      .querySelector(".price")
      .querySelector("span").innerHTML = `${this.price}`;
    descOrder
      .querySelector(".caloric")
      .querySelector("span").innerHTML = `${this.caloric}`;
  }
}

const order = new Order();
order.handlerInputRadio();
order.handlerInputCheckbox();
order.handlerButtonOrder();
