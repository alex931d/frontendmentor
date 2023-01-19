const cardwrapper = document.querySelector('.end-card-wrapper');
const links = document.querySelectorAll('.bottom-container ul li a');
function createCard(json,index,time) {
    let data = `
    <div class="small-card-wrapper card">
    <div class="card-container">
       <div class="card-content-container">
           <div class="top-content">
              <span class="bold">${json[index].title}</span>
              <a href="#">
                 <img alt="menu" src="./images/icon-ellipsis.svg">
              </a>
           </div>
           <div class="middle-content">
             <h2>${time.current}hrs</h2>
             <span>Last ${time.date} - ${time.previous}hrs</span>
           </div>
       </div>
    </div>
    </div>
    `;
    cardwrapper.innerHTML += data;
}

function colorCards(json,colors) {
    const cardcontainers = document.querySelectorAll('.card-container');
    for (let i = 0; i < cardcontainers.length; i++) {
     cardcontainers[i].style.backgroundImage = `url(${json[i].image})`;
     cardcontainers[i].style.backgroundColor = `var(${colors[i]})`;
    
}
}
links.forEach(element => {
    element.addEventListener('click',function(e) {
        let colors =["--Light-orange","--Soft-blue","--Light-red","--Lime-green","--Violet","--Soft-orange"];
        let timeText = e.target.innerHTML.toLowerCase();
        
        const cards = document.querySelectorAll('.small-card-wrapper');
        cards.forEach(el => {
            el.remove();
        });
        fetch('./data.json')
       .then((response) => response.json())
        .then(function (json) { 
        for (let index = 0; index < json.length; index++) {
            switch (timeText) {
                case "daily": 
                createCard(json,index,json[index].timeframes.daily);
                colorCards(json,colors);
                
                    break;
                    case "monthly":
                        createCard(json,index,json[index].timeframes.monthly);
                        colorCards(json,colors);
                        break;
                        case "weekly":
                            createCard(json,index,json[index].timeframes.weekly);
                            colorCards(json,colors);
                            
                            
                            break;
                default:
                    createCard(json,index,json[index].timeframes.weekly);
                    colorCards(json,colors);
                    break;
            }
           animationFadeOut(".end-card-wrapper .card",1);
            
        }
        
    });
        
    });
    
});

function animationFadeOut(element, time) {
    gsap.set(`${element}`, {
        autoAlpha: 0,
        transformOrigin: "50% 50%",
        x: 200,
        opacity: 0
    });
    let TL = gsap.timeline({
        defaults: {
            stagger: {
                from: "random",
                amount: 1.0
            },
            autoAlpha: 1,
            ease: `back.out(${time})`,
            x: 0,
            opacity: 1
        }
    });
    TL.to(`${element}`, {});
}


function animation(element, time) {
    gsap.set(`${element}`, {
        autoAlpha: 0,
        transformOrigin: "50% 50%",
        scale: 0.9,
        x: 60
    });
    let TL = gsap.timeline({
        defaults: {
            stagger: {
                from: "random",
                amount: 1.0
            },
            autoAlpha: 1,
            scale: 1,
            ease: `back.out(${time})`,
            x: 0
        }
    });
    TL.to(`${element}`, {});
}

fetch('./data.json')
.then((response) => response.json())
.then(function (json) { 
let colors =["--Light-orange","--Soft-blue","--Light-red","--Lime-green","--Violet","--Soft-orange"];
for (let index = 0; index < json.length; index++) {
createCard(json,index,json[index].timeframes.weekly);
animation(".card",3);
colorCards(json,colors);
 

    
}

});