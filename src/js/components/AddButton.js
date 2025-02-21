export default class AddButton {
  constructor(parentEl, dataUI, CardForm) {
    this.parentEl = parentEl;
    this.dataUI = dataUI;
    this.CardForm = CardForm;

    this.onClick = this.onClick.bind(this);
  }

  static get markup() {
    return `
         <button class="button addcard">Добавить карточку</button>
         `;
  }

  static get selector() {
    return '.button.addcard';
  }

  bindToDOM() {
    this.parentEl.innerHTML = AddButton.markup;
    this.element = this.parentEl.querySelector(AddButton.selector);
    this.element.addEventListener('click', this.onClick);
  }

  onClick(e) {
    e.preventDefault();
    const cardForm = new this.CardForm(this.parentEl, this.dataUI, AddButton);
    cardForm.bindToDOM();
  }
}
