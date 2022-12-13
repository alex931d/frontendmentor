
const circle = document.querySelectorAll('.circle');
let array = [...circle];
var point;
const btn = document.querySelector('a');
const img = document.querySelector('img');
circle.forEach(tab => {
    tab.addEventListener('click',function (e) {
        circle.forEach(element => {
            element.classList.remove('active');
            
        });
     
       if (e.target.classList.contains('circle')) {
          e.target.classList.add('active'); 
           point = e.target;
       }
      
        
    })

});
btn.addEventListener('click',function() {  
     animation();
    document.querySelector('.first').style.display = "none";
    document.querySelector('.finish').style.display = "block";
    if (point == null) {
        document.querySelector('.selection span').innerHTML = "You selected" +  " 0 " + "out of 5";
    }
    else if(point != null){
            document.querySelector('.selection span').innerHTML = "You selected" + point.innerHTML + "out of 5";

    }
 


    
})

    //-------------- gsap animation ---------------
function animation() {
	let tl = gsap.timeline({
    defaults: {
        duration: 1

    }
})
gsap.set(".finish",{
x: 300,
opacity: 0
})
tl.to(".finish",{
    duration: 1.3,
    ease: "circ.out",
	opacity: 1,
    x: 0
})

}
gsap.set(".circle", {
    autoAlpha: 0,
    transformOrigin: "50% 50%",
    scale: 0
  })
  
  
  let TL = gsap.timeline({ 
      defaults: { 
       stagger: { amount: 1.0 },
       autoAlpha: 1,
       scale: 1,
       ease: "back.out(1.7)",
      }
    })
TL.to('.circle',{})