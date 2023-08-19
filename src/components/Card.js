export default class Card {
  constructor(data, cardSetting) {
    this._data = data;
    this._cardSetting = cardSetting;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSetting.cardTemplateSelector)
      .content
      .querySelector(this._cardSetting.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._card.querySelector(this._cardSetting.cardNumberSelector).textContent = this._data.cardNumber;
    this._card.querySelector(this._cardSetting.cardIconSelector).src = this._data.cardUrlIcon;
    console.log(this._card.querySelector(this._cardSetting.cardIconSelector))


    return this._card;
  }
}
