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
    this._checkedInputDecor.addEventListener('click', () => {
      if (!this._isChecked) {
        this._disabledAllInputs();

        this._enableInput();
      }
    });
  }

  _enableInput = () => {
    this._checkedInput.checked = true;
    this._checkedInputDecor.classList.add('card__radio-decor_active');
  }

  disableInput = () => {
    this._checkedInput.checked = false;
    this._checkedInputDecor.classList.remove('card__radio-decor_active');
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._card.querySelector(this._cardSetting.cardNumberSelector).textContent = this._data.cardNumber;
    this._card.querySelector(this._cardSetting.cardIconSelector).src = this._data.cardUrlIcon;

    this._checkedInput = this._card.querySelector('.card__radio');
    this._checkedInputDecor = this._card.querySelector('.card__radio-decor');

    this._setEventListener();

    return this._card;
  }
}
