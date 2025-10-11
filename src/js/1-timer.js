import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

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
    window.alert("Please choose a date in the future");
   }else{
    startBtn.disabled= false;
    userSelectedDate =selectedDate;
   }
  },});


  startBtn.addEventListener("click", handlerclick);

  function handlerclick(){
      startBtn.disabled = true;

    teimerId = setInterval(() => {
  const now = new Date;
  const timeLeft = userSelectedDate - now;

  if(timeLeft <=0){
    clearInterval(timerId);
    return;
  }

    }, 1000);
  }