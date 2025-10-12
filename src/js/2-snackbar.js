import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
// const btn = form.querySelector(".button");
// const inputfilled = form.querySelector('.input[value="fulfilled"] ');
// const inputRejected = form.querySelector('.input[value="rejected"]');
// const numberOfDelay = form.querySelector('.form input[name="delay"]');

form.addEventListener("submit", handlerSubmit);
function handlerSubmit(e){
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.success({
        title: 'Fulfilled',
        message: message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Rejected',
        message: message,
        position: 'topRight',
      });
    });
}


