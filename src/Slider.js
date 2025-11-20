
const timeInterval = 6000;
let shiftRepeate = null;
let progressRepeate = null;
let currentTime = 0;
let currentGradientPersent = 0;
let currentIndex = 0;
const slideTimeOut = timeInterval;
let timeout;

export function slider(root) {
  let slides = root.querySelector('.row-slider'),
  slideItem = slides.querySelectorAll('.slide'),

  slideCount = slideItem.length,
  firstSlide = slideItem[0],
  slideWidth = firstSlide.offsetWidth,
  cloneFirst = firstSlide.cloneNode(true),
  cloneLast = slideItem[slideCount-1].cloneNode(true),
  arrows = root.querySelectorAll('.arrow-button'), 
  leftButton = arrows[0],
  rightButton = arrows[arrows.length - 1],
  controls = root.querySelector('.controls');

  slides.appendChild(cloneFirst);
  slides.insertBefore(cloneLast, firstSlide);
  slides.style.width = '500%'
  slides.style.transform = `translateX(${-slideWidth}px)`;

  function bindEvents() {
    leftButton.addEventListener('click', () => leftShifting());
    rightButton.addEventListener('click', () => rightShifting());
    root.addEventListener('mouseenter', () => stopAuto());
    root.addEventListener('mouseleave', () => startAuto());
    slides.addEventListener('transitionend', () => checkCurrienIndex());
    window.addEventListener('resize', () => debounce(ll, 200));
  }  

  function debounce (func, delay) {
    clearTimeout(timeout);
    slideWidth = firstSlide.offsetWidth;
    timeout = setTimeout(func, delay);
  }

  const ll = () => { 
    timeout = null; 
    slides.style.transform = `translateX(${-((currentIndex + 1) * slideWidth)}px)`;
  }

  function startAuto() {
    if(progressRepeate) window.clearInterval(progressRepeate);
    checkCurrienIndex();
    if(progressRepeate) window.clearInterval(progressRepeate);
    shiftRepeate = setIntervalImmediate(() => {
      rightShifting();
    }, slideTimeOut - currentTime, slideTimeOut); 
  }

  function setIntervalImmediate(fn, timeout, interval) {
    setTimeout(fn, timeout)
    return setInterval(fn, interval);
  } 
  
  function rightShifting() {
    goTo(currentIndex + 1);
  }

  function leftShifting() {
    goTo(currentIndex - 1);
  }

  function goTo(index) {
    currentIndex = index;
    updatePosition();
  }

  function updatePosition() {

    slides.classList.add('shifting');
    const offset = -(currentIndex + 1) * slideWidth;
    if(progressRepeate !== null) {
      window.clearInterval(progressRepeate);
      currentTime = 0;
      currentGradientPersent = 0;
    }
    slides.style.transform = `translateX(${offset}px)`;
  }

  function checkCurrienIndex(){

    slides.classList.remove('shifting');
    
    while (currentIndex < 0 || currentIndex > slideItem.length - 1) {
      currentIndex = (currentIndex + slideItem.length) % slideItem.length;
    }

    slides.style.transform = `translateX(${-((currentIndex + 1) * slideWidth)}px)`; 

    controls.querySelectorAll('.control').forEach((d, i) => {
      if(i === currentIndex) {
        controlProgress(d);
      } else {
        d.style.background = 'rgb(193, 182, 173)';
      }
    });
  }

  bindEvents();
  startAuto();
}

export function stopAuto() {
  if(shiftRepeate) window.clearInterval(shiftRepeate);
  shiftRepeate = null;
  if(progressRepeate) window.clearInterval(progressRepeate);
  progressRepeate = null;
}

function controlProgress(control) {
  const gradientInterval = slideTimeOut / 100;
  progressRepeate = window.setInterval (() => {
    updateGradient(gradientInterval, control, progressRepeate)
  }, gradientInterval);
} 

function updateGradient(gradientInterval, control, repeate) {
  currentTime += gradientInterval; 
  let gradientPersent = currentTime / slideTimeOut * 100;
  currentGradientPersent = gradientPersent;
  control.style.background = `linear-gradient(to right, rgb(102, 95, 85) 0%, rgb(102, 95, 85) ${gradientPersent}%, rgb(193, 182, 173) ${gradientPersent}%, rgb(193, 182, 173) 100%)`;
  if(currentTime > slideTimeOut ) {
    window.clearInterval(repeate);
    currentTime = 0;
    currentGradientPersent = 0;
  }
}