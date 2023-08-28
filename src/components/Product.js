export default class Product {
  constructor(
    data,
    productSetting,
    handleAddProductToArray,
    handleRemoveProductFromArray,
    handleChangeCountProductInArray,
    handleDecreaseAccordionCounter,
    handleIncreaseAccordionCounter,
    handleDecreaseAccordionPrice,
    handleIncreaseAccordionPrice,
    handleDecreaseTotalPrice,
    handleIncreaseTotalPrice,
    handleDecreaseTotalCount,
    handleIncreaseTotalCount,
    handleDecreaseTotalOldPrice,
    handleIncreaseTotalOldPrice,
    handleDecreaseTotalDiscount,
    handleIncreaseTotalDiscount,
    handleDecreaseCount,
    handleIncreaseCount,
    handleCheckInputProducts,
    handleDisableInputAllProduct,
    handleEnableInputAllProduct,
    handleSetProductMissing,
  ) {
    this._data = data;
    this._oldPrice = data.oldPrice;
    this._productSetting = productSetting;
    this._handleAddProduct = handleAddProductToArray;
    this._handleRemoveProduct = handleRemoveProductFromArray;
    this._handleChangeCountProductInArray = handleChangeCountProductInArray;
    this._handleDecreaseAccordionCounter = handleDecreaseAccordionCounter;
    this._handleIncreaseAccordionCounter = handleIncreaseAccordionCounter;
    this._handleDecreaseAccordionPrice = handleDecreaseAccordionPrice;
    this._handleIncreaseAccordionPrice = handleIncreaseAccordionPrice;
    this._handleDecreaseTotalPrice = handleDecreaseTotalPrice;
    this._handleIncreaseTotalPrice = handleIncreaseTotalPrice;
    this._handleDecreaseTotalCount = handleDecreaseTotalCount;
    this._handleIncreaseTotalCount = handleIncreaseTotalCount;
    this._handleDecreaseTotalOldPrice = handleDecreaseTotalOldPrice;
    this._handleIncreaseTotalOldPrice = handleIncreaseTotalOldPrice;
    this._handleDecreaseTotalDiscount = handleDecreaseTotalDiscount;
    this._handleIncreaseTotalDiscount = handleIncreaseTotalDiscount;
    this._handleDecreaseCount = handleDecreaseCount;
    this._handleIncreaseCount = handleIncreaseCount;
    this._handleCheckInputProducts = handleCheckInputProducts;
    this._handleDisableInputAllProduct = handleDisableInputAllProduct;
    this._handleEnableInputAllProduct = handleEnableInputAllProduct;
    this._hadleSetProductMissing = handleSetProductMissing,
    this.deliveryDate = this._data.deliveryDate;
    this.id = data.id;
    this.image = data.image;
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
      ? this._newPriceElement.classList.add(this._productSetting.productNewPriceSmallTextClass)
      : this._newPriceElement.classList.remove(this._productSetting.productNewPriceSmallTextClass)

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
    this._handleChangeCountProductInArray(this.id, parseInt(this._productCount.value) + 1)

    this._productCountPlusBtn.classList.remove(this._productSetting.productCountBtnTypeDisabledClass);

    if (this._productCount.value >= (this._data.available - 1)) {
      this._productCountPlusBtn.classList.add(this._productSetting.productCountBtnTypeDisabledClass);
    }

    this._productCountMinusBtn.classList.remove(this._productSetting.productCountBtnTypeDisabledClass);
    if (this._productCount.value >= this._data.available) return

    if (this.isChecked) {
      this._handleIncreaseAccordionPrice(this._oldPrice - this._sumDiscount);
      this._renderSum(this._calculateSum(parseInt(this._productCount.value) + 1));
      this._renderOldSum(this._calculateOldSum(parseInt(this._productCount.value) + 1));
      this._renderCounter(parseInt(this._productCount.value) + 1);
      this._handleIncreaseTotalPrice(this._oldPrice - this._sumDiscount);
      this._handleIncreaseTotalCount(1);
      this._handleIncreaseTotalOldPrice(this._oldPrice);
      this._handleIncreaseTotalDiscount(this._sumDiscount * this._productCount.value);
    }
  }

  _decreaseCounter = () => {
    this._handleChangeCountProductInArray(this.id, parseInt(this._productCount.value) - 1)

    this._productCountPlusBtn.classList.remove(this._productSetting.productCountBtnTypeDisabledClass);

    if (this._productCount.value <= 2) {
      this._productCountMinusBtn.classList.add(this._productSetting.productCountBtnTypeDisabledClass);
    }

    if (this._productCount.value <= 1) return

    if (this.isChecked) {
      this._handleIncreaseAccordionPrice(-(this._oldPrice - this._sumDiscount));
      this._renderSum(this._calculateSum(parseInt(this._productCount.value) - 1));
      this._renderOldSum(this._calculateOldSum(parseInt(this._productCount.value) - 1));
      this._renderCounter(parseInt(this._productCount.value) - 1);
      this._handleDecreaseTotalPrice(this._oldPrice - this._sumDiscount);
      this._handleDecreaseTotalCount(1);
      this._handleDecreaseTotalOldPrice(this._oldPrice);
      this._handleDecreaseTotalDiscount(this._sumDiscount * this._productCount.value);
    }
  }

  enableInput = () => {
    this._handleAddProduct(this._data);

    this.isChecked = true;
    this._productInput.checked = true;

    this._handleIncreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._productCount.value);
    this._handleIncreaseTotalCount(parseInt(this._productCount.value));
    this._handleIncreaseTotalOldPrice(this._oldPrice * this._productCount.value);
    this._handleIncreaseTotalDiscount(this._sumDiscount * this._productCount.value);
  }

  disableInput = () => {
    this._handleRemoveProduct(this.id);

    this.isChecked = false;
    this._productInput.checked = false;

    this._handleDecreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._productCount.value);
    this._handleDecreaseTotalCount(parseInt(this._productCount.value));
    this._handleDecreaseTotalOldPrice(this._oldPrice * this._productCount.value);
    this._handleDecreaseTotalDiscount(this._sumDiscount * this._productCount.value);
  }

  _removeProduct = () => {
    this._handleRemoveProduct(this.id);

    // if product not selected, do not decrease total price
    if (this.isChecked) {
      this._handleDecreaseTotalPrice((this._oldPrice - this._sumDiscount) * this._productCount.value);
      this._handleDecreaseTotalCount(this._productCount.value);
      this._handleDecreaseTotalOldPrice(this._oldPrice * this._productCount.value);
      this._handleDecreaseTotalDiscount(this._sumDiscount * this._productCount.value);
    };

    this._handleIncreaseCount(-1);
    this._handleDecreaseAccordionCounter();

    // check all inputs if delete disabled product
    this._handleCheckInputProducts()
      ? this._handleEnableInputAllProduct()
      : this._handleDisableInputAllProduct()

    this._product.remove();
    this._productMissing.remove();
  }

  _setEventListenerForProductMissing = () => {
    this._productMissingDeleteBtn.addEventListener('click', () => {
      this._removeProduct();
    });
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

  _getTemplate = (templateSelector, itemSelector) => {
    const productElement = document
      .querySelector(templateSelector)
      .content
      .querySelector(itemSelector)
      .cloneNode(true);

    return productElement;
  }

  _generateProductMissing = () => {
    this._productMissing = this._getTemplate(
      this._productSetting.productMissingTemplateSelector,
      this._productSetting.productMissingSelector,
    );

    this._productMissing.querySelector(this._productSetting.productPreviewSelector).src = this._data.image;
    this._productMissing.querySelector(this._productSetting.productTitleSelector).textContent = this._data.name.trim();
    this._productMissing.querySelector(this._productSetting.productPreviewSelector).alt = this._data.name.trim();

    if (this._data.color || this._data.size) {
      if (this._data.color) {
        this._productMissing.
          querySelector(this._productSetting.productColorSelector)
          .textContent = `Цвет: ${this._data.color.trim()}`;
      }

      if (this._data.size) {
        this._productMissing.
          querySelector(this._productSetting.productSizeSelector)
          .textContent = `${this._data.size}`;
      } else {
        this._productMissing.
          querySelector(this._productSetting.productPropertyWrapperSelector)
          .style.display = 'none';
      }
    } else {
      this._productMissing.
        querySelector(this._productSetting.productItemPropertiesSelector)
        .style.display = 'none';
    }

    this._productMissingDeleteBtn = this._productMissing.querySelector(this._productSetting.productDeleteBtnSelector);

    this._setEventListenerForProductMissing();

    return this._productMissing;
  }

  generateProduct = () => {
    this._product = this._getTemplate(
      this._productSetting.productTemplateSelector,
      this._productSetting.productSelector
    );

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
          querySelector(this._productSetting.productPropertyWrapperSelector)
          .style.display = 'none';
      }
    } else {
      this._product.
        querySelector(this._productSetting.productItemPropertiesSelector)
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

    if (Infinity) { // condition if there is no product
      this._hadleSetProductMissing(this._generateProductMissing());
    }

    this._setEventListeners();
    this._handleIncreaseAccordionCounter();
    this._handleIncreaseCount(1);
    this._handleIncreaseAccordionPrice((this._oldPrice - this._sumDiscount) * this._data.quantity);

    return this._product;
  }
}
