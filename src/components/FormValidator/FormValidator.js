import { useEffect, useState } from "react";

function FormValidator() {
  const [isEventInput, setIsEventInput] = useState({})

  const [isValidForm, setIsValidForm] = useState(true)

  const [isValidInput, setIsValidInput] = useState(true)

  const [isOpenForm, setIsOpenForm] = useState(false)

  const [isErrorMessage, setIsErrorMessage] = useState({})

  useEffect(() => {
    const popupActiv = document.querySelector('.popup_opened');
    if (!popupActiv) {
      return
    } else {
      setIsValidForm(popupActiv.querySelector('.popup__form').checkValidity());
    }
    return (() => {
      setIsEventInput({})
      setIsValidForm(false)
      setIsValidInput(true)
    });
  }, [isOpenForm]);

  useEffect(() => {
    if (Object.keys(isEventInput).length !== 0) {
      const { name } = isEventInput.target;
      setIsValidInput({
        ...isValidInput,
        [`${name}ValidInput`]: isEventInput.target.checkValidity()
      });

      setIsErrorMessage({
        ...isErrorMessage,
        [`${name}ErrorMessage`]: isEventInput.target.validationMessage
      });

      setIsValidForm(isEventInput.target.closest('.popup__form').checkValidity());
    }
  }, [isEventInput])

  return {
    setIsEventInput,
    setIsOpenForm,
    isValidInput,
    isValidForm,
    isErrorMessage
  }
}

export default FormValidator;