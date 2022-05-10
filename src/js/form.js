const $form = document.querySelector(".form");
const $submitFormButton = document.querySelector(".js-submitButton");
const errorMessage = document.getElementsByClassName("form__item-error-text");
const listFields = document.getElementsByClassName(".form__list");
const formListInputs = document.querySelector(".form__list");
const successIcons = document.querySelectorAll(".form__item-icon-success");

init();

function init() {
  $form.addEventListener("submit", onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();

  const $name = document.querySelector(".js-form__field-name");
  const $email = document.querySelector(".js-form__field-email");
  const $subject = document.querySelector(".js-form__field-subject");
  const $message = document.querySelector(".js-form__field-message");

  validateInputOnSubmit(
    $name,
    () => isLengthValid($name.value),
    "minimum 3 characters required"
  );

  validateInputOnSubmit(
    $email,
    () => isEmailValid($email.value),
    "email is invalid"
  );

  validateInputOnSubmit(
    $subject,
    () => isLengthValid($subject.value),
    "minimum 3 characters required"
  );

  validateInputOnSubmit(
    $message,
    () => isLengthValid($message.value),
    "minimum 3 characters required"
  );

  // sendind message finally

  const { name, subject, email, description } = Object.fromEntries(
    new FormData($form).entries()
  );

  const templateParams = {
    name,
    subject,
    email,
    description,
  };

  const existingElements = document.querySelectorAll(".form__item-error-text");
  const isAnyErrorMessage = !Array.from(existingElements).find(
    (error) => error.textContent !== ""
  );

  if (isAnyErrorMessage) {
    sendMessage(templateParams);
    resetIcons(successIcons);
  }
}

function sendMessage(config) {
  emailjs
    .send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, config)
    .then((response) => {
      if (response.status === 200) {
        showSuccessModal();
        $form.reset();
      }
    })
    .catch((error) => showErrorModal(error));
}

formListInputs.addEventListener("input", (event) => {
  if (event.target.attributes[1].nodeValue === "email") {
    event.target.parentElement.children[3].style.opacity = `${
      isEmailValid(event.target.value) ? 1 : 0
    }`;
  } else {
    event.target.parentElement.children[3].style.opacity = `${
      isLengthValid(event.target.value) ? 1 : 0
    }`;
  }
});

function validateInputOnSubmit(element, callback, messageCallback) {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".form__item-error-text");

  const errors = setErrorOnSubmit(element, callback, messageCallback) || [];

  if (errors.length) {
    errorMessage.textContent = errors.length ? errors[0].message : "";
  }

  if (!errors.length) {
    setSuccessOnSubmit(element);
  }
}

function setErrorOnSubmit(element, callback, messageCallback) {
  const inputControl = element.parentElement;
  const errorIcon = inputControl.querySelector(".form__item-icon-failure");
  const successIcon = inputControl.querySelector(".form__item-icon-success");

  const errors = [];

  if (!element.value) {
    errors.push({ message: "field is required" });
  }

  if (!callback()) {
    errors.push({ message: messageCallback });
  }

  successIcon.style.opacity = "0";
  errorIcon.style.opacity = "1";

  return errors;
}

function setSuccessOnSubmit(element) {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".form__item-error-text");
  const errorIcon = inputControl.querySelector(".form__item-icon-failure");
  const successIcon = inputControl.querySelector(".form__item-icon-success");

  errorMessage.textContent = "";
  errorIcon.style.opacity = "0";
  successIcon.style.opacity = "1";
}

// modals

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

function showErrorModal(error) {
  Swal.fire({
    icon: "error",
    title: "Email has not been sent 😕",
    text: `${
      error.text ? error.text : "Something went wront, please send it again"
    }`,
    confirmButtonColor: "crimson",
  });
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
  return Array.from(icons).forEach((icon) => (icon.style.opacity = "0"));
}
