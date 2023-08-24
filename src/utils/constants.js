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
    priceInfo: {
      discount: 30,
      discountUser: 10,
    },
    oldPrice: 3300,
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
    priceInfo: {
      discount: 12,
      discountUser: 10,
    },
    oldPrice: 13200,
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
    priceInfo: {
      discount: null,
      discountUser: 10,
    },
    oldPrice: 690,
  },
]

export
const popupSelectors = {
      choosePay: '.popup[data-type="popup-choose-pay"]',
      chooseAddress: '.popup[data-type="popup-choose-address"]',
};

export
const basketSetting = {
      basketAccordionProductCountSelector: '.accordion__hide-info-item[data-type="accordion-count"]',
      basketAccordionProductPriceSelector: '.accordion__hide-info-item[data-type="accordion-price"]',
}

export
const productSetting = {
      productTemplateSelector: '#product',
      productSelector: '.product-item',
      productPreviewSelector: '.product-item__img',
      productTitleSelector: '.product-item__title',
      productColorSelector: '.product-item__property[data-type="product-color"]',
      productSizeSelector: '.product-item__property[data-type="product-size"]',
      productSellerSelector: '.product-item__seller',
      productOrganizationNameSelector: '.organization__name',
      productOrgNameSelector: '.organization__org-name',
      productOrganizationRequisitesSelector: '.organization__requisites',
      productOrganizationOrgAddressSelector: '.organization__org-address',
      productCountSelector: '.product-item__count-num',
      productAvailableSelector: '.product-item__available',
      productNewPriceSelector: '.product-item__new-price',
      productOldPriceSelector: '.product-item__old-price',
      productDiscountSelector: '.discount__label[data-type="product-discount"]',
      productDiscountSumSelector: '.discount__item[data-type="product-discount"]',
      productPersonDiscountSelector: '.discount__label[data-type="product-person-discount"]',
      productPersonDiscountSumSelector: '.discount__item[data-type="product-person-discount"]',
      productDeleteBtnSelector: '.product-item__icon_type_delete',
      productCountMinusBtnSelector: '.product-item__count-btn_type_minus',
      productCountPlusBtnSelector: '.product-item__count-btn_type_plus',
}

export
const cardSetting = {
      cardTemplateSelector: '#card',
      cardSelector: '.card',
      cardIconSelector: '.card__icon',
      cardNumberSelector: '.card__number',
      cardInputSelecor: '.card__radio',
      cardInputDecorSelecor: '.card__radio-decor',
      cardInputActiveClass: 'card__radio-decor_active',
}

export
const pickupSetting = {
      pickupTemplateSelector: '#pickup',
      pickupPointTemplateSelector: '#pickup-point',
      pickupSelector: '.pickup',
}

export
const productContainerSelector = '#product-list',
      popupChoosePayContainerSelector = '#popup-choose-pay',
      popupChooseAddressContainerSelector = '#popup-choose-address',
      popupChoosePickupContainerSelector = '#popup-choose-pickup',
      popupChoosePickupPointContainerSelector = '#popup-choose-pickup-point',
      btnChoosePay = document.querySelector('.basket__content-header-btn[data-type="btn-choose-pay"]'),
      btnChooseAddress = document.querySelector('.basket__content-header-btn[data-type="btn-choose-address"]'),
      btnSidebarChoosePay = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-pay"]'),
      btnSidebarChooseAddress = document.querySelector('.basket-order__btn-edit[data-type="btn-sidebar-choose-address"]'),
      productsTitles = ['товар', 'товара', 'товаров'];
