export default class Product {
  constructor(data, productSetting) {
    this._data = data;
    this._productSetting = productSetting;
  }

  _getTemplate = () => {
    const productElement = document
      .querySelector(this._productSetting.productTemplateSelector)
      .content
      .querySelector(this._productSetting.productSelector)
      .cloneNode(true);

    return productElement;
  }

  _setEventListeners = () => {
    this._productDeleteBtn = this._product.querySelector(this._productSetting.productDeleteBtnSelector);
    this._productCountMinusBtn = this._product.querySelector(this._productSetting.productCountMinusBtnSelector);
    this._productCountPlusBtn = this._product.querySelector(this._productSetting.productCountPlusBtnSelector);

    this._productDeleteBtn.addEventListener('click', () => {
      this._product.remove();
    });

    this._productCountMinusBtn.addEventListener('click', () => {
      this._productCount.value = parseInt(this._productCount.value) - 1;
    });

    this._productCountPlusBtn.addEventListener('click', () => {
      this._productCount.value = parseInt(this._productCount.value) + 1;
    });
  };

  generateProduct = () => {
    const sum = (this._data.price * this._data.quantity);
    const oldSum = (this._data.oldPrice * this._data.quantity);

    this._product = this._getTemplate();
    this._product.
      querySelector(this._productSetting.productPreviewSelector)
      .src = this._data.image;
    this._product.
      querySelector(this._productSetting.productPreviewSelector)
      .alt = this._data.name.trim();
    this._product.
      querySelector(this._productSetting.productTitleSelector)
      .textContent = this._data.name.trim();

    if (this._data.color) {
      this._product.
        querySelector(this._productSetting.productColorSelector)
        .textContent = `Цвет: ${this._data.color.trim()}`;
    }

    if (this._data.size) {
      this._product.
        querySelector(this._productSetting.productSizeSelector)
        .textContent = `Размер: ${this._data.size}`;
    }

    this._product
      .querySelector(this._productSetting.productSellerSelector)
      .textContent = this._data.seller;
    this._product
      .querySelector(this._productSetting.productOrganizationNameSelector)
      .textContent = this._data.organization;
    this._product
      .querySelector(this._productSetting.productOrgNameSelector)
      .textContent = this._data.organizationInfo.orgName;
    this._product
      .querySelector(this._productSetting.productOrganizationRequisitesSelector)
      .textContent = this._data.organizationInfo.requisites;
    this._product
      .querySelector(this._productSetting.productOrganizationOrgAddressSelector)
      .textContent = this._data.organizationInfo.orgAddress;


    this._productCount = this._product
      .querySelector(this._productSetting.productCountSelector)

    this._productCount.value = this._data.quantity;

    if (this._data.available <= 2) {
      this._product
        .querySelector(this._productSetting.productAvailableSelector)
        .textContent = `Осталось ${this._data.available} шт.`;
    }

    this._product
      .querySelector(this._productSetting.productNewPriceSelector)
      .textContent = `${sum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;

    this._product
      .querySelector(this._productSetting.productOldPriceSelector)
      .textContent = `${oldSum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;

    if (this._data.priceInfo.discount) {
      const discount = ((oldSum * this._data.priceInfo.discount) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

      this._product
        .querySelector(this._productSetting.productDiscountSelector)
        .textContent = `Скидка ${this._data.priceInfo.discount}%`;

      this._product
        .querySelector(this._productSetting.productDiscountSumSelector)
        .textContent = `-${discount} сом`;
    }

    if (this._data.priceInfo.discountUser) {
      const discount = ((oldSum * this._data.priceInfo.discountUser) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

      this._product
        .querySelector(this._productSetting.productPersonDiscountSelector)
        .textContent = `Скидка покупателя ${this._data.priceInfo.discountUser}%`;

      this._product
        .querySelector(this._productSetting.productPersonDiscountSumSelector)
        .textContent = `-${discount} сом`;
    }

    this._setEventListeners();

    return this._product;
  }
}
