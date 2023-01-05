const btn = document.querySelector('.circle');
const display = document.querySelector('h2');
const id = document.querySelector('#id-tag');

btn.addEventListener('click',function () {
    fetch('https://api.adviceslip.com/advice')
  .then((response) => response.json())
  .then((data) => {

     display.innerText = "“" + data.slip.advice+ "”";
    id.innerHTML = data.slip.id;
    });
});
