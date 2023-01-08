const wrapper = document.querySelector('.card-wrapper');
const clearBtn = document.querySelector('.clear');

  let selectedTags = [];
  let tags = {
        div: "tag-container",
        span: "",
        text: "",
  }


  gsap.from("nav",{
    scrollTrigger: {
      trigger: "main",
      start: "top 10%",
      end: "top 20%",
      markers: false,
      scrub: 1
    },
    scale: 1.05, duration: 0.5
  });
// navbar sticky
  window.onscroll = function() {scroll()};

  const navbar = document.querySelector("nav");
  const sticky = navbar.offsetTop;
  
  function scroll() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }



  function singleAnim(el) {
    let tl = gsap.timeline({
      defaults: {
          duration: 1
  
      }
  })
  gsap.set(`.${el}`,{
    scale: 0.9
  })
  tl.to(`.${el}`,{
      duration: 0.5,
      ease: `back.out(1.0)`,
      scale: 1
  })
  }

// gsap animation stagger
function animation(element,time) {
    gsap.set(`${element}`, {
        autoAlpha: 0,
        transformOrigin: "50% 50%",
        scale: 0.9
      })
      
      
      let TL = gsap.timeline({ 
          defaults: { 
           stagger: { amount: 1.0 },
           autoAlpha: 1,
           scale: 1,
           ease: `back.out(${time})`,
          }
        })
    TL.to(`${element}`,{})
}

// get last element and then slice and return it
function getLastElement() {
  const last = Array.from(
    document.querySelectorAll('.tag')
  ).pop();  
  return last.className.slice(7,10);

}



// clear btn logic

clearBtn.addEventListener('click',function() {
 selectedTags.splice(0,selectedTags.length);
 const tag = document.querySelectorAll('.tag');
 const cards = document.querySelectorAll('.card');
 for (let index = 0; index < tag.length; index++) {
    tag[index].remove();

   }
cards.forEach(element => {
  element.remove();
  makeElements(json);
});
});

// check array
function checkArray(array,el,event) {
  el.classList.toggle('active');
    const btns = document.querySelectorAll('job-tag');
  for (let index = 0; index < btns.length; index++) {
      if (btns[index].classList.contains('active') && array.includes(`${event.target.innerText}`,0)) {
        console.log("hej");
      }
  }


}

// handle fetch errors
function handleErrors(response) {
  if (!response.ok) {  
     const h1 = document.createElement('h1');
     wrapper.appendChild(h1);
      h1.innerHTML = response.statusText;
      h1.classList.add('error');
      throw Error(response.statusText);
    
  }
  return response;
}

// fetch and then run make elements function
fetch('./data.json')
.then(handleErrors)
.then((response) => response.json())

.then(function makeElements(json) {
    

for (let index = 0; index < json.length; index++) {
    console.log(json[index]);
    const card = document.createElement('div');
    card.classList.add('card');
    wrapper.appendChild(card);
  
    const centerlized = document.createElement('div');
      card.appendChild(centerlized);
    centerlized.classList.add('centerlized');
    const LeftCardContainer = document.createElement('div');
    centerlized.appendChild(LeftCardContainer);
    LeftCardContainer.classList.add('left-card-container');
    const RightCardContainer = document.createElement('div');
    RightCardContainer.classList.add('right-card-container');
    centerlized.appendChild(RightCardContainer);
    const logo = document.createElement('img');
    LeftCardContainer.appendChild(logo);
    logo.src = json[index].logo;
    const companyContent = document.createElement('div');
    LeftCardContainer.appendChild(companyContent);
    companyContent.classList.add('company-content');

    const topCardContainer = document.createElement('div');
    companyContent.appendChild(topCardContainer);
    topCardContainer.classList.add('top-card-container');
    const tagContainer = document.createElement('div');
    const company = document.createElement('span');
    topCardContainer.appendChild(company);
 
    const companytext = document.createTextNode(json[index].company);  
     company.appendChild(companytext);
     topCardContainer.appendChild(tagContainer);
     tagContainer.classList.add('tag-container');
     
   const middleCardContainer = document.createElement('div');
   companyContent.appendChild(middleCardContainer);
   middleCardContainer.classList.add('middle-card-container');
   const position = document.createElement('a');
   middleCardContainer.appendChild(position);
   position.innerText = json[index].position;
   const bottomCardContainer = document.createElement('div'); 
   bottomCardContainer.classList.add('bottom-card-container');
   companyContent.appendChild(bottomCardContainer);
   const postedAt = document.createElement('span');
   const contract = document.createElement('span');



   const location = document.createElement('span');
   bottomCardContainer.appendChild(postedAt);
   for (let index = 0; index < 1; index++) {
    const dot = document.createElement('span');
    bottomCardContainer.appendChild(dot);
    dot.classList.add('dot');
     
    }
   bottomCardContainer.appendChild(contract);
   for (let index = 0; index < 1; index++) {
    const dot = document.createElement('span');
    bottomCardContainer.appendChild(dot);
    dot.classList.add('dot');
     
    }
   bottomCardContainer.appendChild(location);
   location.classList.add('location');
   location.innerText = json[index].location;
   contract.classList.add('contract');
   contract.innerText = json[index].contract;
   postedAt.classList.add('postedAt');
   postedAt.innerText = json[index].postedAt;
   const jobTag = document.createElement('div');
    RightCardContainer.appendChild(jobTag);
    const jobTagInner = document.createElement('div');
    jobTag.appendChild(jobTagInner);
    jobTag.classList.add('job-tag');
    jobTagInner.classList.add('job-tag-inner');
    const Role = document.createElement('span');
    jobTagInner.appendChild(Role);
    Role.innerText = json[index].role

   // creating the languages tags
 for (let i = 0;i < json[index].languages.length; i++) {
    const jobTag = document.createElement('div');
    RightCardContainer.appendChild(jobTag);
    const jobTagInner = document.createElement('div');
    jobTag.appendChild(jobTagInner);
    jobTag.classList.add('job-tag');

    const role = document.createElement('span');
    jobTagInner.appendChild(role);
    jobTagInner.classList.add('job-tag-inner');
    role.innerText = json[index].languages[i];

    
 }
 

    if (json[index].new == true) { 
          const roundedTagNew = document.createElement('div');
          roundedTagNew.classList.add('rounded-tag');
          roundedTagNew.classList.add('new');
            const New = document.createElement('span');
            New.innerText = "New!";
            tagContainer.appendChild(roundedTagNew);
            roundedTagNew.appendChild(New);
    }
    if (json[index].featured == true) {
        const roundedTagFeatured = document.createElement('div');
        roundedTagFeatured.classList.add('rounded-tag');
        roundedTagFeatured.classList.add('featured');
        const featured = document.createElement('span');
        featured.innerText = "featured";
        tagContainer.appendChild(roundedTagFeatured);
        roundedTagFeatured.appendChild(featured);
    }


    
}
animation('.card',1.7)
 
}); 


console.log(document.querySelectorAll('.job-tag').length);
document.querySelectorAll('job-tag').forEach(element => {
  element.addEventListener('click',function(e) {
   console.log('hej');
   const tag = document.createElement('div');
  
    const textarea = document.querySelector('.job-tag-inner span');
    e.classList.toggle('active');
    if (jobTag.classList.contains('active')) {

        jobTagInner.style.backgroundColor = "hsl(180, 29%, 50%)";
        textarea.style.color = "hsl(180, 52%, 96%)";
    }
    else{
        jobTagInner.style.backgroundColor = "hsl(180, 52%, 96%)"
        textarea.style.color = "hsl(180, 29%, 50%)";
    }
    const nav = document.querySelector('.left-container-navbar');


    const leftTag = document.createElement('div');  
      tag.appendChild(leftTag);
    leftTag.classList.add('left-tag');
    const removeBtn = document.createElement('div');
    const removeImg = document.createElement('img');
  tag.appendChild(removeBtn);
  removeBtn.classList.add('remove-btn');
    const span = document.createElement('span'); 
     leftTag.appendChild(span);
    span.innerText = e.target.innerText;
    selectedTags.push(e.target.innerText);
   
 checkArray(selectedTags,tag,e);



    removeImg.classList.add('remove');
    removeImg.src = "./images/icon-remove.svg";
    removeBtn.appendChild(removeImg);
    nav.appendChild(tag);
    tag.classList.add('tag');
    console.log(selectedTags);
    singleAnim(`${getLastElement()}`,1.0);
  
  });
});