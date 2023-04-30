const burgericon = document.querySelector(".burger-menu");
const burgerMenu = document.querySelector(".burger-menu-mobile");
const overlayer = document.querySelector(".overlayer");
burgericon.addEventListener("click",()=>{
    burgericon.classList.toggle("active");
    if (burgericon.classList.contains("active")) {
        overlayer.style.display ="block"
        burgerMenu.classList.toggle("view");
    }
    else{
            overlayer.style.display ="none"
            burgerMenu.classList.toggle("view");
               burgerMenu.style.display = "none"
    }

});

function animation(element, time) {
    gsap.set(`${element}`, {
      autoAlpha: 0,
      x: 500,
      transformOrigin: "50% 50%"
    });
    let TL = gsap.timeline({
      defaults: {
        stagger: {
          amount: 1.0
  
        },
        autoAlpha: 1,
        x: 0,
        y: 0,
        ease: `back.out(${time})`
      }
    });
    TL.to(`${element}`, {});
  }
  animation(".hero-section-last",1)
  gsap.from("#section-1 .section-card-wrapper-last",{
    scrollTrigger: {
      trigger: ".section-card-wrapper-last",
      start: "top 70%",
      end: "bottom 70%",
      markers: false,
      scrub: 1.2
    },
    scale: 0.9, duration: 2,x: 200,   autoAlpha: 0
  });
  
  gsap.from("#section-2 .section-card-wrapper-last",{
    scrollTrigger: {
      trigger: "#section-2 .section-card-wrapper-last",
      start: "top 70%",
      end: "top 70%",
      markers:false,
      scrub: 1.2
    },
    scale: 0.9, duration: 2,x: -200,   autoAlpha: 0
  });
  