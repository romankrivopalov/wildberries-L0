import cardIconMir from '../images/icons/icon-card-mir.svg'
import cardIconVisa from '../images/icons/icon-card-visa.svg'
import cardIconMasterCard from '../images/icons/icon-card-mastercard.svg'
import cardIconMaetro from '../images/icons/icon-card-maetro.svg'

export
const userDataExample = {
  delevery: {
    pickupPoint: [
      {
        address: 'Бишкек, улица Табышалиева, 57',
      },
      {
        address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
      },
      {
        address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
      },
    ],
    pickup: [
      {
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
        rate: null,
        officeHours: 'Ежедневно с 10 до 21 ',
      },
      {
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 22',
        rate: 4.99,
        officeHours: 'Ежедневно с 10 до 22 ',
      },
      {
        address: 'г. Бишкек, улица Табышалиева, д. 57',
        rate: 4.87,
        officeHours: 'Ежедневно с 9 до 21 ',
      },
    ]
  },
  cards: [
    {
      cardNumber: '1234 56•• •••• 1234',
      cardDate: '07/30',
      cardUrlIcon: cardIconMir,
    },
    {
      cardNumber: '1234 56•• •••• 1234',
      cardDate: '02/28',
      cardUrlIcon: cardIconVisa,
    },
    {
      cardNumber: '1234 56•• •••• 1234',
      cardDate: '05/29',
      cardUrlIcon: cardIconMasterCard,
    },
    {
      cardNumber: '1234 56•• •••• 1234',
      cardDate: '12/24',
      cardUrlIcon: cardIconMaetro,
    }
  ]
}

export
const popupSelectors = {
      choosePay: '.popup[data-type="popup-choose-pay"]',
      chooseAddress: '.popup[data-type="popup-choose-address"]',
};

export
const popupChoosePayContainerSelector = '#popup-choose-pay',
      popupChooseAddressContainerSelector = '#popup-choose-address',
      btnChoosePay = document.querySelector('.basket__content-header-btn[data-type="btn-choose-pay"]'),
      btnChooseAddress = document.querySelector('.basket__content-header-btn[data-type="btn-choose-address"]'),
      btnSidebarChoosePay = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-pay"]'),
      btnSidebarChooseAddress = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-address"]');

export
const cardSetting = {
  cardTemplateSelector: '#card',
  cardSelector: '.card',
  cardIconSelector: '.card__icon',
  cardNumberSelector: '.card__number',
}
