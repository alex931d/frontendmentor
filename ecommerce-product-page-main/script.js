const previews = document.querySelectorAll('.preview');
const lightbox = document.querySelector('.lightbox');  
const dialogPreviews = document.querySelectorAll(`dialog .preview`)
const lightboxImage = document.querySelector('.lightbox-image');
const closeButton = document.querySelector('.close-button');
const arrowLeft = document.querySelector(".arrow-left")
const arrowLeftMain = document.querySelector(".arrow-left-main")
const arrowRight = document.querySelector(".arrow-right");
const arrowRightMain = document.querySelector(".arrow-right-main");
const addToCart = document.querySelector(".add-to-cart");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const itemCount = document.querySelector(".item-count");
const cart = document.querySelector(".cart");
const itemContainer = document.querySelector(".items")
const cartMenu = document.querySelector("#cart-1");
const cartContainer = document.querySelector(".cart-menu-content");
const burgerMenu = document.querySelector(".menu .burger");
const largeImage  = document.querySelector(".large")
let items = 0;
let currentImageIndex;
var indexs = 0;
function template(data) {
  if (data.image == undefined) {
    let template = `
    <span>no items</span>
    `
    return template;
  }
  else{
        let template = `
    <div class="item">
    <div class="item-content">
         <img class="item-image" src="${data.image}" alt="item1">
         <div class="item-text">
               <span class="title">${data.title}</span>
                <div class="item-price">
                     <span>${data.price} x ${data.count} <span class="total">$${data.total}.00</span></span>
                </div>
         </div>
         <img class="delete" src="./images/icon-delete.svg" alt="delete">
    </div>
</div>
    `;
    return template;
  }

}


window.addEventListener("load",()=>{
    if (localStorage.getItem("item")) {
        const item = JSON.parse(localStorage.getItem("item"))
        if (item.title == undefined) {
          itemContainer.innerHTML = 0
        }
        else{
           itemContainer.innerHTML = item.count;
        }
       
            cartContainer.innerHTML += template(item);
            document.querySelector("#cart-2 .cart-menu-content").innerHTML += template(item);
  
    }
    const deletebtn = document.querySelector(".delete")
    deletebtn.addEventListener("click",()=>{
      localStorage.setItem("item", JSON.stringify(""));
      window.location.reload()
    });
})

const smallDevice = window.matchMedia("(max-width: 900px)");

smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches)
  {
    lightbox.close() 
  } 
}

// Run it initially
handleDeviceChange(smallDevice);

cart.addEventListener("click",()=>{ 
  cartMenu.classList.toggle("active");
  document.querySelector("#cart-2").classList.toggle("active")
  });


burgerMenu.addEventListener("click",()=>{
    burgerMenu.classList.toggle("active")
    if (burgerMenu.classList.contains("active")) {
        document.querySelector(".sub-menu").style.display = "flex"
        document.querySelector(".overlayer").style.display = "flex"
        burgerMenu.style.color= "white"
    }
    else{
        document.querySelector(".sub-menu").style.display = "none"
        burgerMenu.style.color= "black"
        document.querySelector(".overlayer").style.display = "none"
    }
})

previews.forEach((preview, index) => {
    preview.addEventListener('click', () => {
      currentImageIndex = index;
      lightboxImage.src = preview.src.slice(0, length - 14) + ".jpg";
      if (!lightbox.open) {
        dialogPreviews.forEach((p) => {
        p.classList.remove("highlight")
        });
      lightbox.showModal();
   currentImageIndex = (currentImageIndex +  dialogPreviews.length - 1) %  dialogPreviews.length
   if (currentImageIndex == 3) {
    dialogPreviews[0].classList.add("highlight")
   }
   else{
    dialogPreviews[currentImageIndex + 1].classList.add("highlight")
   }
      }
    });
  });
  dialogPreviews.forEach((preview, index) => {
    preview.addEventListener('click', () => {
      currentImageIndex = index;
      lightboxImage.src = preview.src.slice(0, length - 14) + ".jpg";
      highlightPreview();
    });
  });

  minus.addEventListener("click",()=>{
    if (items == 0) {
        return;
    }   
    else{
        items--;
    }
    itemCount.innerHTML = items;
  });
  plus.addEventListener("click",()=>{
    items++;
    itemCount.innerHTML = items;
  });
  


  addToCart.addEventListener("click",()=>{
    if (items != 0) {
        const item = {
            image: "./images/image-product-1-thumbnail.jpg",
            title: "fall limited edition sneakers",
            price: "$125.00",
            count: items,
            total: 125 * items
        }
        if (item != undefined) {
            localStorage.setItem("item", JSON.stringify(item));
            if (localStorage.getItem("item")) {
                const item = JSON.parse(localStorage.getItem("item"))
                itemContainer.innerHTML = item.count;
                    cartContainer.innerHTML += template(item);
            }
        }
        window.location.reload();
    }
  })
  arrowLeftMain.addEventListener("click",()=>{
         largeImage.src =  dialogPreviews[indexs++].src.slice(0, length - 14) + ".jpg";
         if (indexs >= 4) {
            indexs = 0;
         }
});
    arrowLeft.addEventListener("click",()=>{
    currentImageIndex = (currentImageIndex +  dialogPreviews.length - 1) %  dialogPreviews.length;
         lightboxImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";
         largeImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";

         highlightPreview();
});

arrowRightMain.addEventListener("click",()=>{
    largeImage.src =  dialogPreviews[indexs--].src.slice(0, length - 14) + ".jpg";
    if (indexs < 0) {
        indexs = 4;
     }
});
arrowRight.addEventListener("click",()=>{
    currentImageIndex = (currentImageIndex + 1) %  dialogPreviews.length;
      lightboxImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";
      largeImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";
      highlightPreview();
});
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      lightbox.close();
    } else if (event.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex +  dialogPreviews.length - 1) %  dialogPreviews.length;
      lightboxImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";
      highlightPreview();
    } else if (event.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) %  dialogPreviews.length;
      lightboxImage.src =  dialogPreviews[currentImageIndex].src.slice(0, length - 14) + ".jpg";
      highlightPreview();
    }
  });
  lightbox.addEventListener("click", e => {
    const dialogDimensions = lightbox.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      lightbox.close()
    }
  })
  function highlightPreview() {
    dialogPreviews.forEach((p, i) => {
      if (i === currentImageIndex) {
        p.classList.add('highlight');
      } else {
        p.classList.remove('highlight');
      }
    });
  }