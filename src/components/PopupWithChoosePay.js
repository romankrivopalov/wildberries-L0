import Popup from "./Popup.js";

export default class PopupWithChoosePay extends Popup {
  constructor(popupSelector, cardList) {
    super(popupSelector);

    this._cardList = cardList;
  }

  setEventListener() {
    super.setEventListener();
  }

  disabledAllInputs = () => {
    this._cardList.forEach(card => card.disableInput())
  }
}
