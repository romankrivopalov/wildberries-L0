export
const dataCardExample = [
  {
    cardNumber: 123456888881234,
    cardDate: '07/30',
    cardUrlIcon: 'images/icons/icon-card-mir.svg'
  },
  {
    cardNumber: 123456888881234,
    cardDate: '02/28',
    cardUrlIcon: 'images/icons/icon-card-visa.svg'
  },
  {
    cardNumber: 123456888881234,
    cardDate: '05/29',
    cardUrlIcon: 'images/icons/icon-card-mastercard.svg'
  },
  {
    cardNumber: 123456888881234,
    cardDate: '12/24',
    cardUrlIcon: 'images/icons/icon-card-maetro.svg'
  }
]

export
const popupSelectors = {
      choosePay: '.popup[data-type="popup-choose-pay"]',
      chooseAddress: '.popup[data-type="popup-choose-address"]',
};

export
const btnChoosePay = document.querySelector('.basket__content-header-btn[data-type="btn-choose-pay"]'),
      btnChooseAddress = document.querySelector('.basket__content-header-btn[data-type="btn-choose-address"]'),
      btnSidebarChoosePay = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-pay"]'),
      btnSidebarChooseAddress = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-address"]');
