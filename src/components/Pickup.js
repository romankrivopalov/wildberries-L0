export default class Pickup {
  constructor(data, pickupTemplateSelector, pickuptSelector) {
    this._data = data;
    this._pickupTemplateSelector = pickupTemplateSelector;
    this._pickuptSelector = pickuptSelector;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._pickupTemplateSelector)
      .content
      .querySelector(this._pickuptSelector)
      .cloneNode(true);

    return cardElement;
  }

  generatePickupElement = () => {
    this._pickupElement = this._getTemplate(this._pickupTemplateSelector);
    this._pickupElement.querySelector('.pickup__address').textContent = this._data.address

    return this._pickupElement;
  }

  generatePickupPointElement = () => {
    this._pickuppointElement = this._getTemplate(this._pickupTemplateSelector);
    this._pickuppointElement.querySelector('.pickup__address').textContent = this._data.address

    return this._pickuppointElement;
  }
}
