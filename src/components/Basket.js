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
    this._cardIcons.forEach(icon => icon.src = card.data.cardUrlIcon)
    this._cardNumbers.forEach(number => number.textContent = card.data.cardNumber)
    this._cardDates.forEach(date => date.textContent = card.data.cardDate)
  }

  changeCard = (card) => {
    this._renderCards(card)
  }
}
