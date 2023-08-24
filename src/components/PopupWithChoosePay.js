import Popup from "./Popup.js";

export default class PopupWithChoosePay extends Popup {
  constructor(popupSelector, cardList, handleChangeCard) {
    super(popupSelector);

    this._cardList = cardList;
    this._cardBtn = document.querySelector('.popup__btn[data-type="btn-popup-choose-pay"]');
    this._handleChangeCard = handleChangeCard;
  }

  setInitialCard = () => {
    this._cardList[this._cardList.length - 1].enableInput();
    this._handleChangeCard(this._cardList[this._cardList.length - 1]);
  }

  setEventListener = () => {
    super.setEventListener();

    this._cardBtn.addEventListener('click', () => {
      this._changeCard();
    })
  }

  disabledAllInputs = () => {
    this._cardList.forEach(card => card.disableInput());
  }

  _changeCard = () => {
    const activeCard = this._cardList.find(card => card.isChecked);

    this._handleChangeCard(activeCard);
    this.close();
  }
}
