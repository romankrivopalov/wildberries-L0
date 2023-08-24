export default class Card {
  constructor(data, cardSetting, disabledAllInputs) {
    this._data = data;
    this._cardSetting = cardSetting;
    this._isChecked = false;
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
      if (!this._isChecked) {
        this._disabledAllInputs();

        this._enableInput();
      }
    });
  }

  _enableInput = () => {
    this._cardInput.checked = true;
    this._cardInputDecor.classList.add(this._cardSetting.cardInputActiveClass);
  }

  disableInput = () => {
    this._cardInput.checked = false;
    this._cardInputDecor.classList.remove(this._cardSetting.cardInputActiveClass);
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._card.querySelector(this._cardSetting.cardNumberSelector).textContent = this._data.cardNumber;
    this._card.querySelector(this._cardSetting.cardIconSelector).src = this._data.cardUrlIcon;

    this._cardInput = this._card.querySelector(this._cardSetting.cardInputSelecor);
    this._cardInputDecor = this._card.querySelector(this._cardSetting.cardInputDecorSelecor);

    this._setEventListener();

    return this._card;
  }
}
