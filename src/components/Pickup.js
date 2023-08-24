export default class Pickup {
  constructor(data, templateSelector, elementSetting, disabledAllInputs) {
    this.data = data;
    this._elementSetting = elementSetting;
    this.templateSelector = templateSelector;
    this._pickuptSelector = this._elementSetting.pickupSelector;
    this.isChecked = false;
    this._disabledAllInputs = disabledAllInputs;
  }

  _setEventListener = (elementForDelete) => {
    this._elementInputDecor.addEventListener('click', () => {
      if (!this.isChecked) {
        this._disabledAllInputs();

        this.enableInput();
      }
    });

    this._elementBtnDelete.addEventListener('click', () => {
      elementForDelete.remove();
    })
  }

  _getTemplate = () => {
    const element = document
      .querySelector(this.templateSelector)
      .content
      .querySelector(this._pickuptSelector)
      .cloneNode(true);

    return element;
  }

  enableInput = () => {
    this.isChecked = true;
    this._elementInput.checked = true;
  }

  disableInput = () => {
    this.isChecked = false;
    this._elementInput.checked = false;
  }

  generatePickupElement = () => {
    this._pickupElement = this._getTemplate();
    this._pickupElement.querySelector(this._elementSetting.pickupAddressSelector).textContent = this.data.address;

    this._elementInput = this._pickupElement.querySelector(this._elementSetting.pickupInputSelecor);
    this._elementInputDecor = this._pickupElement.querySelector(this._elementSetting.pickupInputDecorSelecor);

    this._elementBtnDelete = this._pickupElement.querySelector(this._elementSetting.pickupBtnDeleteSelecor);

    this._setEventListener(this._pickupElement);

    return this._pickupElement;
  }

  generatePickupPointElement = () => {
    this._pickupPointElement = this._getTemplate();
    this._pickupPointElement.querySelector(this._elementSetting.pickupAddressSelector).textContent = this.data.address;
    this._pickupPointElement.querySelector(this._elementSetting.pickupPointRateSelector).textContent = this.data.rate;

    this._elementInput = this._pickupPointElement.querySelector(this._elementSetting.pickupInputSelecor);
    this._elementInputDecor = this._pickupPointElement.querySelector(this._elementSetting.pickupInputDecorSelecor);

    this._elementBtnDelete = this._pickupPointElement.querySelector(this._elementSetting.pickupBtnDeleteSelecor);

    this._setEventListener(this._pickupPointElement);

    return this._pickupPointElement;
  }
}
