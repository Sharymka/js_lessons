"use strict";
/* 
Разметка товара:

<div class="product">
    <div>${здесь_название_товара}</div>
    <img src="${здесь путь до картинки}" alt="">
    <div>${здесь_цена}</div>
    <a href="https://example.com/producs/${здесь_id_товара}">Подробнее</a>
</div>
*/

const products = {
    phones: [
        {
            id: 1,
            name: "Смартфон 1",
            price: "23,99 р.",
            imageUrl: "https://picsum.photos/seed/1/200",
        },
        {
            id: 2,
            name: "Смартфон 2",
            price: "11,99 р.",
            imageUrl: "https://picsum.photos/seed/2/200",
        },
        {
            id: 3,
            name: "Смартфон 3",
            price: "22,99 р.",
            imageUrl: "https://picsum.photos/seed/3/200",
        },
    ],

    tablets: [
        {
            id: 4,
            name: "Планшет 4",
            price: "99,99 р.",
            imageUrl: "https://picsum.photos/seed/4/200",
        },
        {
            id: 5,
            name: "Планшет 5",
            price: "44,99 р.",
            imageUrl: "https://picsum.photos/seed/5/200",
        },
    ],

    tv: [
        {
            id: 6,
            name: "Телевизор 6",
            price: "199,99 р.",
            imageUrl: "https://picsum.photos/seed/6/200",
        },
        {
            id: 7,
            name: "Телевизор 7",
            price: "244,99 р.",
            imageUrl: "https://picsum.photos/seed/7/200",
        },
        {
            id: 8,
            name: "Телевизор 8",
            price: "399,99 р.",
            imageUrl: "https://picsum.photos/seed/8/200",
        },
        {
            id: 9,
            name: "Телевизор 9",
            price: "444,99 р.",
            imageUrl: "https://picsum.photos/seed/9/200",
        },
    ],
};

let buttons = document.querySelectorAll('button');
let items = document.querySelector('.products');

buttons.forEach(function(button) {
    button.addEventListener('click', clickHandler);
})

/**
 * Эта функция должна вызываться при клике по кнопкам.
 * @param {MouseEvent} event
 */

{/* <div class="product">
    <div>${здесь_название_товара}</div>
    <img src="${здесь путь до картинки}" alt="">
    <div>${здесь_цена}</div>
    <a href="https://example.com/producs/${здесь_id_товара}">Подробнее</a>
</div> */}

function clickHandler(event) {
    items.innerHTML = '';
    showCategory(event.target.dataset.type);

    //вам нужно очищать содержимое .products
    
    //в showCategory надо передать строку с типом категории, тип берите
    //из атрибута data-type у кнопки, по которой кликнули.
  
}

/**
 * Функция берет товары (объекты) из соответствующего массива phones,
 * tablets или tv. Генерирует разметку, используя getProductMarkup
 * и вставляет в .products
 * @param {string} category сюда должно прилетать значение атрибута data-type у кнопки,
 * по которой кликнули.
 */
function showCategory(category) { 

    let arrayProduct = [];
    arrayProduct = Object.keys(products);
    console.log(arrayProduct);
    arrayProduct.forEach(function(el) {
        if (el === category) {
            getProductMarkup(category);
        }
    });
}

/**
 * @param {Object} product объект из массива phones, tablets или tv.
 * @param {number} product.id id продукта
 * @param {string} product.name название продукта
 * @param {string} product.price цена продукта
 * @param {string} product.imageUrl путь до картинки товара
 * @returns {string} html-разметка для товара по аналогии из комментария
 * в верху этого файла.
 */
function getProductMarkup(product) {
    // console.log(product);
    for(let i = 0; i < products[product].length; i++) {
        console.log(products[product][i]);

        let item = document.createElement('div');
        item.classList.add('product');
        items.insertAdjacentElement('afterbegin', item);

        let link = document.createElement('a');
        link.setAttribute('href', `https://example.com/producs/${products[product][i].id}`);
        link.innerText = 'Подробнее';
        item.insertAdjacentElement('afterbegin', link);

        let price = document.createElement('div');
        price.innerText = products[product][i].price;
        item.insertAdjacentElement('afterbegin', price);

        let img = document.createElement('img');
        img.setAttribute('src', products[product][i].imageUrl);
        item.insertAdjacentElement('afterbegin', img);

        let title = document.createElement('div');
        title.innerText = `${products[product][i].name}`;
        item.insertAdjacentElement('afterbegin', title); 
    }
}
