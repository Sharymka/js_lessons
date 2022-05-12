"use strict";

class Form {
  constructor(container = "form") {
    this.container = container;
    this.name = "";
    this.phoneNumber = "";
    this.email = "";
    this.handlerValid();
  }

  fillInputs() {
    this.setName();
    this.setPhoneNumber();
    this.setEmail();
  }

  setName() {
    let name = document.getElementById("get-name");
    this.name = name.value;
  }

  setPhoneNumber() {
    let number = document.getElementById("get-number");
    this.phoneNumber = number.value;
  }

  setEmail() {
    let email = document.getElementById("get-email");
    this.email = email.value;
  }

  handlerValid() {
    let form = document.querySelector(this.container);
    console.log(form);
    form.addEventListener("submit", (event) => {
      this.clean();
      this.fillInputs();

      if (!this.isValidName()) {
        event.preventDefault();
        let errorDiv = document.querySelector(".errorName");
        errorDiv.innerHTML = "Имя должно содержать только буквы!";

        let input = document.getElementById("get-name");
        input.classList.add("errorFrame");
      }
      if (!this.isValidPhone()) {
        event.preventDefault();
        let errorDiv = document.querySelector(".errorNumber");
        errorDiv.innerHTML = "+7(000)000-0000!";

        let input = document.getElementById("get-number");
        input.classList.add("errorFrame");
      }
      if (!this.isValidEmail()) {
        event.preventDefault();
        let errorDiv = document.querySelector(".errorEmail");
        errorDiv.innerHTML =
          "mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru";

        let input = document.getElementById("get-email");
        input.classList.add("errorFrame");
      }
    });
  }

  clean() {
    let inputs = document.querySelectorAll(".errorFrame");
    inputs.forEach((input) => {
      input.classList.remove("errorFrame");
    });
    let errorDivs = document.querySelectorAll(".error");
    errorDivs.forEach((errorDiv) => {
      errorDiv.innerHTML = "";
    });
  }

  isValidName() {
    let regexp = /^[a-z\s]+$/i;
    return regexp.test(this.name);
  }

  isValidPhone() {
    let regexp = /^\+7\(\d{3}\)\d{3}-\d{4}$/g;
    return regexp.test(this.phoneNumber);
  }

  isValidEmail() {
    let regexp = /^[a-z]{2}[\.|-]?[a-z]{4}\@[a-z]+\.[a-z]{2,}$/gi;
    return regexp.test(this.email);
  }
}

const form = new Form();
