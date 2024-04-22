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

// BackEnd

const labelAll = document.querySelectorAll('label');
const labelVal = [];

labelAll.forEach(elem => {
    labelVal.push(elem.innerText);
})

const showError = (label, textError) => {
    label.innerText = textError;
    label.classList.add('alert', 'alert-danger')    
}

// showError(labelAll[1], "Uzupełnij tytuł");

const getDataFromSRV = async dataFromForm => {
    const urlRestAPI = 'http://localhost:8888/validate';
    const method = 'post';
    const dataToSend = dataFromForm;
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(urlRestAPI, {
            method, 
            body: JSON.stringify(dataToSend),
            headers
        });

        const dataFromSRV = await response.json();

        return dataFromSRV;
    } catch(error) {
        console.error(error);
    }
}

const validateData = event => {
    event.preventDefault();

    const resPlace = document.querySelector('#resultPlace')
    resPlace.innerTEXT = '';
    resPlace.classList.remove('alert', 'alert-success')

    labelAll.forEach((elem, i) => {
        elem.classList.remove('alert', 'alert-danger');
        elem.innerText = labelVal[i];
    })

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#title').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }

    getDataFromSRV(dataFromForm).then(res => {
        console.log(res);

        if('send' in res) {
            resPlace.classList.add('alert', 'alert-success')
            resPlace.innerText = res.send;
            document.querySelectorAll('input:not(input[id="send"]), textarea').forEach(elem => {
                elem.value = '';
            })
        } else {
            if('email' in res) {
                showError(labelAll[0], res.email);
            }

            if('subject' in res) {
                showError(labelAll[1], res.subject);
            }

            if('message' in res) {
                showError(labelAll[2], res.message);
            }
        }
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', validateData);