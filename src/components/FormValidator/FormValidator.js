class FormValidator {
  constructor(formData, selectorformActivePopup) {
    this._formActivePopup = document.querySelector(selectorformActivePopup);
    this._submitButtonSelector = formData.submitButtonSelector;
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._textErrorClass = formData.textErrorClass;
    this._submitButton = this._formActivePopup.querySelector(this._submitButtonSelector);
    this._arrayInputsFormActive = Array.from(this._formActivePopup.querySelectorAll(this._inputSelector));
  };

  clearErrorsForm() {
    this._arrayInputsFormActive.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
      this._disableErrorText(inputElement);
    });
    this._changingButtonState();
  };

  _deactivateButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _activationButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  _hasInvalidInput() {
    return this._arrayInputsFormActive.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _changingButtonState() {
    const validityFormActive = this._hasInvalidInput();
    if (!validityFormActive) {
      this._activationButton();
    } else {
      this._deactivateButton();
    };
  };

  _disableErrorText(inputElement) {
    const inputError = this._formActivePopup.querySelector(`.${inputElement.id}-error`);
    inputError.classList.remove(this._textErrorClass);
  };

  _includeErrorText(inputElement) {
    const inputError = this._formActivePopup.querySelector(`.${inputElement.id}-error`);
    inputError.textContent = '';
    inputError.classList.add(this._textErrorClass);
    inputError.textContent = inputElement.validationMessage;
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._includeErrorText(inputElement);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._disableErrorText(inputElement);
    };
    this._changingButtonState();
  };

  _setEventListeners(inputElement) {
    this._formActivePopup.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
    });
  };

  enableValidation() {
    this._arrayInputsFormActive.forEach((inputElement) => {
      this._setEventListeners(inputElement);
    });
  };
};

export default FormValidator;