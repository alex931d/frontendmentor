const form = document.querySelector('form');

const wrapper = document.querySelector('.input-container');
const NAME_REQUIRED = "Please enter your name";
const NUMBER_REQUIRED = "Please enter your number";
const NUMBER_INVALID = "Please enter a correct number";
const CVC_REQUIRED = "Please enter your cvc";
const CVC_INVALID = "Please enter a correct cvc format";
const MONTH_REQUIRED = "Please enter a month";
const MONTH_INVALID = "Please enter a correct month";
const YEAR_REQUIRED = "Please enter a year";
const YEAR_INVALID = "Please enter a correct year";

// errors
const errorcardname = document.querySelector('.errorlbl1');
const errorcardnumber = document.querySelector('.errorlbl2');
const errorcardmonthyear = document.querySelector('.errorlbl3');
const errorcardcvc = document.querySelector('.errorlbl4');

let motnhdisplay = document.getElementById('cardmonth');
let yeardisplay = document.getElementById('cardyear');

let digits = document.getElementById('digits');
let cardName = document.querySelector('.card-name');
let cardMonth = document.querySelector('.card-month');
let cardYear = document.querySelector('.card-year');
let cardCvc = document.querySelector('.card-cvc');


const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
motnhdisplay.value = `${month + 1}`;
yeardisplay.value = `${year.toString(10).slice(2)}`

cardMonth.innerText = document.getElementById('cardmonth').value;
cardYear.innerText = document.getElementById('cardyear').value;

update();
function update() {
    setInterval(update, 200);
    let number = document.getElementById('cardnumber').value;
    let name = document.getElementById('cardname').value;
    let month = document.getElementById('cardmonth').value;
    let year = document.getElementById('cardyear').value;
    let cvc = document.getElementById('cardcvc').value;
    digits.innerText = number;
    cardName.innerText = name;
    cardMonth.innerText = month;
    cardYear.innerText = year;
    cardCvc.innerText = cvc;

}



function showMessage(input, message, type) {

    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;

    input.className = type ? "success" : "error";
    return type;
}
function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}
function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}


function validateNumber(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }


    const number = input.value.trim();
    let getlenght = input.value.trim().lenght;



    if (!/^\d+$/.test(number)) {
        return showError(input, invalidMsg);
    }
    else {
        return true;
    }



}


function validateMonth(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }


    const month = input.value.trim();

    if (!/[0-11]/.test(month)) {
        return showError(input, invalidMsg);
    }
    else {
        return true;
    }



}



function validateYear(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }


    const year = input.value.trim();
    if (!/[0-99]/.test(year)) {
        return showError(input, invalidMsg);
    }
    return true;
}

function validateCvc(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }


    const cvc = input.value.trim();
    let getlenght = input.value.trim().lenght;

    if (!/[0-999]/.test(cvc)) {
        return showError(input, invalidMsg);
    }
    else {
        return true;
    }



}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function test(h1, logo, span, button, loading) {
    await delay(3000);
    loading.remove();
    h1.style.transform = "translateX(0%)";
    logo.style.transform = "translateX(0%)"
    span.style.transform = "translateX(0%)";
    button.style.transform = "translateX(0%)";
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let nameValid = hasValue(form.elements["cardname"], NAME_REQUIRED);
    let numberValid = validateNumber(form.elements["cardnumber"], NUMBER_REQUIRED, NUMBER_INVALID);
    let monthValid = validateMonth(form.elements["cardmonth"], MONTH_REQUIRED, MONTH_INVALID);
    let yearValid = validateYear(form.elements["cardyear"], YEAR_REQUIRED, YEAR_INVALID);
    let cvcValid = validateCvc(form.elements["cardcvc"], CVC_REQUIRED, CVC_INVALID);
    // if valid, submit the form.
    if (nameValid && numberValid && yearValid && monthValid && cvcValid) {
        form.classList.add('hide');
        const logo = document.createElement("img");
        const h1 = document.createElement("h1");
        const span = document.createElement("span");
        const button = document.createElement("button");
        const loading = document.createElement("img");
        logo.classList.add('logo');
        loading.classList.add('loading');
        logo.src = "./imgs/icon-complete.svg"
        loading.src = "./imgs/Loading_icon.gif"
        span.classList.add('underText');
        h1.classList.add('headerText');
        h1.innerText = `Thank You ${form.elements["cardname"].value}`;
        span.innerText = "We've added your card details";
        button.innerText = "Continue";

        test(h1, logo, span, button, loading);
        wrapper.appendChild(loading);
        wrapper.appendChild(logo);
        wrapper.appendChild(h1);
        wrapper.appendChild(span);
        wrapper.appendChild(button);

    }
});



