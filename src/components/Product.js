export default class Product {
  constructor(data, productSetting) {
    this._data = data;
    this._oldPrice = data.oldPrice;
    this._productSetting = productSetting;
    console.log(data.oldPrice)
  }

  _getTemplate = () => {
    const productElement = document
      .querySelector(this._productSetting.productTemplateSelector)
      .content
      .querySelector(this._productSetting.productSelector)
      .cloneNode(true);

    return productElement;
  }

  _renderOldSum = (value, discount, discountUser) => {
    this._product
      .querySelector(this._productSetting.productOldPriceSelector)
      .textContent = `${value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;

    if (discount) {
      this._product
        .querySelector(this._productSetting.productDiscountSelector)
        .textContent = `Скидка ${this._data.priceInfo.discount}%`;

      this._product
        .querySelector(this._productSetting.productDiscountSumSelector)
        .textContent = `-${discount} сом`;
    }

    if (discountUser) {
      this._product
        .querySelector(this._productSetting.productPersonDiscountSelector)
        .textContent = `Скидка покупателя ${this._data.priceInfo.discountUser}%`;

      this._product
        .querySelector(this._productSetting.productPersonDiscountSumSelector)
        .textContent = `-${discountUser} сом`;
    }
  }

  _calculateOldSum = (quantity) => {
    const sum = this._oldPrice * quantity;
    let discount = null;
    let discountUser = null;

    if (this._data.priceInfo.discount) {
      discount = (((this._oldPrice * quantity) * this._data.priceInfo.discount) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    if (this._data.priceInfo.discountUser) {
      discountUser = (((this._oldPrice * quantity) * this._data.priceInfo.discountUser) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    this._renderOldSum(sum, discount, discountUser);
  }

  _renderSum = (value) => {
    this._product
      .querySelector(this._productSetting.productNewPriceSelector)
      .textContent = `${value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
  }

  _calculateSum = (quantity) => {
    const fullOldSum = this._oldPrice * quantity;
    const sumAfterDiscount = (fullOldSum)
      * (this._data.priceInfo.discount
      + this._data.priceInfo.discountUser) / 100;

    this._renderSum(fullOldSum - sumAfterDiscount);
  }

  _renderCounter = (value) => {
    this._productCount.value = value;
  }

  _increaseCounter = () => {
    if (this._productCount.value >= this._data.available) return

    this._calculateSum(parseInt(this._productCount.value) + 1);
    this._calculateOldSum(parseInt(this._productCount.value) + 1);
    this._renderCounter(parseInt(this._productCount.value) + 1);
  }

  _decreaseCounter = () => {
    if (this._productCount.value <= 1) return

    this._calculateSum(parseInt(this._productCount.value) - 1);
    this._calculateOldSum(parseInt(this._productCount.value) - 1);
    this._renderCounter(parseInt(this._productCount.value) - 1)
  }

  _setEventListeners = () => {
    this._productDeleteBtn = this._product.querySelector(this._productSetting.productDeleteBtnSelector);
    this._productCountMinusBtn = this._product.querySelector(this._productSetting.productCountMinusBtnSelector);
    this._productCountPlusBtn = this._product.querySelector(this._productSetting.productCountPlusBtnSelector);

    this._productCountPlusBtn.addEventListener('click', () => {
      this._increaseCounter();
    });

    this._productCountMinusBtn.addEventListener('click', () => {
      this._decreaseCounter();
    });

    this._productDeleteBtn.addEventListener('click', () => {
      this._product.remove();
    });
  };

  generateProduct = () => {
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
      .querySelector(this._productSetting.productCountSelector);
    this._productCount.value = this._data.quantity;

    this._calculateSum(this._data.quantity);
    this._calculateOldSum(this._data.quantity);

    if (this._data.available <= 2) {
      this._product
        .querySelector(this._productSetting.productAvailableSelector)
        .textContent = `Осталось ${this._data.available} шт.`;
    }

    this._setEventListeners();

    return this._product;
  }
}
