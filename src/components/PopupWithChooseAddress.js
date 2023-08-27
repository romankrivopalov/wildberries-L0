import Popup from "./Popup";

export default class PopupWithChooseAddress extends Popup {
  constructor(popupSelector, pickupAddressList, pickupPointAddressList, handleChangeElement) {
    super(popupSelector);

    this._pickupAddressList = pickupAddressList;
    this._pickupPointAddressList = pickupPointAddressList;
    this._popupBtn = document.querySelector('.popup__btn[data-type="btn-popup-choose-address"]');
    this._popupPickupTab = document.querySelector('.popup__tabs-item[data-type="popup-tab-pickup"]');
    this._popupPickupPointTab = document.querySelector('.popup__tabs-item[data-type="popup-tab-pickup-point"]');
    this._handleChangeElement = handleChangeElement;
  }

  setInitialAddress = () => {
    this._activeTab = this._popupPickupPointTab;
    this._popupPickupPointTab.classList.add('popup__tabs-item_active');

    this._pickupPointAddressList[this._pickupPointAddressList.length - 1].enableInput();
    this._handleChangeElement(this._pickupPointAddressList[this._pickupPointAddressList.length - 1]);
  }

  setEventListener = () => {
    super.setEventListener();

    this._popupPickupTab.addEventListener('click', () => {
      this._pickupAddressList.forEach(element => element.disableInput());
      this._pickupAddressList[this._pickupPointAddressList.length - 1].enableInput();

      this._popupPickupPointTab.classList.remove('popup__tabs-item_active');
      this._popupPickupTab.classList.add('popup__tabs-item_active');
    })

    this._popupPickupPointTab.addEventListener('click', () => {
      this._pickupPointAddressList.forEach(element => element.disableInput());
      this._pickupPointAddressList[this._pickupPointAddressList.length - 1].enableInput();

      this._popupPickupTab.classList.remove('popup__tabs-item_active');
      this._popupPickupPointTab.classList.add('popup__tabs-item_active');
    })



    this._popupBtn.addEventListener('click', () => {
      this._handleChangeElement(this._changeElement());

      this.close();
    })
  }

  disabledAllInputs = () => {
    this._pickupAddressList.forEach(element => element.disableInput());
    this._pickupPointAddressList.forEach(element => element.disableInput());
  }

  _changeElement = () => {
    const activeElement =
      this._pickupAddressList.find(element => element.isChecked) ||
      this._pickupPointAddressList.find(element => element.isChecked)

    return activeElement;
  }
}