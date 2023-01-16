function animation(element, time) {

    gsap.set(`${element}`, {

        autoAlpha: 0,
        transformOrigin: "50% 50%",
        scale: 0.9,
        x: -100

    });
    let TL = gsap.timeline({

        defaults: {

            stagger: {

                amount: 1.0

            },
            autoAlpha: 1,
            scale: 1,
            x: 0,
            ease: `back.out(${time})`

        }

    });
    TL.to(`${element}`, {});

}
animation('.card',1.5);