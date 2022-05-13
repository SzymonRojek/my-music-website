import { sendMessage, showErrorModal, showSuccessModal } from "./sendMessage";

const $form = document.querySelector(".form");
const $formListInputs = document.querySelector(".form__list");
const $successIcons = document.querySelectorAll(".form__item-icon-success");

const HIDE_ICON = 0;
const SHOW_ICON = 1;

init();

function init() {
  // all actions on input keyup change

  $formListInputs.addEventListener("keyup", ({ target }) => {
    const actualInput = target.parentElement;

    if (target.attributes[1].nodeValue === "email") {
      target.parentElement.children[3].style.opacity = `${
        isEmailValid(target.value) ? SHOW_ICON : HIDE_ICON
      }`;

      actualInput.querySelector(".form__item-error-text").textContent = "";
      actualInput.querySelector(".form__item-icon-failure").style.opacity =
        HIDE_ICON;
    } else {
      target.parentElement.children[3].style.opacity = `${
        isLengthValid(target.value) ? SHOW_ICON : HIDE_ICON
      }`;

      actualInput.querySelector(".form__item-error-text").textContent = "";
      actualInput.querySelector(".form__item-icon-failure").style.opacity =
        HIDE_ICON;
    }
  });

  // submit form
  $form.addEventListener("submit", onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();
  const $name = document.querySelector(".js-form__field-name");
  const $email = document.querySelector(".js-form__field-email");
  const $subject = document.querySelector(".js-form__field-subject");
  const $message = document.querySelector(".js-form__field-message");

  const { name, email, subject, message } = Object.fromEntries(
    new FormData($form).entries()
  );

  validateInputOnSubmit(
    $name,
    () => isLengthValid(name),
    "minimum 3 characters required"
  );

  validateInputOnSubmit($email, () => isEmailValid(email), "email is invalid");

  validateInputOnSubmit(
    $subject,
    () => isLengthValid(subject),
    "minimum 3 characters required"
  );

  validateInputOnSubmit(
    $message,
    () => isLengthValid(message),
    "minimum 3 characters required"
  );

  // send message finally

  const $existingErrorsElements = document.querySelectorAll(
    ".form__item-error-text"
  );
  const isAnyErrorMessage = !Array.from($existingErrorsElements).find(
    (error) => error.textContent !== ""
  );

  if (isAnyErrorMessage) {
    showSuccessModal();
    $form.reset();

    // at the moment email.js is during dev production so modals appers depends on errors

    /*
      sendMessage({
        name,
        subject,
        email,
        message,
      });
    */

    resetIcons($successIcons);
  } else {
    showErrorModal();
  }
}

function validateInputOnSubmit(element, callback, messageCallback) {
  const inputControl = element.parentElement;
  const $errorMessage = inputControl.querySelector(".form__item-error-text");

  const errors = setErrorOnSubmit(element, callback, messageCallback) || [];

  if (errors.length) {
    $errorMessage.textContent = errors.length ? errors[0].message : "";
  }

  if (!errors.length) {
    setSuccessOnSubmit(element);
  }
}

function setErrorOnSubmit(element, callback, messageCallback) {
  const inputControl = element.parentElement;
  const $errorIcon = inputControl.querySelector(".form__item-icon-failure");
  const $successIcon = inputControl.querySelector(".form__item-icon-success");

  const errors = [];

  if (!element.value) {
    errors.push({ message: "field is required" });
  }

  if (!callback()) {
    errors.push({ message: messageCallback });
  }

  $successIcon.style.opacity = HIDE_ICON;
  $errorIcon.style.opacity = SHOW_ICON;

  return errors;
}

function setSuccessOnSubmit(element) {
  const inputControl = element.parentElement;
  const $errorIcon = inputControl.querySelector(".form__item-icon-failure");
  const $successIcon = inputControl.querySelector(".form__item-icon-success");
  const $errorMessage = inputControl.querySelector(".form__item-error-text");

  $errorMessage.textContent = "";
  $errorIcon.style.opacity = HIDE_ICON;
  $successIcon.style.opacity = SHOW_ICON;
}

// validation
const isEmailValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

function isLengthValid(text) {
  return text.length >= 3;
}

function resetIcons(icons) {
  return Array.from(icons).forEach((icon) => (icon.style.opacity = HIDE_ICON));
}
