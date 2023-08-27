import { deliveryMonthTitles } from '../utils/constants.js';

export default class Delivery {
  constructor(data, deliveryDateItemSetting) {
    this._data = data;
    this._dataItems = this._data.item;
    this._deliveryDateItemSetting = deliveryDateItemSetting;
  }

  _getDeliveryItemTemplate = () => {
    const deliveryItemElement = document
      .querySelector('#basket-delivery-item')
      .content
      .querySelector('.delivery__item-img')
      .cloneNode(true);

    return deliveryItemElement;
  }

  _generateDeliveryItem = (item) => {
    this._deliveryDateItem = this._getDeliveryItemTemplate();

    this._deliveryDateItem.querySelector('.delivery__product-img').src = item.image;
    this._deliveryDateItem.querySelector('.delivery__count-label').textContent = item.count;

    return this._deliveryDateItem;
  }

  _getDates = () => {
    const firstDate = new Date(this._data.date[0]).getDate();
    const lastDate = new Date(this._data.date[1]).getDate();
    const month = new Date(this._data.date[1]).getMonth();

    return `${firstDate}—${lastDate} ${deliveryMonthTitles[month]}`
  }

  _getDeliveryTemplate = () => {
    const deliveryElement = document
      .querySelector('#basket-delivery')
      .content
      .querySelector('.delivery__item')
      .cloneNode(true);

    return deliveryElement;
  }

  generateDelivery = () => {
    this._deliveryDate = this._getDeliveryTemplate();

    this._deliveryDate.
      querySelector('.delivery__label')
      .textContent = this._getDates();

    this._deliveryItemContainer = this._deliveryDate.querySelector('.delivery__product-list');

    this._dataItems.forEach(item => {
      this._deliveryItemContainer.prepend(this._generateDeliveryItem(item));
    })

    return this._deliveryDate;
  }
}
