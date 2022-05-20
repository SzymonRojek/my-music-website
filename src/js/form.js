import { sendMessage } from "./sendMessage";

const $form = document.querySelector(".form");
const $formListInputs = document.querySelector(".form__list");
const $fieldsControls = document.querySelectorAll(".form__item-field");
const $successIcons = document.querySelectorAll(".form__item-icon-success");

const HIDE_ICON = 0;
const SHOW_ICON = 1;

const validation = {
  isLengthValid(input, errorMessage) {
    return input.length > 0 || { message: errorMessage };
  },
  isMinLength(input, min, errorMessage) {
    return input.length >= min || { message: errorMessage };
  },
  isEmailValid(input, errorMessage) {
    const regexPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexPattern.test(String(input).toLowerCase()) || {
        message: errorMessage,
      }
    );
  },
};

init();

function init() {
  // add icon to Input onChange when there is no error

  $formListInputs.addEventListener(
    "keyup",
    debounce(({ target }) => {
      const actualInput = target.parentElement;
      const inputName = target.attributes["data-validate"].value;
      const error = checkInputOnChange(inputName, target.value);
      const childOfInput = 3;

      if (error?.message) {
        actualInput.children[childOfInput].style.opacity = HIDE_ICON;
      } else {
        actualInput.children[childOfInput].style.opacity = SHOW_ICON;
        actualInput.querySelector(".form__item-error-text").textContent = "";
        actualInput.querySelector(".form__item-icon-failure").style.opacity =
          HIDE_ICON;
      }
    }, 500)
  );

  // submit form

  $form.addEventListener("submit", onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData($form).entries());

  const errors = checkFieldsOnSubmit(formData);

  displayError(errors);

  if (!isError(errors)) {
    $form.reset();
    resetIcons($successIcons);

    /*

    sendMessage(formData);

    function call commented now because I do not want to use limited numbers of email.js requests

    */

    showSuccessModal();
  }
}

// helpers

function checkInputOnChange(inputName, targetValue) {
  const validate = {
    name: validation.isMinLength(
      targetValue,
      3,
      "must be at least 3 characters"
    ),
    email: validation.isEmailValid(
      targetValue,
      "email is not valid - has to contains @ ."
    ),
    subject: validation.isMinLength(
      targetValue,
      3,
      "must be at least 3 characters"
    ),
    message: validation.isMinLength(
      targetValue,
      3,
      "must be at least 3 characters"
    ),
  };

  for (const key in validate) {
    if (key === inputName) {
      return validate[inputName];
    }
  }
}

function checkFieldsOnSubmit(formData) {
  const { name, email, subject, message } = formData;

  return {
    name: [
      validation.isLengthValid(name, "name is required"),
      validation.isMinLength(name, 3, "must be at least 3 characters"),
    ],
    email: [
      validation.isLengthValid(email, "email is required"),
      validation.isEmailValid(
        email,
        "email is not valid - has to contains @ ."
      ),
    ],
    subject: [
      validation.isLengthValid(subject, "subject is required"),
      validation.isMinLength(subject, 3, "must be at least 3 characters"),
    ],
    message: [
      validation.isLengthValid(message, "message is required"),
      validation.isMinLength(message, 3, "must be at least 3 characters"),
    ],
  };
}

function displayError(errors) {
  const $errorsParagraphs = document.querySelectorAll(".form__item-error-text");

  Object.values(errors).forEach((error, index) => {
    const foundError = error.find((error) => error?.message);

    const errorText = $errorsParagraphs[index];
    const inputField = $fieldsControls[index].parentElement;
    const errorIcon = inputField.querySelector(".form__item-icon-failure");

    errorIcon.style.opacity = error?.message ? SHOW_ICON : HIDE_ICON;
    errorText.textContent = foundError?.message;
  });
}

function debounce(fn, delay) {
  let id;

  return (...args) => {
    if (id) clearTimeout(id);

    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function isError(data) {
  return Object.values(data).reduce((acc, val) => {
    acc = !!val.find((error) => error?.message);

    return acc;
  }, true);
}

function resetIcons(icons) {
  return icons.forEach((icon) => (icon.style.opacity = HIDE_ICON));
}

function showSuccessModal() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your  message has been sent",
    text: "I will respond soon 👋",
    timer: 3000,
    color: "#2c2323",
    confirmButtonColor: "green",
  });
}
