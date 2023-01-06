const wrapper = document.querySelector('.card-wrapper');
const clearBtn = document.querySelector('.clear');
let elements = {
    div1: "card",
    div2: "centerlized",
    div3: "left-card-container",
    div4: "right-card-container",
    img: "logo",
    div5: "company-content",
    div6: "top-card-container",
    span1: "company",
    div7: "middle-card-container",
    a: "position",
    div8: "bottom-card-container",
    span2: "postedAt",
    span3: "contract",
    span4: "location",
    div9: "job-tag",
    div10: "job-tag-inner",
    span5: "role",
    span6: "languages",


  };
  let selectedTags = [];
  let tags = {
        div: "tag-container",
        span: "",
        text: "",
  }
  const propertyNames = Object.keys(elements);
  const propertyValues = Object.values(elements);

function checkArray(index) {
  
    if (index == 0) {
        return true;
    }
    else{
        return(selectedTags.includes('Frontend') || selectedTags.includes('Fullstack'));
        
    }
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

clearBtn.addEventListener('click',function() {
 selectedTags.splice(0,selectedTags.length);
 const navbar = document.querySelector('left-container-navbar');
 const tag = document.querySelectorAll('.tag');
 
 for (let index = 0; index < tag.length; index++) {
    tag[index].remove();

   }

});

fetch('./data.json')
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

jobTag.addEventListener('click',function(e) {
    // selectedTags.every(checkArray);
    const textarea = document.querySelector('.job-tag-inner span');
    jobTag.classList.toggle('active');
    if (jobTag.classList.contains('active')) {

        jobTagInner.style.backgroundColor = "hsl(180, 29%, 50%)";
        textarea.style.color = "hsl(180, 52%, 96%)";
    }
    else{
        jobTagInner.style.backgroundColor = "hsl(180, 52%, 96%)"
        textarea.style.color = "hsl(180, 29%, 50%)";
    }
    // console.log(checkArray());
    const nav = document.querySelector('.left-container-navbar');
    const tag = document.createElement('div');

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
   




    removeImg.classList.add('remove');
    removeImg.src = "./images/icon-remove.svg";
    removeBtn.appendChild(removeImg);
    nav.appendChild(tag);
    tag.classList.add('tag');
    console.log(selectedTags);
    animation('.tag',1.0);
});
    
}
animation('.card',1.7)
 
}); 

