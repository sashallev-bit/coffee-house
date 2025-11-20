
type SliderOptions = {
  container: HTMLElement | string; 
  slides: string[];                
  interval?: number;          
  startIndex?: number; 
};

class SliderVeiw {
  private root: HTMLElement;
  private sliderList: HTMLUListElement;
  private slideList: HTMLLIElement[];
  private leftButton: HTMLButtonElement;
  private rightButton: HTMLButtonElement;
  private controls: HTMLElement;
  private controlList: HTMLElement[] = [];

  private currentIndex: number;
  private interval: number;
  private slideTimeOut?: number | undefined;
  
  constructor(selector: string, options: SliderOptions) {
    const container =
      typeof options.container === 'string'
        ? document.querySelector(options.container)
        : options.container;

    if (!(container instanceof HTMLElement)) {
      throw new Error('Invalid container element');
    }
    this.root = document.createElement('div');
    this.root.className = 'slider';
    container.appendChild(this.root);
    this.interval = options.interval ?? 4000;
    this.currentIndex = options.startIndex ?? 0;

    this.sliderList = this.createSliderList(options.slides);
    this.leftButton = this.createButton('‹', 'slider__button--prev');
    this.rightButton = this.createButton('›', 'slider__button--next');
    this.controls = this.createControls(options.slides.length);

    this.root.append(this.leftButton, this.sliderList, this.rightButton, this.controls);
    this.bindEvents();
    this.update();
    this.startAuto();
  }

    createSliderList(slideList: Array<CartViewHolder>): HTMLUListElement  {
        let list = document.createElement('lu');
        list.classList.add('hhhh')
        slideList.forEach(slide => {
           
          list.appendChild(slide)
        });

        return list;
    }

    private getElement<T extends HTMLElement>(selector: string, type: { new(): T }): T {
    const el = this.root.querySelector(selector);
    if (!(el instanceof type)) throw new Error(`Missing element ${selector}`);
    return el;
  }

  private bindEvents() {
    this.leftButton.addEventListener('click', () => this.prev());
    this.rightButton.addEventListener('click', () => this.next());
    this.root.addEventListener('mouseenter', () => this.stopAuto());
    this.root.addEventListener('mouseleave', () => this.startAuto());
  }

   public next() {
    this.goTo(this.currentIndex + 1);
  }

  public prev() {
    this.goTo(this.currentIndex - 1);
  }

  private createButton(text: string, className: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = `slider__button ${className}`;
    btn.textContent = text;
    return btn;
  }

  private createControls(count: number): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('slider__controls');

    for (let i = 0; i < count; i++) {
      const control = document.createElement('div');
      control.classList.add('slider__control');
   //   control.addEventListener('click', () => this.goTo(i));
      container.appendChild(control);
      this.controlList.push(control);
    }

    return container;
  }

  private update() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    this.slides.forEach((s, i) => s.classList.toggle('slider__slide--active', i === this.currentIndex));
    this.dots.forEach((d, i) => d.classList.toggle('slider__dot--active', i === this.currentIndex));
  }

  public goTo(index: number) {
    const total = this.slides.length;
    this.currentIndex = (index + total) % total;
    this.update();
  }

  private startAuto() {
    this.stopAuto();
    this.slideTimeOut = window.setInterval(() => this.next(), this.interval);
  }

  private stopAuto() {
    if (this.slideTimeOut) {
      clearInterval(this.slideTimeOut);
      this.slideTimeOut = undefined;
    }
  }


}