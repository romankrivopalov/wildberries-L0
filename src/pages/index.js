import './index.css';
import { formSetting } from '../utils/constants.js';

import * as all from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithChoosePay from '../components/PopupWithChoosePay.js';
import PopupWithChooseAddress from '../components/PopupWithChooseAddress.js';
import Product from '../components/Product.js';
import Card from '../components/Card.js';
import Pickup from '../components/Pickup.js';
import Basket from '../components/Basket.js';
import Delivery from '../components/Delivery.js';
import FormValidator from '../components/FormValidator.js';

const productItemList = [];
const cardList = [];
const pickupAddressList = [];
const pickupPointAddressList = [];

// validation

const basketFormValidator = new FormValidator(formSetting, all.basketForm);

// create slices

const productList = new Section({
    data: all.userOrderExample,
    renderer: (item) => {
      const product = new Product(
        item,
        all.productSetting,
        basket.addProductInListArray,
        basket.removeProductInListArray,
        basket.changeCountProductListArray,
        basket.decreaseCounterBasket,
        basket.increaseCounterBasket,
        basket.decreasePriceBasket,
        basket.increasePriceBasket,
        basket.decreaseTotalPrice,
        basket.increaseTotalPrice,
        basket.decreaseTotalCount,
        basket.increaseTotalCount,
        basket.decreaseTotalOldPrice,
        basket.increaseTotalOldPrice,
        basket.decreaseTotalDiscount,
        basket.increaseTotalDiscount,
        basket.decreaseCount,
        basket.increaseCount,
        basket.checkInputProducts,
        basket.disableInputAllProduct,
        basket.enableInputAllProduct,
        basket.setProductMissing,
      );
      productItemList.push(product);
      const productElement = product.generateProduct();
      productList.setItem(productElement);
    }
  },
  all.productContainerSelector,
);

const popupCardList = new Section({
    data: all.userDataExample.cards,
    renderer: (item) => {
      const card = new Card(item, all.cardSetting, popupWithChoosePay.disabledAllInputs);
      cardList.push(card);
      const cardElement = card.generateCard();
      popupCardList.setItem(cardElement);
    },
  },
  all.popupChoosePayContainerSelector,
);

const popupPickupList = new Section({
    data: all.userDataExample.delevery.pickup,
    renderer: (item) => {
      const pickup = new Pickup(
        item,
        all.pickupSetting.pickupTemplateSelector,
        all.pickupSetting,
        popupWithChooseAddress.disabledAllInputs
      );
      pickupAddressList.push(pickup);
      const pickupElement = pickup.generatePickupElement();
      popupPickupList.setItem(pickupElement);
    }
  },
  all.popupChoosePickupContainerSelector,
);

const popupPickupPointList = new Section({
    data: all.userDataExample.delevery.pickupPoint,
    renderer: (item) => {
      const pickupPoint = new Pickup(
        item,
        all.pickupSetting.pickupPointTemplateSelector,
        all.pickupSetting,
        popupWithChooseAddress.disabledAllInputs
      );
      pickupPointAddressList.push(pickupPoint);
      const pickupPointElement = pickupPoint.generatePickupPointElement();
      popupPickupPointList.setItem(pickupPointElement);
    }
  },
  all.popupChoosePickupPointContainerSelector,
);

const basket = new Basket(
  all.basketSetting,
  productItemList,
  {
    renderDeliveries: (itemList) => {
      const deliveryListItem = new Section(
        {
          data: itemList,
          renderer: (item) => {
            const delivery = new Delivery(
              item
            );
            const deliveryElement = delivery.generateDelivery();
            deliveryListItem.setItem(deliveryElement);
          }
        },
        all.deliveryItemsContainerSelector
      );

      return deliveryListItem;
    },
  }
);

const popupWithChoosePay = new PopupWithChoosePay(
  all.popupSelectors.choosePay, cardList, basket.changeCard
);
const popupWithChooseAddress = new PopupWithChooseAddress(
  all.popupSelectors.chooseAddress, pickupAddressList, pickupPointAddressList, basket.changeAddress
);

productList.renderItems()
popupCardList.renderItems();
popupPickupList.renderItems();
popupPickupPointList.renderItems();

// set listeners

all.btnChoosePay.addEventListener('click', () => {
  popupWithChoosePay.open();
});

all.btnChooseAddress.addEventListener('click', () => {
  popupWithChooseAddress.open();
});

all.btnSidebarChoosePay.addEventListener('click', () => {
  popupWithChoosePay.open();
});

all.btnSidebarChooseAddress.addEventListener('click', () => {
  popupWithChooseAddress.open();
});

basket.addInicialProductInListArray()
basket.setEventListeners();
basket.enableAllProducts();
popupWithChoosePay.setInitialCard();
popupWithChoosePay.setEventListener();
popupWithChooseAddress.setInitialAddress();
popupWithChooseAddress.setEventListener();

basketFormValidator.enableValidation();
