function template(data) {
    let template = `
    <div class="todo-item">
        <div class="row">
        ${data.todo_status === "completed" ? 
        `
        <div class="todo-item-button"> 
        <a href="../model/_update-todo.php?id=${data.todo_id}">
             <div class="circle-btn  completed-img">
               <img src="./images/icon-check.svg" alt="check">
              </div>    
              </a>
             </div>
        `
        :
         `
        <div class="todo-item-button"> 
        <a href="../model/_update-todo.php?id=${data.todo_id}">
             <div class="circle-btn">
              </div>    
              </a>
             </div>
        `}
                 ${data.todo_status === "completed" ? `
                 <span class="completed">${data.todo_name}</span>
                 `
                 : 
                 `
                <span>${data.todo_name}</span>
                 `} 
                 </div>
               <div class="todo-remove"> 
                    <a href="../model/_remove-todo.php?id=${data.todo_id}">
                 <div class="x-btn">
                    𝗑
                  </div>    
                  </a>
                 </div>
        </div>
    `;
    return template;
}



const btnSwitcher = document.querySelector("nav img");
function toggleTheme(){
    window.theme = typeof(window.theme)==='string' ? window.theme : 'light';
    var switchToTheme = window.theme === 'light' ? 'dark' : 'light';
    window.theme = switchToTheme;
    window.localStorage.setItem('data-theme', switchToTheme)
    document.querySelector('body').setAttribute('data-theme',switchToTheme);
}
btnSwitcher.addEventListener("click",()=>{
          toggleTheme();  


    btnSwitcher.classList.toggle("active");
    if (btnSwitcher.classList.contains("active")) {
        btnSwitcher.src ="../views/images/icon-sun.svg"
    }
    else{
        btnSwitcher.src ="../views/images/icon-moon.svg"
    }
});

window.addEventListener("load",()=>{      
    if (window.localStorage.getItem('data-theme')) {
        if (window.localStorage.getItem('data-theme') == 'dark') {
            btnSwitcher.src ="../views/images/icon-sun.svg"
            btnSwitcher.classList.toggle("active");
        }
         document.querySelector('body').setAttribute('data-theme',window.localStorage.getItem('data-theme')); 
    }
    const list = document.querySelector(".item-container");
    fetch("../model/data.json")
    .then((res) => res.json())
    .then(function(data) {
    
        data.forEach(element => {  
              list.innerHTML += template(element);
        });
      
        document.querySelector(".middle-filter #all").addEventListener("click",function(){
            const items = document.querySelectorAll(".todo-item");
            items.forEach(item =>{
               item.remove()
            })
            data.forEach(element => {  
                list.innerHTML += template(element);
          });    
       
          })  
          document.querySelector(".middle-filter .active").addEventListener("click",function(){
        const items = document.querySelectorAll(".todo-item");
         items.forEach(item =>{
            item.remove()
         })
            let newData = data.filter((status)=>{
              if (status.todo_status == "active") {
                     return status;
               
              }
            });
            if (newData[0] == undefined) {
                data.forEach(element => {    
                    list.innerHTML += template(element);
              });
            }
            else{
             newData.forEach(element => {   
                  list.innerHTML += template(element); 
              });
            }
          })
         
          document.querySelector(".middle-filter .complete").addEventListener('click',()=>{ 
            const items = document.querySelectorAll(".todo-item");
            items.forEach(item =>{
                item.remove()  
                 console.log(item)
             })
            newData = data.filter((status) => {
                if (status.todo_status == "completed") {
                     return status;
                }
               
              });
            if (newData[0] == undefined) {    
    
                data.forEach(element => {     
                    list.innerHTML += template(element);
              });
            }
            else{    
                newData.forEach(element => {      
                   list.innerHTML += template(element);
                 });
               }
          })
        })
      
    })
