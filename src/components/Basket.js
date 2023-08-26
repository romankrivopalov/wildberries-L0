import { productsTitles } from '../utils/constants.js';
import { deliveryMonthTitles } from '../utils/constants.js';
import getEndLine from '../utils/getEndLine.js';

export default class Basket {
  constructor(basketSetting, productList, { renderDeliveries }) {
    this._basketSetting = basketSetting;
    this._productList = productList;
    this._renderDeliveries = renderDeliveries;
    this._accordionProductCountElement = document.querySelector(this._basketSetting.basketAccordionProductCountSelector);
    this._accordionProductCount = null;
    this._accordionProductPriceElement = document.querySelector(this._basketSetting.basketAccordionProductPriceSelector);
    this._accordionProductPrice = null;
    this._accordionCheckboxAllProduct = document.querySelector('.product__checkbox[data-type="checkbox-all-product"]');
    this._accordionCheckboxAllProductDecor = document.querySelector('.product__checkbox-decor[data-type="checkbox-all-product-decor"]');
    this._cardIcons = document.querySelectorAll(this._basketSetting.cardIconSelector);
    this._cardNumbers = document.querySelectorAll(this._basketSetting.cardNumberSelector);
    this._cardDates = document.querySelectorAll(this._basketSetting.cardDateSelector);
    this._pickupType = document.querySelector(this._basketSetting.pickupTypeSelector);
    this._pickupSidebarType = document.querySelector(this._basketSetting.pickupSidebarTypeSelector);
    this._pickupData = document.querySelector(this._basketSetting.pickupDataSelector);
    this._pickupAddress = document.querySelector(this._basketSetting.pickupAddressSelector);
    this._pickupSidebarAddress = document.querySelector(this._basketSetting.pickupSidebarAddressSelector);
    this._pickupRate = document.querySelector(this._basketSetting.pickupRateSelector);
    this._pickupOfficeHours = document.querySelector(this._basketSetting.pickupOfficeHoursSelector);
    this._basketTotalPrice = document.querySelector('#basket-total-price');
    this._basketTotalCount = document.querySelector('#basket-total-count');
    this._basketTotalOldPrice = document.querySelector('#basket-total-old-price');
    this._basketTotalDiscount = document.querySelector('#basket-total-discount');
    this._basketTotalDeliveryDate = document.querySelector('.basket-order__date[data-type="delivery_total-date"]');
    this._basketDeliveryDateItemList = document.querySelector('.delivery__items');
    this._basketCheckboxPaymentType = document.querySelector('.basket-order__checkbox[data-type="checkbox-sidebar-payment-type"]');
    this._basketCheckboxPaymentTypeDecor = document.querySelector('.basket-order__checkbox-decor[data-type="checkbox-sidebar-payment-type"]');
    this._basketTotalBtnSubmit = document.querySelector('.basket-order__btn[data-type="btn-sidebar-total"]');
    this._headerIconCounter = document.querySelector('.header__link-count[data-type="counter-header"]');
    this._navbarMobileIconCounter = document.querySelector('.navbar-mobile__icon-count[data-type="counter-mobile"]');
    this._totalPrice = null;
    this._totalCount = null;
    this._count = null;
    this._totalOldPrice = null;
    this._totalDiscount = null;
    this.allProductCheckboxIsChecked = false;
  }

  // total discount

  _renderTotalDiscount = () => {
    this._basketTotalDiscount.textContent = `−${this._totalDiscount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
  }

  decreaseTotalDiscount = (value) => {
    this._totalDiscount -= value;
    this._renderTotalDiscount();
  }

  increaseTotalDiscount = (value) => { // +
    this._totalDiscount += value;
    this._renderTotalDiscount();
  }

  // total old price

  _renderTotalOldPrice = () => {
    this._basketTotalOldPrice.textContent = `${this._totalOldPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
  }

  decreaseTotalOldPrice = (value) => {
    this._totalOldPrice -= value;
    this._renderTotalOldPrice();
  }

  increaseTotalOldPrice = (value) => { // +
    this._totalOldPrice += value;
    this._renderTotalOldPrice();
  }

  // total count

  _renderTotalCount = () => {
    this._basketTotalCount.textContent = `${this._totalCount} ${getEndLine(this._totalCount, productsTitles)}`;

    // change text in btn, else check input
    this._changeTextTotalBtn();
  }

  decreaseTotalCount = (count) => {
    this._totalCount -= count;
    this._renderTotalCount();
  }

  increaseTotalCount = (count) => { // +
    this._totalCount += count;
    this._renderTotalCount();
  }

  // count

  _renderCount = () => {
    this._headerIconCounter.textContent = this._count.toString();
    this._navbarMobileIconCounter.textContent = this._count.toString();
  }

  decreaseCount = (value) => {
    this._count -= value;
    this._renderCount();
  }

  increaseCount = (value) => { // +
    this._count += value;
    this._renderCount();
  }

  // total price

  _renderTotalPrice = () => {
    this._basketTotalPrice.textContent = `${this._totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
  }

  decreaseTotalPrice = (value) => {
    this._totalPrice -= value;
    this._renderTotalPrice();

    if (!this.checkInputProducts()) {
      this.disableInputAllProduct();
    }
  }

  increaseTotalPrice = (value) => { // +
    this._totalPrice += value;
    this._renderTotalPrice();

    if (this.checkInputProducts()) {
      this.enableInputAllProduct();
    }
  }

  // delivery date

  _renderTotalDeliveryDate = (firstDate, lastDate) => {
    const firstMonth = firstDate.getMonth();
    const lastMonth = firstDate.getMonth();

    if (firstMonth === lastMonth) {
      this._basketTotalDeliveryDate.textContent =
        `${firstDate.getDate()}-${lastDate.getDate()} ${deliveryMonthTitles[lastMonth].substring(0, 3)}`;
    } else {
      this._basketTotalDeliveryDate.textContent =
        `${firstDate.getDate()} ${deliveryMonthTitles[firstMonth].substring(0, 3)}-${lastDate.getDate()} ${deliveryMonthTitles[lastMonth].substring(0, 3)}`;
    }
  }

  _renderDeliveryDateItem = () => {
    this._basketDeliveryDateItemList
  }

  calculateDeliveryDate = () => {
    const arrayDataItems = [];
    const arrayDataItemsResult = [];
    let firstDate = Infinity;
    let lastDate = -Infinity;

    this._productList.forEach(product => {
      product.deliveryDate.forEach(date => {
        for (let count in date) {
          // for date sidebar
          if (Date.parse(date[count][0]) < firstDate) firstDate = new Date(date[count][0]);
          if (Date.parse(date[count][1]) > lastDate) lastDate = new Date(date[count][1]);
        };
      });

      product.deliveryDate.forEach((count) => {
        arrayDataItems.push(
          {
            date: [Object.values(count)[0][0], Object.values(count)[0][1]],
            item: [{ count: Object.keys(count)[0], image: product.image }],
          }
        )
      })
    });

    arrayDataItems.forEach(data => {
      if (!arrayDataItemsResult.length) {
        // first element
        arrayDataItemsResult.push({
          date: [Object.values(data)[0][0], Object.values(data)[0][1]],
          item: [{ count: data.item[0].count, image: data.item[0].image }] }
        );
      } else {
        // add item in date
        for (let i = 0; i < arrayDataItemsResult.length; i++) {
          if (
            Date.parse(new Date(arrayDataItemsResult[i].date[0])) === Date.parse(new Date(Object.values(data)[0][0]))
            && Date.parse(new Date(arrayDataItemsResult[i].date[0])) === Date.parse(new Date(Object.values(data)[0][0]))
          ) {
            arrayDataItemsResult[i].item.push({ count: data.item[0].count, image: data.item[0].image });
            return;
          }
        }

        // add new item
        arrayDataItemsResult.push({
          date: [Object.values(data)[0][0], Object.values(data)[0][1]],
          item: [{ count: data.item[0].count, image: data.item[0].image }] }
        );
      }
    })

    this._renderTotalDeliveryDate(firstDate, lastDate);

    const deliverySlice = this._renderDeliveries(arrayDataItemsResult);

    deliverySlice.renderItems();
  }

  // accordion price

  _renderPriceBasket = () => {
    this._accordionProductPriceElement.textContent =
      `${this._accordionProductPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`
  }

  decreasePriceBasket = () => {
    this._renderPriceBasket(-value);
  }

  increasePriceBasket = (value) => { // +
    this._accordionProductPrice += value;
    this._renderPriceBasket(this._accordionProductPrice);
  }

  // accordion counter

  _renderCounterBasket = (value) => {
    this._accordionProductCountElement.textContent = `${value} ${getEndLine(value, productsTitles)}`
  }

  decreaseCounterBasket = () => {
    this._renderCounterBasket(this._accordionProductCount -= 1);
  }

  increaseCounterBasket = () => { // +
    this._renderCounterBasket(this._accordionProductCount += 1);
  }

  // cards

  _renderCards = (card) => {
    this._cardIcons.forEach(icon => icon.src = card.data.cardUrlIcon);
    this._cardNumbers.forEach(number => number.textContent = card.data.cardNumber);
    this._cardDates.forEach(date => date.textContent = card.data.cardDate);
  }

  changeCard = (card) => {
    this._renderCards(card);
  }

  // address delivery

  _renderAddress = (address) => {
    this._pickupAddress.textContent = address.data.address;
    this._pickupSidebarAddress.textContent = address.data.address;

    if (address.templateSelector === this._basketSetting.pickupTemplateSelector) {
      this._pickupType.textContent = this._basketSetting.pickupTypeText;
      this._pickupSidebarType.textContent = this._basketSetting.pickupSidebarTypeText;

      this._pickupData.classList.remove(this._basketSetting.pickupDataHideClass)
      this._pickupRate.textContent = address.data.rate;
      this._pickupOfficeHours.textContent = address.data.officeHours;
    } else {
      this._pickupType.textContent = this._basketSetting.pickupPointTypeText;
      this._pickupData.classList.add(this._basketSetting.pickupDataHideClass);
      this._pickupSidebarType.textContent = this._basketSetting.pickupPointSidebarTypeText;
    }
  }

  changeAddress = (address) => {
    this._renderAddress(address);
  }

  // products

  removeProductInListArray = (idForDeleteCard) => {
    this._productList = this._productList.filter(item => item.id !== idForDeleteCard);
  }

  enableInputAllProduct = () => {
    this.allProductCheckboxIsChecked = true;
    this._accordionCheckboxAllProduct.checked = true;
  }

  disableInputAllProduct = () => {
    this.allProductCheckboxIsChecked = false;
    this._accordionCheckboxAllProduct.checked = false;
  }

  enableAllProducts = () => {
    this._productList.forEach(product => {
      if (!product.isChecked) {
        this.enableInputAllProduct();
        product.enableInput();
      };
    });
  }

  checkInputProducts = () => {
    return this._productList.every(product => product.isChecked);
  }

  // total checkbox and btn submit

  _changeTextTotalBtn = () => {
    if (this._basketCheckboxPaymentType.checked) {
      this._totalPrice.toString().length > 5
        ? this._basketTotalBtnSubmit.classList.add('basket-order__btn_type_small')
        : this._basketTotalBtnSubmit.classList.remove('basket-order__btn_type_small');

      this._basketTotalBtnSubmit.textContent =
        `Оплатить ${this._totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
    } else {
      this._basketTotalBtnSubmit.classList.remove('basket-order__btn_type_small');
      this._basketTotalBtnSubmit.textContent = 'Заказать';
    }
  }

  _toggleInputPaymentType = () => {
    this._basketCheckboxPaymentType.checked = !this._basketCheckboxPaymentType.checked;

    this._changeTextTotalBtn();
  }

  // set listeners

  setEventListeners = () => {
    this._accordionCheckboxAllProductDecor.addEventListener('click', () => {
      if (!this.allProductCheckboxIsChecked) {
        this.enableAllProducts();
      } else {
        this._productList.forEach(product => {
          if (product.isChecked) {
            this.disableInputAllProduct();
            product.disableInput();
          };
        });
      }
    })

    this._basketCheckboxPaymentTypeDecor.addEventListener('click', () => {
      this._toggleInputPaymentType();
    })
  }
}
