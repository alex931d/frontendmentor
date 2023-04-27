
function generateComment(data, currentUsername) {

  let templateComment = `
    <div class="comment" id="comment-${data.id}">
      <div class="comment-inner">
        <div class="first-comment-container">
          <div class="vote-container">
            <div class="vote-container-inner">
            <canvas class="confetti-canvas"></canvas>
            <span class="upvote">+</span>
            <span class="score">${data.score}</span>
            <span class="downvote">-</span>
            </div>
          </div>
        </div>
        <div class="last-comment-container">
          <div class="last-header-comment-container">
            <div class="last-header-comment-container-first">
            ${data.user.username !== currentUsername ?
              `   
               <div class="profile-image" style="background-image: url(.${data.user.image.webp});"></div>
              <span class="username">${data.user.username}</span>
              <span class="postedAgo">${timeAgo(data.createdAt)}</span>
              `
              :
              `
              <div class="profile-row">
              <div class="profile-image" style="background-image: url(.${data.user.image.webp});"></div>
              <span class="username">${data.user.username}</span>
              <span class="postedAgo">${timeAgo(data.createdAt)}</span>
              </div>
              <div class="you">
                <span>you</span> 
             </div>
              `}
          
            </div>
            <div class="last-header-comment-container-last">
              ${data.user.username !== currentUsername ? `
                <button class="reply-btn">
                  <img src="../images/icon-reply.svg" alt="reply-icon">
                  <span class="crud-symbols-m1">Reply</span>
                </button>` : ` <button class="delete-btn">
                <img src="../images/icon-delete.svg" alt="delete-icon">
                <span class="crud-symbols-m1">Delete</span>
              </button>
              <button class="edit-btn">
                <img src="../images/icon-edit.svg" alt="edit-icon">
                <span class="crud-symbols-m1">Edit</span>
              </button>
              `}
            </div>
          </div>

          <div class="last-comment-area-container">
            <p>${highlight(data.content)}</p>
          </div>
        </div>
      </div>
      ${data.replies?.length > 0 ? `
      <div class="replys">
        ${data.replies.map(reply => `
        <div class="comment" data-replyId="${reply.replyId}"  id="comment-${reply.id}">
          <div class="comment-inner">
            <div class="first-comment-container">
              <div class="vote-container">
                <div class="vote-container-inner">
                <canvas class="confetti-canvas"></canvas>
                  <span class="upvote">+</span>
                  <span class="score">${reply.score}</span>
                  <span class="downvote">-</span>
                </div>
              </div>
            </div>
            <div class="last-comment-container">
              <div class="last-header-comment-container">
                <div class="last-header-comment-container-first">
                ${reply.user.username !== currentUsername ?
                  `   
                   <div class="profile-image" style="background-image: url(.${reply.user.image.webp});"></div>
                  <span class="username">${reply.user.username}</span>
                  <span class="postedAgo">${timeAgo(reply.createdAt)}</span>
                  `
                  :
                  `
                  <div class="profile-row">
                  <div class="profile-image" style="background-image: url(.${reply.user.image.webp});"></div>
                  <span class="username">${reply.user.username}</span>
                  <span class="postedAgo">${timeAgo(reply.createdAt)}</span>
                  </div>
                  <div class="you">
                    <span>you</span> 
                 </div>
                  `}
                </div>
                <div class="last-header-comment-container-last">
                ${reply.user.username !== currentUsername ? ` ` : ` <button class="delete-btn">
                <img src="../images/icon-delete.svg" alt="delete-icon">
                <span class="crud-symbols-m1">Delete</span>
              </button>
              <button class="edit-btn">
                <img src="../images/icon-edit.svg" alt="edit-icon">
                <span class="crud-symbols-m1">Edit</span>
              </button>
              `}
                </div>
              </div>
              <div class="last-comment-area-container">
                <p>${highlight(reply.content)}</p>
              </div>
            </div>
            </div>
          </div>
        `).join("")}
      </div>
    ` : `<div class="replys"></div>`}
    </div>
  `;
  return templateComment;
}
function modal() {
  let tempateModal = `
  <div id="popup" class="modal" style="display:none;">
  <div class="modal-content">  
  <h2>delete comment</h2>
    <div class="modal-inner-container"> 
      <p>are you sure you want to delete this comment? this will remove the comment and can't be undone.</p>
      <div class="modal-row">
         <button class="cancel">
             <span>no, cancel</span>
         </button>
         <button class="delete">
         <span>yes, delete</span>
         </button>
      </div>
    </div>
  </div>
</div>
  `;

  return tempateModal;
}
function edit(content) {
  let template =
    `
  <div class="column-container">
  <form class="edit-send">        
            <textarea name="content">${content}, </textarea>
            <button type="submit" name="submit">edit</button>
       </form>
  </div>
  `;
  return template;
}
function reply(data, ReplyToUser) {
  let template =
    `
  <div class="comment draft">
  <div class="comment-add">
  <div class="comment-add-inner">
       <form class="new-reply-send" action="/reply/post" method="POST">        
        <div class="profile-image" style="background-image: url(.${data.currentUser.image.webp});"></div>
            <textarea name="content">@${ReplyToUser}, </textarea>
            <button type="submit" name="submit">reply</button>
       </form>
  </div>
</div>
  </div>
  `
  return template;
};
function highlight(text) {
  if (text.includes("@")) {
   const tmp = text.split(" ",1)
   let fullText = `<span class="highlighted">${tmp}</span> ${text}`;
  return fullText;
  }
  return text;
}
function timeAgo(currentTime) {
  const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
  const ONE_MONTH = 30 * ONE_DAY; // milliseconds in a month
  const ONE_YEAR = 365 * ONE_DAY; // milliseconds in a year

  const timeDiff = Date.now() - parseInt(currentTime);

  if (timeDiff < ONE_DAY) {
    return "Less than a day ago";
  } else if (timeDiff < ONE_MONTH) {
    const daysAgo = Math.floor(timeDiff / ONE_DAY);
    return `${daysAgo} days ago`;
  } else if (timeDiff < ONE_YEAR) {
    const monthsAgo = Math.floor(timeDiff / ONE_MONTH);
    return `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(timeDiff / ONE_YEAR);
    return `${yearsAgo} years ago`;
  }
}

// gsap animation stagger
function animation(element, time) {
  gsap.set(`${element}`, {
    autoAlpha: 0,
    transformOrigin: "50% 50%",
    scale: 0.9
  });
  let TL = gsap.timeline({
    defaults: {
      stagger: {
        amount: 1.0

      },
      autoAlpha: 1,
      scale: 1,
      ease: `back.out(${time})`
    }
  });
  TL.to(`${element}`, {});
}
function SingleAim(element, time) {
  gsap.set(element, {
    autoAlpha: 1,
    x: 0,
    transformOrigin: "50% 50%",
    opacity: 1,
  });
  let TL = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      opacity: 0,
      x: -600,
      duration: time,
      ease: "expo.out",
      onComplete: () => { window.location.reload() }
    }
  });
  TL.to(`${element}`, {});
}

function draftAnimation(element, time, draft) {
  gsap.set(element, {
    autoAlpha: 1,
    x: 0,
    transformOrigin: "50% 50%",
    opacity: 1,
  });
  let TL = gsap.timeline({
    defaults: {
      stagger: {
        amount: 1.0
      },
      autoAlpha: 0,
      opacity: 0,
      x: -600,
      duration: time,
      ease: "expo.out",
      onComplete: () => { draft.remove(); }
    }
  });
  TL.to(`${element}`, {});
}
const delay = ms => new Promise(res => setTimeout(res, ms));
window.addEventListener("load", () => {
   load();
  function load() {
 
  
    document.body.innerHTML += modal();
    const wrapper = document.querySelector(".comments");
    fetch("../data.json")
      .then((response) => response.json())
      .then(function (data) {  
        const postForm = document.querySelector(".new-comment-send");
        postForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const newComment = {
            content: postForm.elements.content.value,
            png: data.currentUser.image.png,
            webp: data.currentUser.image.webp,
            username: data.currentUser.username
          }

          fetch('/comment/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
          }).then(function () {
            window.location.reload();
          });

        });
        data.comments.forEach(item => {
          wrapper.innerHTML += generateComment(item, data.currentUser.username);    
          const comment = document.querySelectorAll(".comment");
          comment.forEach(com => {
            if (item.user.username === data.currentUser.username) {
              if (item.id == com.id) {
                console.log(com.id);
              }
            }
            else {

            }
          })
        });
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(button => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const idName = button.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            const splittedId = idName.split("-");
            const id = splittedId[1];
            const popup = document.querySelector("#popup");
            popup.style.display = "block";
            window.onclick = function (event) {
              if (event.target == popup) {
                popup.style.display = "none";
              }
            }
            const popupDelete = document.querySelector(".delete");
            popupDelete.addEventListener("click", () => {
              if (button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.className === "replys") {
                console.log("reply");
                fetch(`/reply/${id}`,
                  {
                    method: 'DELETE',
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then(function () {
                    SingleAim(`#comment-${id}`, 1.9)

                  });
              }
              else {
                fetch(`/${id}`,
                  {
                    method: 'DELETE',
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then(function () {
                    SingleAim(`#comment-${id}`, 1.9)
                  });
              }
            });
          });
        })
        const replyBtns = document.querySelectorAll(".reply-btn");

        replyBtns.forEach((element) => {
          element.addEventListener("click", () => {
            const parentelement = element.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            const getUser = document.querySelector(`#${parentelement} .username`);
            let getReply = document.querySelector(`#${parentelement} .replys`);

            // Check if a .replys element already exists
            if (!getReply) {
              // If not, create a new .replys element
              document.querySelector(`#${parentelement}`).innerHTML += `<div class="replys"></div>`;
              getReply = document.querySelector(`#${parentelement} .replys`);
            }

            const draft = document.querySelector(`#${parentelement} .draft`);
            if (!draft) {
              // If there is no draft, create one
              getReply.innerHTML += reply(data, getUser.innerHTML);
              const draft = document.querySelector(`#${parentelement} .draft`);
              const form = document.querySelectorAll(".new-reply-send")
              form.forEach((item) => {
                item.addEventListener("submit", (e) => {
                  e.preventDefault();
                  const splittedId = parentelement.split("-");
                  const newReply = {
                    content: item.elements.content.value,
                    replyId: splittedId[1],
                    png: data.currentUser.image.png,
                    webp: data.currentUser.image.webp,
                    username: data.currentUser.username
                  }
                  fetch(`/reply/post/${splittedId[1]}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newReply)
                  }).then(function () {
                    window.location.reload();
                  });
                });
              })
              draft.classList.add("active");
            } else if (draft.classList.contains("active")) {
              // If there is a draft, hide it
              draftAnimation(`#${parentelement} .draft`, 1.9, draft);
              draft.classList.remove("active");
            }
          });
        });
        const editBtns = document.querySelectorAll(".edit-btn");
        editBtns.forEach(element => {
          element.addEventListener("click", () => {

            const commentId = element.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            const splittedId = commentId.split("-");
            const getComment = element.parentElement.parentElement.parentElement.parentElement.parentElement;

            const textAreaWrapper = document.querySelector(`#${commentId} .last-comment-area-container`);
            if (getComment.classList.contains("active")) {
              getComment.classList.toggle("active");
            }
            else {
              const content = document.querySelector(`#${commentId} .last-comment-area-container p`);
              textAreaWrapper.innerHTML = "";
              textAreaWrapper.innerHTML += edit(content.innerHTML);
              getComment.classList.toggle("active");
              const form = document.querySelector(`#${commentId} .edit-send`);
              form.addEventListener("submit", (e) => {
                e.preventDefault();
                const updated = {
                  content: form.elements.content.value,
                  createdAt: document.querySelector(`#${commentId} .postedAgo`).innerHTML,
                  score: 0,
                  png: data.currentUser.image.png,
                  webp: data.currentUser.image.webp,
                  username: data.currentUser.username
                }
                if (element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.className === "replys") {
                  const replyIdDiv = document.querySelector(`#${commentId}`)
                  const replyId = replyIdDiv.dataset.replyid


                  const newUpdated = Object.assign(updated, { replyId: replyId })
                  fetch(`/reply/update/${splittedId[1]}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUpdated)
                  }).then(function () {
                    window.location.reload();
                  });
                }
                else {
                  fetch(`/comment/update/${splittedId[1]}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updated)
                  }).then(function () {
                    window.location.reload();
                  });
                }

              });
            }


          });
        })
        const upvoteBtns = document.querySelectorAll(".upvote");
        upvoteBtns.forEach(item => {
          item.addEventListener("click", () => {
            let replyId;
            const commentId = item.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            const replyIdDiv = document.querySelector(`#${commentId}`)
            const splittedId = commentId.split("-");
            const canvas = document.querySelector(`#${commentId} .confetti-canvas`);

            let scoreObj = {
              score: document.querySelector(`#${commentId} .score`).innerHTML
            }
            if (replyIdDiv.dataset.replyid) {
              replyId = replyIdDiv.dataset.replyid;
              scoreObj = Object.assign(scoreObj, { replyId: replyId })
            }
            fetch(`/upvote/${splittedId[1]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(scoreObj)
            }).then(async  ()=> {
              await delay(1800);
              window.location.reload();
            });
            var myConfetti = confetti.create(canvas, {
              resize: true,
            });
            myConfetti({
              particleCount: 16,
              spread: 20,
              startVelocity: 20
            });

          });
        })
        const downvoteBtns = document.querySelectorAll(".downvote");
        downvoteBtns.forEach(button=>{
          button.addEventListener("click",()=>{
            let replyId;
            const commentId = button.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            const replyIdDiv = document.querySelector(`#${commentId}`)
            const splittedId = commentId.split("-");
            const canvas = document.querySelector(`#${commentId} .confetti-canvas`);

            let scoreObj = {
              score: document.querySelector(`#${commentId} .score`).innerHTML
            }
            if (replyIdDiv.dataset.replyid) {
              replyId = replyIdDiv.dataset.replyid;
              scoreObj = Object.assign(scoreObj, { replyId: replyId })
            }
            fetch(`/downvote/${splittedId[1]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(scoreObj)
            }).then(async ()=> {
              await delay(1300);
              window.location.reload();
            });
          });
        });

      })
  }
});

