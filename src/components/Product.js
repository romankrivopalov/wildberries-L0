export default class Product {
  constructor(
    data,
    productSetting,
    handleDecreaseAccordionCounter,
    handleIncreaseAccordionCounter,
    handleDecreaseAccordionPrice,
    handleIncreaseAccordionPrice,
    handleDecreaseTotalPrice,
    handleIncreaseTotalPrice,
  ) {
    this._data = data;
    this._oldPrice = data.oldPrice;
    this._productSetting = productSetting;
    this._handleDecreaseAccordionCounter = handleDecreaseAccordionCounter;
    this._handleIncreaseAccordionCounter = handleIncreaseAccordionCounter;
    this._handleDecreaseAccordionPrice = handleDecreaseAccordionPrice;
    this._handleIncreaseAccordionPrice = handleIncreaseAccordionPrice;
    this._handleDecreaseTotalPrice = handleDecreaseTotalPrice;
    this._handleIncreaseTotalPrice = handleIncreaseTotalPrice;
    this.id = data.id;
    this.isChecked = false;
  }

  _renderOldSum = ({ sum, discount, discountUser }) => {
    this._product
      .querySelector(this._productSetting.productOldPriceSelector)
      .textContent = `${sum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;

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

    return { sum, discount, discountUser }
  }

  _renderSum = (value) => {
    value.toString().length > 5
      ? this._newPriceElement.classList.add('product-item__new-price_type_small')
      : this._newPriceElement.classList.remove('product-item__new-price_type_small')

    this._newPriceElement.textContent = `${value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} сом`;
  }

  _calculateSum = (quantity) => {
    this._sumDiscount = (this._oldPrice)
      * (this._data.priceInfo.discount
      + this._data.priceInfo.discountUser) / 100;

    return ((this._oldPrice - this._sumDiscount) * quantity)
  }

  _renderCounter = (value) => {
    this._productCount.value = value;
  }

  _increaseCounter = () => {
    if (this._productCount.value >= this._data.available) return

    this._handleIncreaseTotalPrice(this._oldPrice - this._sumDiscount);
    this._handleIncreaseAccordionPrice(this._oldPrice - this._sumDiscount);
    this._renderSum(this._calculateSum(parseInt(this._productCount.value) + 1));
    this._renderOldSum(this._calculateOldSum(parseInt(this._productCount.value) + 1));
    this._renderCounter(parseInt(this._productCount.value) + 1);
  }

  _decreaseCounter = () => {
    if (this._productCount.value <= 1) return

    this._handleDecreaseTotalPrice(this._oldPrice - this._sumDiscount);
    this._handleIncreaseAccordionPrice(-(this._oldPrice - this._sumDiscount));
    this._renderSum(this._calculateSum(parseInt(this._productCount.value) - 1));
    this._renderOldSum(this._calculateOldSum(parseInt(this._productCount.value) - 1));
    this._renderCounter(parseInt(this._productCount.value) - 1);
  }

  enableInput = () => {
    this.isChecked = true;
    this._productInput.checked = true;

    this._handleIncreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._data.quantity);
  }

  disableInput = () => {
    this.isChecked = false;
    this._productInput.checked = false;

    this._handleDecreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._data.quantity);
  }

  _removeProduct = () => {
    // if product not selected, do not decrease total price
    if (this.isChecked) {
      this._handleDecreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._data.quantity, this.id)
    };

    this._handleDecreaseAccordionCounter();

    this._product.remove();
  }

  _setEventListeners = () => {
    this._productInputDecor.addEventListener('click', () => {
      if (!this.isChecked) {
        this.enableInput();
      } else {
        this.disableInput();
      }
    });

    this._productCountPlusBtn.addEventListener('click', () => {
      this._increaseCounter();
    });

    this._productCountMinusBtn.addEventListener('click', () => {
      this._decreaseCounter();
    });

    this._productDeleteBtn.addEventListener('click', () => {
      this._removeProduct();
    });
  };

  _getTemplate = () => {
    const productElement = document
      .querySelector(this._productSetting.productTemplateSelector)
      .content
      .querySelector(this._productSetting.productSelector)
      .cloneNode(true);

    return productElement;
  }

  generateProduct = () => {
    this._product = this._getTemplate();

    this._productInput = this._product.querySelector(this._productSetting.productInputSelecor);
    this._productInputDecor = this._product.querySelector(this._productSetting.productInputDecorSelecor);

    this._product.
      querySelector(this._productSetting.productPreviewSelector)
      .src = this._data.image;
    this._product.
      querySelector(this._productSetting.productPreviewSelector)
      .alt = this._data.name.trim();
    this._product.
      querySelector(this._productSetting.productTitleSelector)
      .textContent = this._data.name.trim();

    if (this._data.color || this._data.size) {
      if (this._data.color) {
        this._product.
          querySelector(this._productSetting.productColorSelector)
          .textContent = `Цвет: ${this._data.color.trim()}`;
      }

      if (this._data.size) {
        this._product.
          querySelector(this._productSetting.productSizeSelector)
          .textContent = `${this._data.size}`;
      } else {
        this._product.
          querySelector('.product-item__property-wrapper')
          .style.display = 'none';
      }
    } else {
      this._product.
        querySelector('.product-item__properties')
        .style.display = 'none';
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

    this._newPriceElement = this._product
      .querySelector(this._productSetting.productNewPriceSelector)

    this._productDeleteBtn = this._product.querySelector(this._productSetting.productDeleteBtnSelector);
    this._productCountMinusBtn = this._product.querySelector(this._productSetting.productCountMinusBtnSelector);
    this._productCountPlusBtn = this._product.querySelector(this._productSetting.productCountPlusBtnSelector);

    this._renderSum(this._calculateSum(this._data.quantity))
    this._renderOldSum(this._calculateOldSum(this._data.quantity));

    if (this._data.available <= 2) {
      this._product
        .querySelector(this._productSetting.productAvailableSelector)
        .textContent = `Осталось ${this._data.available} шт.`;
    }

    this._setEventListeners();
    this._handleIncreaseAccordionCounter();
    this._handleIncreaseAccordionPrice((this._oldPrice - this._sumDiscount) * this._data.quantity);

    return this._product;
  }
}
