import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const clockface = document.querySelectorAll('.js-time');

startBtn.disabled = true;
let userSelectedDate = null;
let timerId = null;

flatpickr(input, {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,


  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
   const now = new Date();

   if ( selectedDate <= now){
    iziToast.show({
    message: 'Please choose a date in the future',
       target: '#datetime-picker',
    backgroundColor: 'red',
         messageColor: 'white',
         target :'#picker-wrapper',
          position: 'topLeft'
})
   }else{
    startBtn.disabled= false;
    userSelectedDate =selectedDate;
   }
  },});


  startBtn.addEventListener("click", handlerclick);

  function handlerclick(){
      startBtn.disabled = true;

    timerId = setInterval(() => {
  const now = new Date;
  const timeLeft = userSelectedDate - now;

  if(timeLeft <=0){
    clearInterval(timerId);
    updateTime({days:0, hours:0, minutes:0, seconds:0});
    return;
  }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTime({ days, hours, minutes, seconds });
    }, 1000);
  };

  

  function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTime ({seconds, minutes, hours, days}){
  const values = [String(days).padStart(2, '0'), String(hours).padStart(2, '0'), String(minutes).padStart(2, '0'), String(seconds).padStart(2,"0") ];
  clockface.forEach((el, i) => {
    el.textContent= values[i];
  });
}

