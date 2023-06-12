'use strict';

let links = document.querySelectorAll('.nav-link');
let div = document.querySelector('.text');

links.forEach(function(link) {
    link.addEventListener('click', clickHandler);
});

const texts = {
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
    text3: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил.'
};

/* 
1. Получите ссылку на .text, например с помощью querySelector
2. Получите коллекцию, в которой хранятся все .nav-link, например с помощью querySelectorAll
    2.1 Переберите полученную коллекцию, например с помощью forEach, и каждой ссылке назначьте
    обработчик клика функцию clickHandler.
*/


/**
 * Обработчик клика по .nav-link
 * @param {MouseEvent} event 
 */
function clickHandler(event) {

    changeActiveClass(event);
    changeText(event);

    // console.dir(event.target);
    // здесь вызывайте changeText и changeActiveClass, и передавайте
    // им объект события.
   
}

/**
 * Эта функция должна убирать .active у предыдущего .nav-link и ставить его
 * на тот, по которому кликнули.
 * @param {MouseEvent} event 
 */
function changeActiveClass(event) {

    links.forEach(function(link) {
        link.classList.remove('active');
    });

    event.target.classList.add('active');
}

/**
 * Эта фукнция должна читать текст (например через textContent) из 
 * .nav-link по которому кликнули и в зависимости от этого в .text
 * ставить соответствующий текст из texts.
 * @param {MouseEvent} event 
 */
function changeText(event) {

    let text = null;
    let textLink = null;
     
    textLink =  event.target.textContent.match(/\d+/);

    for(let element in texts) {
       text =  element.match(/\d+/);
       console.log(text[0]);
       console.log(textLink[0]);
        
        if(text[0] === textLink[0]) {
            div.innerText = texts[element];
        }
    }  
}
