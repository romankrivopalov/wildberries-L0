import { productsTitles } from '../utils/constants.js'
import getEndLine from '../utils/getEndLine.js';

export default class Basket {
  constructor(basketSetting) {
    this._basketSetting = basketSetting;
    this._accordionProductCountElement = document.querySelector(this._basketSetting.basketAccordionProductCountSelector);
    this._accordionProductCount = null;
    this._accordionProductPriceElement = document.querySelector(this._basketSetting.basketAccordionProductPriceSelector);
    this._accordionProductPrice = null;
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
    // console.log(value)
    this._renderPriceBasket(this._accordionProductPrice);
  }

  decreaseCounterBasket = () => {
    this._renderCounterBasket(this._accordionProductCount -= 1);
  }

  increaseCounterBasket = () => { // +
    this._renderCounterBasket(this._accordionProductCount += 1);
  }
}
