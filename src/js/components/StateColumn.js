const showClose = (e) => {
  const el = e.target.querySelector('.item-close') || e.target.parentElement.querySelector('.item-close');
  el.style.visibility = 'visible';
};

const hideClose = (e) => {
  const el = e.target.querySelector('.item-close') || e.target.parentElement.querySelector('.item-close');
  el.style.visibility = 'hidden';
};

const removeItem = (e) => {
  e.target.parentNode.remove();
};

export default class StateColumn {
  constructor(parentEl, caption, data) {
    this.parentEl = parentEl;
    this.caption = caption;
    this.data = data;

    this.markup = this.markup.bind(this);
    this.addItem = this.addItem.bind(this);

    this.initData = this.initData.bind(this);

    // this.removeItem = this.removeItem.bind(this);
    // this.showClose = this.showClose.bind(this);
    // this.hideClose = this.hideClose.bind(this);
  }

  markup() {
    return `
      <div class="state-header">
        <h3>${this.caption}</h3>
      </div>
        <div class="state-content">
          <ul class="items"></ul>
        </div>
       <div class="state-footer"></div>
          `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.markup(this.caption);

    this.items = this.parentEl.querySelector('.items');

    this.initData();
  }

  addItem(prm) {
    const item = document.createElement('li');
    item.classList.add('items-item');

    const itemText = document.createElement('div');
    itemText.classList.add('item-text');
    itemText.textContent = prm;

    const itemCloseIcon = document.createElement('div');
    itemCloseIcon.classList.add('item-close');

    item.appendChild(itemText);
    item.appendChild(itemCloseIcon);

    this.items.appendChild(item);

    item.addEventListener('mouseover', showClose);
    item.addEventListener('mouseout', hideClose);

    itemCloseIcon.addEventListener('click', removeItem);
  }

  initData() {
    this.data.forEach((element) => {
      this.addItem(element.content);
    });
  }
}
