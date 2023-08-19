import Popup from "./Popup.js";

export default class PopupWithChoosePay extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _generateItem = () => {
    this._cardList.forEach(i => console.log(i))
  }
}
