import './index.css';

import * as all from '../utils/constants.js';
import PopupWithChoosePay from '../components/PopupWithChoosePay.js';
import PopupWithChooseAddress from '../components/PopupWithChooseAddress.js';

const popupWithChoosePay = new PopupWithChoosePay(
  all.popupSelectors.choosePay,
  cardsList
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
