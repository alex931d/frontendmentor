const burger = document.querySelector(".burger");
const menu = document.querySelector(".mobile-nav");
burger.addEventListener("click",()=>{
    menu.classList.toggle("hide");
    burger.classList.toggle("active");
});
function paraAnimation(para){
    let paratl = gsap.timeline({
      scrollTrigger: {
        trigger: para,
        start: "center 50%",
        end: "top 30%",
        scrub: 1
      }
    });

    const randomX = gsap.utils.random([-200, 200]); // Random X direction: -200 or 200
    const randomY = gsap.utils.random([-200, 200]); // Random Y direction: -200 or 200

    paratl.from(para, {
      x: randomX,
      y: randomY,
      opacity: 0,
      duration: 1
    });

    return paratl;
  }

document.addEventListener('DOMContentLoaded', function() {
    
  const contentElements = document.querySelectorAll('.inner-content');
  const pictures = document.querySelectorAll('.picture-large img');
  const testimonials = document.querySelectorAll('.card');
  contentElements.forEach(content => {
    gsap.from(content, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: content,
        start: 'center 50%',
        end: 'center 50%',
        markers: false,
        toggleActions: 'play none none reverse'
      }
    });
  });


  pictures.forEach(content => {
    paraAnimation(content);
  });
  testimonials.forEach(card=>{
    paraAnimation(card)
  })
});