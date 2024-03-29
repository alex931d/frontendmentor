const wrapper = document.querySelector('.card-wrapper');
const clearBtn = document.querySelector('.clear');
function getJobListingHtml(data, index) {

    let jobItemList = `
  <div class="card">
    <div class="centerlized">
     <div class="left-card-container">
      <img src="${
        data[index].logo
    }" alt="logo"></img>
       <div class="company-content">
         <div class="top-card-container">
         <span>${
        data[index].company
    }</span>
          <div class="tag-container"></div>
         </div>
        <div class="middle-card-container">
         <a href=""#>${
        data[index].position
    }</a>
        </div>
        <div class="bottom-card-container">
        <span class="postedAt">${
        data[index].postedAt
    }</span>
        <span class="dot"></span>
        <span class="contract">${
        data[index].contract
    }</span>
        <span class="dot"></span>
        <span class="location">${
        data[index].location
    }</span>
        </div>
       </div>
     </div>
    <div class="right-card-container"></div>
    </div>
  </div>
  `;
    wrapper.innerHTML += jobItemList;
    const cards = document.querySelectorAll('.card');
    cards[0].classList.add('highlighted');        
}

function CrateJobtags(json, index) {

    const RightCardContainer = document.querySelectorAll('.right-card-container');
    const jobTag = document.createElement('div');
    RightCardContainer.forEach(element => {

        element.appendChild(jobTag);

    });
    const jobTagInner = document.createElement('div');
    jobTag.appendChild(jobTagInner);
    jobTag.classList.add('job-tag');
    jobTagInner.classList.add('job-tag-inner');
    const Role = document.createElement('span');
    jobTagInner.appendChild(Role);
    Role.innerText = json[index].role;
    // creating the languages tags
    for (let i = 0; i < json[index].languages.length; i = i + 1) {

        const jobTag = document.createElement('div');
        RightCardContainer.forEach(element => {

            element.appendChild(jobTag);

        });
        const jobTagInner = document.createElement('div');
        jobTag.appendChild(jobTagInner);
        jobTag.classList.add('job-tag');
        const role = document.createElement('span');
        jobTagInner.appendChild(role);
        jobTagInner.classList.add('job-tag-inner');
        role.innerText = json[index].languages[i];

    }
    const tagContainer = document.querySelectorAll('.tag-container');
    if (json[index].new == true) {

        const roundedTagNew = document.createElement('div');
        roundedTagNew.classList.add('rounded-tag');
        roundedTagNew.classList.add('new');
        const New = document.createElement('span');
        New.innerText = "New!";
        tagContainer.forEach(element => {

            element.appendChild(roundedTagNew);

        });
        roundedTagNew.appendChild(New);

    }
    if (json[index].featured == true) {

        const roundedTagFeatured = document.createElement('div');
        roundedTagFeatured.classList.add('rounded-tag');
        roundedTagFeatured.classList.add('featured');
        const featured = document.createElement('span');
        featured.innerText = "featured";
        tagContainer.forEach(element => {

            element.appendChild(roundedTagFeatured);

        });
        roundedTagFeatured.appendChild(featured);

    }

}
/*re */
let selectedTags = [];  
let arr = [];
let tags = {

    div: "tag-container",
    span: "",
    text: ""

};
gsap.from("nav", {

    scrollTrigger: {

        trigger: "main",
        start: "top 10%",
        end: "top 20%",
        markers: false,
        scrub: 1

    },
    scale: 1.05,
    duration: 0.5

});
// navbar sticky
window.onscroll = function () {

    scroll();

};
const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;
function scroll() {

    if (window.pageYOffset >= sticky && selectedTags.length > 0) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

}
function singleAnim(el) {

    let tl = gsap.timeline({

        defaults: {

            duration: 1

        }
    });
    gsap.set(`.${el}`, {scale: 0.9});
    tl.to(`.${el}`, {

        duration: 0.5,
        ease: `back.out(1.0)`,
        scale: 1

    });

}
// gsap animation stagger
function animation(element, time) {

    gsap.set(`${element}`, {

        autoAlpha: 0,
        transformOrigin: "50% 50%",
        x: 0

    });
    let TL = gsap.timeline({

        defaults: {

            stagger: {

                amount: 1.0

            },
            autoAlpha: 1,
            x: 300, 
            ease: `back.out(${time})`

        }

    });
    TL.to(`${element}`, {});

}
// get last element and then slice and return it
function getLastElement() {

    const last = Array.from(document.querySelectorAll('.tag')).pop();
    return last.className.slice(7, 10);

}
// handle fetch errors
function handleErrors(response) {

    if (! response.ok) {

        const h1 = document.createElement('h1');
        wrapper.appendChild(h1);
        h1.innerHTML = "The requested data was" +" " + response.statusText + " " + "on this server";
        h1.classList.add('error');
        throw Error(response.statusText);

    }
    return response;

}
// fetch and then run make elements function
fetch('./data.json')
    .then(handleErrors)
    .then((response) => response.json())
    .then(function makeElements(json) { // clear btn logic
        clearBtn.addEventListener('click', function (json) {

            selectedTags.splice(0, selectedTags.length);
            const tag = document.querySelectorAll('.tag');
            const cards = document.querySelectorAll('.card');
            for (let index = 0; index < tag.length; index = index + 1) {

                tag[index].remove();

            }
            arr.splice(0, arr.length);
            cards.forEach(element => {

                element.remove();
             

            }); 
     
     

        });
        for (let index = 0; index < json.length; index = index + 1) {

            getJobListingHtml(json, index);
            CrateJobtags(json, index);

        }
        animation('.card', 1.7);
        let jobtag = document.querySelectorAll('.job-tag');
       
        jobtag.forEach(element => {
             
            element.addEventListener('click', click);
          
            function click(e) {
                
       
           
                for (let index = 0; index < jobtag.length; index = index + 1) {

                    if (jobtag[index].innerText == `${
                        e.target.innerText
                    }`) {

                        jobtag[index].classList.toggle('active');

                    }

                }
                // checkArray(selectedTags,tag,e);
                if (!element.classList.contains('active') && selectedTags.includes(`${
                    e.target.innerText
                }`, 0) == true) {

                    selectedTags.splice(selectedTags.indexOf(`${
                        e.target.innerText
                    }`, 1));
                    document.querySelectorAll('.tag').forEach(elm => {

                        if (elm.innerText == e.target.innerText) {

                            elm.remove();

                        }

                    });

                } else {

                    selectedTags.push(e.target.innerText);
                    const tag = document.createElement('div');
                    const nav = document.querySelector('.left-container-navbar');
                    const leftTag = document.createElement('div');
                    tag.appendChild(leftTag);
                    leftTag.classList.add('left-tag');
                    const removeBtn = document.createElement('div');
                    const removeImg = document.createElement('img');
                    removeBtn.classList.add('remove-btn');
                    const span = document.createElement('span');
                    leftTag.appendChild(span);
                    span.innerText = e.target.innerText;
                    removeImg.classList.add('remove');
                    removeImg.src = "./images/icon-remove.svg";
                    removeBtn.appendChild(removeImg);
                    nav.appendChild(tag);
                    tag.classList.add('tag');
                    console.log(selectedTags);
                    leftTag.appendChild(removeBtn);
                 
                    for (var index = 0; index < json.length; index = index + 1) {

                        const cards = document.querySelectorAll('.card');
                        /*remove all elements */
                        cards.forEach(element => {

                            element.remove();

                        });
                       // checking the selectedtags if json includes one of the tags then push that id at the current index to a new array
                        selectedTags.forEach(element => {

                            if (json[index].role.includes(`${element}`) ||
                             json[index].languages.includes(`${element}`) ||
                              json[index].tools.includes(`${element}`)) {
                                arr.push(json[index].id - 1);

                            }
                        });
                        animation('.card', 1.7);
                  
                    }   
                 
                        for (let index = 0; index < arr.length; index++) {
                          console.log(arr);
                            getJobListingHtml(json,arr[index]);
                            CrateJobtags(json,arr[index]);         
                            animation('.card', 1.7);     
                              let jobtag = document.querySelectorAll('.job-tag');
                             jobtag.forEach(element => {
                                if (element.innerText == selectedTags) {
                                 element.classList.add('active')
                                } 
                            });
                        }
                    singleAnim("tag", 1.0);

                }

            }

        });

    });