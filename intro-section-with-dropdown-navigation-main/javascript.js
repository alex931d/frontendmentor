
const arrows = document.querySelectorAll('.id');
const imgs = document.querySelectorAll('#arrow');
const menus = document.querySelectorAll('.menu');
const closed = document.querySelector('.closed');
const open = document.querySelector('.open');
const menuwrapper = document.querySelector('.menuwrapper');
const overlayer = document.createElement('div');
overlayer.classList.add('overlayer');
const body = document.querySelector('body');
body.appendChild(overlayer);


var a = 0;
for (let index = 0; index < arrows.length; index++) {
    arrows[index].addEventListener('click', function () {
        a++;
        arrows[index].classList.toggle('nav-open');
        if (arrows[index].classList.contains('nav-open')) {
            imgs[index].src = "./imgs/icon-arrow-up.svg";
            menus[index].style.display = "block";
        }
        else if (!arrows[index].classList.contains('nav-open')) {
            imgs[index].src = "./imgs/icon-arrow-down.svg";
            menus[index].style.display = "none";
        }
    });

}
closed.addEventListener('click', function () {

    menuwrapper.style.display = "block"
    overlayer.style.display = "block"
    menuwrapper.classList.toggle('menu-anim');
    menuwrapper.style.transform = "translateX(0%)"


});
open.addEventListener('click', function () {
    overlayer.style.display = "none"

    menuwrapper.classList.toggle('menu-anim');
    menuwrapper.style.transform = "translateX(100%)"


});
setInterval(check, 10);

function check() {
    if (window.innerWidth >= 890) {
        menuwrapper.style.transform = "translateX(0%)"
        menuwrapper.style.display = ""
        overlayer.style.display = "none"
    }
}



