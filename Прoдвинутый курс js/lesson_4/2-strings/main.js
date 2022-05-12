"use strict";

class Text {
  constructor(container = ".result") {
    this.container = container;
    this.text = "";
    this.handlerBtn1();
    this.handlerBtn2();
  }

  getText() {
    let par = document.querySelector(".paragraph").innerHTML;
    this.text = par;
  }

  handlerBtn1() {
    let btn = document.querySelector(".change1");
    btn.addEventListener("click", () => {
      this.render(this.filter1(this.text));
    });
  }

  handlerBtn2() {
    let btn = document.querySelector(".change2");
    btn.addEventListener("click", () => {
      this.render(this.filter2(this.text));
    });
  }

  filter1(text) {
    let regexp = new RegExp("'", "g");
    return text.replace(regexp, '"');
  }

  filter2(text) {
    let regexp1 = new RegExp("&nbsp;'", "g");
    let regexp2 = new RegExp("'<br>", "g");
    let text1 = text.replace(regexp1, '&nbsp;"');
    return text1.replace(regexp2, '"<br>');
  }

  render(newText) {
    document.querySelector(this.container).innerHTML = newText;
  }
}

const textObj = new Text();
textObj.getText();
