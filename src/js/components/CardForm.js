export default class CardForm {
  constructor(parentEl, dataUI, AddButton) {
    this.parentEl = parentEl;
    this.dataUI = dataUI;
    this.AddButton = AddButton;
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  static get markup() {
    return `
          <form class="card-form">
            <textarea name="" class="card-text"></textarea>
            <div calss="buttons">
              <button class="button submit">Добавить</button>
              <div class="button close"></div>
            </div>  
          </form>
          `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get closeSelector() {
    return '.close';
  }

  static get inputSelector() {
    return '.card-text';
  }

  static get selector() {
    return '.card-form';
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardForm.markup;

    this.element = this.parentEl.querySelector(CardForm.selector);
    this.submit = this.element.querySelector(CardForm.submitSelector);
    this.input = this.element.querySelector(CardForm.inputSelector);
    this.close = this.element.querySelector(CardForm.closeSelector);

    this.element.addEventListener('submit', this.onSubmit);
    this.close.addEventListener('click', this.onClose);
  }

  onSubmit(e) {
    e.preventDefault();
    if (e.target[0].value.trim() !== '') {
      this.dataUI.addItem(e.target[0].value);
    }
    this.input.value = '';
  }

  onClose(e) {
    e.preventDefault();

    const addButtonContainer = this.parentEl;
    const addButton = new this.AddButton(addButtonContainer, this.dataUI);
    addButton.bindToDOM();
  }
}
