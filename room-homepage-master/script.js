const sliderLeft = document.querySelector(".silder-left")
const sliderRight = document.querySelector(".silder-right")
const slider = document.querySelector(".hero-section-first")
const images = document.querySelectorAll(".slider-img")
const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".mobile-menu-container");
let index = 0;


sliderLeft.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = images.length - 1;
    }
    slider.style.backgroundImage = `url(${images[index].src})`;
  });
  
  sliderRight.addEventListener("click", () => {
    index++;
    if (index >= images.length) {
      index = 0;
    }
    slider.style.backgroundImage = `url(${images[index].src})`;
  });
burgerMenu.addEventListener("click", ()=>{
    burgerMenu.classList.toggle("show");
    burgerMenu.classList.toggle("highlight");
    menu.classList.toggle("show")
    if (burgerMenu.classList.contains("show")) {
        document.querySelector(".overlayer").style.display = "block"
        
    }
    else{
        document.querySelector(".overlayer").style.display = "none"
    }
})
  
setInterval(() => {
    slider.classList.toggle("active");
  index = (index + 1) % images.length; 
slider.style.backgroundImage = `url(${images[index].src})`;

}, 5000);