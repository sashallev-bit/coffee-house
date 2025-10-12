

class ShortCardHolder {
    constructor(url) {
        this.url = url; // путь к HTML-шаблону
        this.template = null;
    }

    async loadTemplate() {
    if (this.template) return this.template;

    const response = await fetch(this.url);
    const text = await response.text();

    const temp = document.createElement('div');
    temp.innerHTML = text.trim();

    this.template = temp.querySelector('template');
    return this.template;
  }

   async bind(product) {
    if (!this.template) await this.load();

    const node = this.template.content.cloneNode(true);

    for (const [key, value] of Object.entries(product)) {
      const element = node.querySelector(`.${key}`);
      if (el) {
        switch(key) {
            case 'image': {
                setBackgroundSmooth(el, value)
            }
            case 'sizes':
            case 'additivas': {
                // handle 'additivas' case here
                break;
            }
            default: {
                element.textContent = value
                break;
            }
        }
      }
    }

    return node;
  }

  async setBackgroundSmooth(el, url) {
  const img = new Image();
  img.src = url;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  el.style.backgroundImage = `url("${url}")`;

  // небольшая задержка, чтобы CSS-анимация сработала
  requestAnimationFrame(() => {
    el.style.opacity = '1';
  });
}
}