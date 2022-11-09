const btn = document.querySelector('.card-header-right a');
const point = document.querySelector('.point');
const dot = document.querySelectorAll('.dot');
const box = document.querySelector('.private-message');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function wait1() {

    await delay(800);
    box.style.position = "absolute";
}



btn.addEventListener('click', function () {
    point.classList.toggle('hide');
    for (let index = 0; index < dot.length; index++) {

        dot[index].classList.toggle('hide');

    }


    box.classList.toggle('moveaway');
    if (box.classList.contains('moveaway')) {
        wait1();

    }

    else {
        box.style.position = "relative";
    }

});