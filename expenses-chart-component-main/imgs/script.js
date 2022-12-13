const graf = document.querySelectorAll('.graf-block');
const text = document.querySelectorAll('.graf span');

const h4 = document.querySelector('h4');
const card = document.querySelector('.graf-wrapper');
const date = new Date();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const animationDuration = 2000;
const frameDuration = 1000 / 60;

//-------------- gsap animation ---------------
function animation() {
	let tl = gsap.timeline({
    defaults: {
        duration: 1

    }
})
gsap.set(".column, .card-main-top, .column-box, .graf-wrapper",{
x: 200,
opacity: 0
})
tl.to(".column, .card-main-top, .column-box, .graf-wrapper",{
    duration: 1.3,
    ease: "circ.out",
	opacity: 1,
    x: 0
})
}

// ------------------ drop down menu handle -----------
document.querySelector('.week').addEventListener('click',function () {
	displayWeeks(graf,text,today,card);
});
document.querySelector('.month').addEventListener('click',function () {
	displayMonths(graf,text,today,card,date);
});

function getMonth(date) {
	const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	let currentMonth = month[date.getMonth()];
	return currentMonth;
	
}


window.onload = function() {
    runAnimations();
	displayWeeks(graf,text,today,card);
	animation();
  };

const totalFrames = Math.round( animationDuration / frameDuration );
const easeOutQuad = t => t * ( 2 - t );
const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10);

	const counter = setInterval( () => {
		frame++;
		const progress = easeOutQuad( frame / totalFrames );
		const currentCount = Math.floor((countTo* 100 ) / 100 * progress);
        const number = currentCount.toString().slice(0,3);
        const decimal = currentCount.toString().slice(-2);

		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = "$"+ number + "." + decimal;
            h4.innerHTML = "+"+ 2 + "."+ decimal.slice(-1) + "%" ;
            
		}
	
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};
    

function displayWeeks(graf,text,today,card) {
	document.querySelector('.column > span').innerHTML = "Total this week";
	document.querySelector('.card-main-top > h1').innerHTML = "Spending - Last 7 days";
	document.querySelector('#last').innerHTML = "form last week";
	document.querySelector('.column > h2').innerHTML = "$142.22";

fetch('./data.json')
.then((response) => response.json())
.then(function (json) {

	document.querySelectorAll('.graf').forEach(element => {
	element.remove();
	});

		
	
		
	 


		for (let index = 0; index < json.weeks.length; index++) {
		const block = document.createElement("div");
		const span = document.createElement("span");
		const div = document.createElement("div");
		const price = document.createElement("h3");
		block.classList.add('graf');
		card.appendChild(block);	
		block.appendChild(price)
	
		price.classList.add('price');
		block.appendChild(div)
		div.classList.add("graf-block")
		block.appendChild(span);
		 price.innerHTML = "$" + json.weeks[index].amount;
		document.querySelectorAll('.graf')[index].addEventListener('mouseover',function (price) {
			
			 document.querySelectorAll('.graf h3')[index].style.opacity = "1.0";
			 document.querySelectorAll('.graf-block')[index].style.opacity = "0.5"
		})
		document.querySelectorAll('.graf')[index].addEventListener('mouseleave',function (price) {
			
			document.querySelectorAll('.graf h3')[index].style.opacity = ".00";
			document.querySelectorAll('.graf-block')[index].style.opacity = "1"
	   })
     
	}
	console.log(document.querySelectorAll('.graf').length)


	
json.weeks.forEach(element => {		 
		
		// ------------------- make the divs ------------------



	// ---------------- make the span letters uppercase and add text ------------
	for (let index = 0; index < json.weeks.length; index++) {
	
			const firstLetter = json.weeks[index].day.toString().slice(0,1)
			document.querySelectorAll('.graf span')[index].innerHTML = firstLetter.toUpperCase() + json.weeks[index].day.toString().slice(1,3); 
	
			
	 }
	// ------------------ add class to current day--------
 const dayFormatted = today.toDateString().slice(0 , 3);
 document.querySelectorAll('.graf span').forEach(textElement => { 
const getNextElement = textElement.previousElementSibling;
	if (textElement.innerHTML == dayFormatted.toString()) {
		
		getNextElement.classList.add("active");

    }
	if(textElement.innerHTML != dayFormatted.toString()){
		for (let index = 0; index < document.querySelectorAll('.graf-block').length; index++) {

			getNextElement.classList.remove("active");
		}
	}
}
);


	// ------------------- funky animaion ---------
	let x = 0;
	const countToAmount = parseInt(element.amount, 10)
	const interval = setInterval(() =>{		
		x++;
		const progress = easeOutQuad( x / (2000 / (1000 / 60)));
		const currentAmount = Math.floor(countToAmount  * progress);
		if (parseInt(element.amount, 10) !== currentAmount) {
			for (let index = 0; index < 7; index++) {
				document.querySelectorAll('.graf-block')[index].style.height = currentAmount + "px";
			}
	
		}
	
		if (x === 200) {
	     for (let index = 0; index < document.querySelectorAll('.graf-block').length; index++) {
		
			for (let index = 0; index < json.weeks.length; index++) {
				document.querySelectorAll('.graf-block')[index].style.height = json.weeks[index].amount * 1.5 + "px";
					}

	   }
	   
			clearInterval(interval);
			console.log("finish");
		}
		
	})
});
});
}





function displayMonths(graf,text,today,card,date) {
	document.querySelector('.column > span').innerHTML = "Total this month";
	document.querySelector('.card-main-top > h1').innerHTML = "Spending - Last 30 days";
	document.querySelector('#last').innerHTML = "form last month";
	document.querySelector('.column > h2').innerHTML = "$478.33";

	fetch('./data.json')
	.then((response) => response.json())
	.then(function (json) {
	
		document.querySelectorAll('.graf').forEach(element => {
			element.remove();
			});

		
			for (let index = 0; index < json.months.length; index++) {
				const block = document.createElement("div");
				const span = document.createElement("span");
				const div = document.createElement("div");
				const price = document.createElement("h3");
				block.classList.add('graf');
				card.appendChild(block);	
				block.appendChild(price)
			
				price.classList.add('price');
				block.appendChild(div)
				div.classList.add("graf-block")
				block.appendChild(span);
				 price.innerHTML = "$" + json.months[index].amount;
				document.querySelectorAll('.graf')[index].addEventListener('mouseover',function (price) {
					
					 document.querySelectorAll('.graf h3')[index].style.opacity = "1.0";
					 document.querySelectorAll('.graf-block')[index].style.opacity = "0.5"
				})
				document.querySelectorAll('.graf')[index].addEventListener('mouseleave',function (price) {
					
					document.querySelectorAll('.graf h3')[index].style.opacity = ".00";
					document.querySelectorAll('.graf-block')[index].style.opacity = "1";
			   })
			
		}
	



		
	json.months.forEach(element => {		 

		// ---------------- make the span letters uppercase and add text ------------
		for (let index = 0; index < json.months.length; index++) {
	
				const firstLetter = json.months[index].month.toString().slice(0,1);
				document.querySelectorAll('.graf span')[index].innerHTML = firstLetter.toUpperCase() + json.months[index].month.toString().slice(1,3); 
	
			
		 }
		// ------------------ add class to current day--------
	 document.querySelectorAll('.graf span').forEach(textElement => { 
	const getNextElement = textElement.previousElementSibling;
		if (textElement.innerHTML == getMonth(date).toString()) {
			getNextElement.classList.add("active");
	
		}
		if(textElement.innerHTML != getMonth(date).toString()){
			for (let index = 0; index < document.querySelectorAll('.graf-block').length; index++) {
	
				getNextElement.classList.remove("active");
			}
		}
	}
	);
	
	
		// ------------------- funky animaion ---------
		let x = 0;
		const countToAmount = parseInt(element.amount, 10)
		const interval = setInterval(() =>{		
			x++;
			const progress = easeOutQuad( x / (2000 / (1000 / 60)));
			const currentAmount = Math.floor(countToAmount  * progress);
			if (parseInt(element.amount, 10) !== currentAmount) {
				for (let index = 0; index < 11; index++) {
					document.querySelectorAll('.graf-block')[index].style.height = currentAmount + "px";
				}
		
			}
		
			if (x === 200) {
			 for (let index = 0; index < document.querySelectorAll('.graf-block').length; index++) {
			
				for (let index = 0; index < json.months.length; index++) {
					document.querySelectorAll('.graf-block')[index].style.height = json.months[index].amount * 1.5 + "px";
						}
	
		   }
		   
				clearInterval(interval);
				console.log("finish");
			}
			
		})
	});
	});
	}