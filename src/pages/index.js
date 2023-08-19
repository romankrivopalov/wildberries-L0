import './index.css';

import * as all from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithChoosePay from '../components/PopupWithChoosePay.js';
import PopupWithChooseAddress from '../components/PopupWithChooseAddress.js';
import Card from '../components/Card.js';

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

popupCardList.renderItems();





const popupWithChoosePay = new PopupWithChoosePay(
  all.popupSelectors.choosePay
);

const popupWithChooseAddress = new PopupWithChooseAddress(
  all.popupSelectors.chooseAddress
);





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
