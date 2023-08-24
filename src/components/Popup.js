export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = ({ key }) => {
    if (key === 'Escape') {
      this.close();
    }
  };

  setEventListener() {
    this._popup.addEventListener('mousedown', ({ target }) => {
      if (target.classList.contains('popup_shown') || target.classList.contains('popup__close')) {
        this.close();
      }
    })
  };

  close = () => {
    this._popup.classList.remove('popup_shown');

    document.removeEventListener('keydown', this._handleEscClose);
  };

  open = () => {
    this._popup.classList.add('popup_shown');

    document.addEventListener('keydown', this._handleEscClose);
  };
}
