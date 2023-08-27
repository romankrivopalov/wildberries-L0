'use strict';

export default
class FormValidator {
  constructor(formSetting, form) {
    this._formSetting = formSetting;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._formSetting.inputSelector));
    this._buttonElement = this._form.querySelector(this._formSetting.submitButtonSelector);
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._formSetting.inputErrorClass);
    errorElement.classList.remove(this._formSetting.errorClass);
  }

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._formSetting.inputErrorClass);
    errorElement.classList.add(this._formSetting.errorClass);
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage) // check
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('change', () => {
        if (inputElement.value.length) {
          this._checkInputValidity(inputElement);
        }
      })

      inputElement.addEventListener('input', () => {
        this._hideInputError(inputElement);
      })
    })
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    this._setEventListeners();
  }
}
