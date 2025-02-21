export default class AddButton {
  constructor(parentEl, dataUI, cardFormCreate) {
    this.parentEl = parentEl;
    this.dataUI = dataUI;
    this.cardFormCreate = cardFormCreate;

    this.onClick = this.onClick.bind(this);
  }

  static get markup() {
    return `
         <button class="button addcard">Добавить карточку</button>
         `;
  }

  static get footerSelector() {
    return '.state-footer';
  }

  static get selector() {
    return '.button.addcard';
  }

  bindToDOM() {
    const footElem = this.parentEl.querySelector(AddButton.footerSelector);
    footElem.innerHTML = AddButton.markup;
    this.element = footElem.querySelector(AddButton.selector);
    this.element.addEventListener('click', this.onClick);
  }

  onClick(e) {
    e.preventDefault();
    this.cardFormCreate(this.parentEl, this.dataUI);
  }
}
