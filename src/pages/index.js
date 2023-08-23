import './index.css';

import * as all from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithChoosePay from '../components/PopupWithChoosePay.js';
import PopupWithChooseAddress from '../components/PopupWithChooseAddress.js';
import Product from '../components/Product.js';
import Card from '../components/Card.js';
import Pickup from '../components/Pickup.js';
import Basket from '../components/Basket.js';

const basket = new Basket(all.basketSetting);

// create slices

const productList = new Section({
    data: all.userOrderExample,
    renderer: (item) => {
      const product = new Product(
        item,
        all.productSetting,
        basket.decreaseCounterBasket,
        basket.increaseCounterBasket,
        basket.decreasePriceBasket,
        basket.increasePriceBasket,
      );
      const productElement = product.generateProduct();
      productList.setItem(productElement);
    }
  },
  all.productContainerSelector,
);

const popupCardList = new Section({
    data: all.userDataExample.cards,
    renderer: (item) => {
      const card = new Card(item, all.cardSetting);
      const cardElement = card.generateCard();
      popupCardList.setItem(cardElement);
    }
  },
  all.popupChoosePayContainerSelector,
);

const popupPickupList = new Section({
    data: all.userDataExample.delevery.pickup,
    renderer: (item) => {
      const pickup = new Pickup(item, all.pickupSetting.pickupTemplateSelector, all.pickupSetting.pickupSelector);
      const pickupElement = pickup.generatePickupElement();
      popupPickupList.setItem(pickupElement);
    }
  },
  all.popupChoosePickupContainerSelector,
);

const popupPickupPointList = new Section({
    data: all.userDataExample.delevery.pickupPoint,
    renderer: (item) => {
      const pickupPoint = new Pickup(item, all.pickupSetting.pickupPointTemplateSelector, all.pickupSetting.pickupSelector);
      const pickupPointElement = pickupPoint.generatePickupPointElement();
      popupPickupPointList.setItem(pickupPointElement);
    }
  },
  all.popupChoosePickupPointContainerSelector,
);

productList.renderItems()
popupCardList.renderItems();
popupPickupList.renderItems();
popupPickupPointList.renderItems();




const popupWithChoosePay = new PopupWithChoosePay(
  all.popupSelectors.choosePay
);

const popupWithChooseAddress = new PopupWithChooseAddress(
  all.popupSelectors.chooseAddress
);



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

popupWithChoosePay.setEventListener();
popupWithChooseAddress.setEventListener();
