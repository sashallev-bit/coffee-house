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




}

export default slider;