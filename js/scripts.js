'use strict';

const menu = document.querySelector('span');
const dropdown = document.querySelector('#nav-box');

menu.addEventListener('click', () => {
    if(menu.innerHTML == 'menu'){
        menu.innerHTML = 'close';
        dropdown.classList.add('active');
    }else {
        menu.innerHTML = 'menu';
        dropdown.classList.remove('active');
    }
});

