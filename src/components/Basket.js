import { productsTitles } from '../utils/constants.js'
import getEndLine from '../utils/getEndLine.js';

export default class Basket {
  constructor(basketSetting) {
    this._basketSetting = basketSetting;
    this._accordionProductCountElement = document.querySelector(this._basketSetting.basketAccordionProductCountSelector);
    this._accordionProductCount = null;
    this._accordionProductPriceElement = document.querySelector(this._basketSetting.basketAccordionProductPriceSelector);
    this._accordionProductPrice = null;
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
  }

  _renderPriceBasket = () => {
    this._accordionProductPriceElement.textContent =
      `${this._accordionProductPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`
  }

  _renderCounterBasket = (value) => {
    this._accordionProductCountElement.textContent = `${value} ${getEndLine(value, productsTitles)}`
  }

  decreasePriceBasket = () => {
    this._renderPriceBasket(-value);
  }

  increasePriceBasket = (value) => { // +
    this._accordionProductPrice += value;
    this._renderPriceBasket(this._accordionProductPrice);
  }

  decreaseCounterBasket = () => {
    this._renderCounterBasket(this._accordionProductCount -= 1);
  }

  increaseCounterBasket = () => { // +
    this._renderCounterBasket(this._accordionProductCount += 1);
  }

  _renderCards = (card) => {
    this._cardIcons.forEach(icon => icon.src = card.data.cardUrlIcon);
    this._cardNumbers.forEach(number => number.textContent = card.data.cardNumber);
    this._cardDates.forEach(date => date.textContent = card.data.cardDate);
  }

  changeCard = (card) => {
    this._renderCards(card);
  }

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
}
