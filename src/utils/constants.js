import productIconShort from '../images/item-01.jpg'
import productIconCase from '../images/item-02.jpg'
import productIconPencils from '../images/item-03.jpg'
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
const userOrderExample = [
  {
    name: 'Футболка UZcotton мужская',
    image: productIconShort,
    color: 'белый',
    size: 56,
    seller: 'Коледино WB',
    organization: 'OOO Вайлдберриз',
    organizationInfo: {
      orgName: 'OOO «Вайлдберриз»',
      requisites: 'ОГРН: 5167746233210',
      orgAddress: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 5',
    },
    quantity: 1,
    available: 2,
    price: 522,
    priceInfo: {
      discount: '55%',
      discountUser: '10%',
    },
    oldPrice: 1051,
  },
  {
    name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    image: productIconCase,
    color: 'прозрачный',
    size: null,
    seller: 'Коледино WB',
    organization: 'OOO Мегапрофстиль',
    organizationInfo: {
      orgName: 'OOO «МЕГАПРОФСТИЛЬ»',
      requisites: 'ОГРН: 5167746237148',
      orgAddress: '120477, Москва, улица Зеленая Сосна, 2, корпус 1, стр. 1, помещение 2, офис 47',
    },
    quantity: 200,
    available: 1000,
    price: 10122,
    priceInfo: {
      discount: '55%',
      discountUser: '10%',
    },
    oldPrice: 12208,
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    image: productIconPencils,
    color: null,
    size: null,
    seller: 'Коледино WB',
    organization: 'OOO Вайлдберриз',
    organizationInfo: {
      orgName: 'OOO «Вайлдберриз»',
      requisites: 'ОГРН: 5167746235487',
      orgAddress: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 19',
    },
    quantity: 2,
    available: 2,
    price: 247,
    priceInfo: {
      discount: '55%',
      discountUser: '10%',
    },
    oldPrice: 475,
  },
]

export
const popupSelectors = {
      choosePay: '.popup[data-type="popup-choose-pay"]',
      chooseAddress: '.popup[data-type="popup-choose-address"]',
};

export
const popupChoosePayContainerSelector = '#popup-choose-pay',
      popupChooseAddressContainerSelector = '#popup-choose-address',
      popupChoosePickupContainerSelector = '#popup-choose-pickup',
      popupChoosePickupPointContainerSelector = '#popup-choose-pickup-point',
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

export
const pickupSetting = {
  pickupTemplateSelector: '#pickup',
  pickupPointTemplateSelector: '#pickup-point',
  pickupSelector: '.pickup',
}
