export default class Card {
  constructor(data, cardSetting, disabledAllInputs) {
    this.data = data;
    this._cardSetting = cardSetting;
    this.isChecked = false;
    this._disabledAllInputs = disabledAllInputs;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSetting.cardTemplateSelector)
      .content
      .querySelector(this._cardSetting.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListener = () => {
    this._cardInputDecor.addEventListener('click', () => {
      if (!this.isChecked) {
        this._disabledAllInputs();

        this.enableInput();
      }
    });
  }

  enableInput = () => {
    this.isChecked = true;
    this._cardInput.checked = true;
  }

  disableInput = () => {
    this.isChecked = false;
    this._cardInput.checked = false;
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._card.querySelector(this._cardSetting.cardNumberSelector).textContent = this.data.cardNumber;
    this._card.querySelector(this._cardSetting.cardIconSelector).src = this.data.cardUrlIcon;

    this._cardInput = this._card.querySelector(this._cardSetting.cardInputSelecor);
    this._cardInputDecor = this._card.querySelector(this._cardSetting.cardInputDecorSelecor);

    this._setEventListener();

    return this._card;
  }
}
