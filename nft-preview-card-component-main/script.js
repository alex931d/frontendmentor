const h4 = document.querySelector('left-container h4');

const animationDuration = 2000;
const frameDuration = 1000 / 60;

const totalFrames = Math.round( animationDuration / frameDuration );
const easeOutQuad = t => t * ( 2 - t );
const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10);

	const counter = setInterval( () => {
		frame++;
		const progress = easeOutQuad( frame / totalFrames );
		const currentCount = Math.floor((countTo* 100 ) / 100 * progress);
        const number = currentCount.toString();

		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = number;
          
            
		}
	
		if ( frame === totalFrames ) {
			clearInterval( counter );
        
		}
	},frameDuration);
};

const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};
window.onload = function() {
    runAnimations();
  };