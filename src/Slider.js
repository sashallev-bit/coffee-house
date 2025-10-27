const slider2 = document.querySelector('#favorites-coffee');
const timeInterval = 6000;
function slider(slider1='') {
  let slides = slider2.querySelector('.row-slider'),
  slideItem = slides.querySelectorAll('.slide'),
  currentIndex =0,
  slideCount = slideItem.length,
  slideWidth = slideItem[0].offsetWidth,
  cloneFirst = slideItem[0].cloneNode(true),
  cloneLast = slideItem[slideCount-1].cloneNode(true),
  
  arrows = slider2.querySelectorAll('.arrow-button'), 
  controls = slider2.querySelector('.controls')
  controlWidth = controls.querySelectorAll('.control')[0].offsetWidth;

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  arrows.forEach((arrow, index) => {
    arrow.addEventListener('click', (event) => {
        console.log('arrow', event.target, index);
        if (index === 0) {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : slideCount - 1;
       } else {
        currentIndex = currentIndex < slideCount - 1 ? currentIndex + 1 : 0;
       }  
    });

  });

  function bindEvents() {
    leftButton.addEventListener('click', () => leftShifting());
    rightButton.addEventListener('click', () => rightShifting());
    root.addEventListener('mouseenter', () => stopAuto());
    root.addEventListener('mouseleave', () => startAuto());
  }

  function rightShifting() {
    goTo(this.currentIndex + 1);
  }

  function leftShifting() {
    goTo(this.currentIndex - 1);
  }

  function goTo(index) {
    const total = this.slides.length;
    currentIndex = (index + total) % total;
    updatePosition();
  }

  function updatePosition() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === this.currentIndex));
    controls.forEach((d, i) => d.classList.toggle('active', i === this.currentIndex));
  }


}

export default slider;