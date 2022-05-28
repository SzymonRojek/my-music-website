// import { sendMessage } from "./sendMessage";

const $form = document.querySelector("[data-form]");
const $errorsText = document.querySelectorAll("[data-error]");
const $icons = document.querySelectorAll("[data-icon]");
const HIDE_ICON = 0;
const SHOW_ICON = 1;

const validation = {
  isLengthValid(input, errorMessage) {
    const trimedValue = input.trim();
    return trimedValue.length > 0 || { message: errorMessage };
  },
  isMinLength(input, min, errorMessage) {
    const trimedValue = input.trim();
    return trimedValue.length >= min || { message: errorMessage };
  },
  isOverMaxLength(input, max, errorMessage) {
    const trimedValue = input.trim();
    return trimedValue.length <= max || { message: errorMessage };
  },
  isEmailValid(input, errorMessage) {
    const trimedValue = input.trim();
    const regexPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexPattern.test(String(trimedValue).toLowerCase()) || {
        message: errorMessage,
      }
    );
  },
};

const Validator = {
  constructor(form, validationCallback) {
    this.form = form;
    this.validationCallback = validationCallback;

    this.init();
  },

  init() {
    this.addListenerOnChange();
    this.addListenerOnSubmit();
  },

  addListenerOnChange() {
    this.form.addEventListener(
      "keyup",
      (e) => {
        const formData = Object.fromEntries(new FormData(this.form).entries());

        const errors = this.validationCallback(formData);
        const targetCurrentName = e.target.attributes["name"].value;
        const currentErrorsArray = errors[targetCurrentName];
        const error = currentErrorsArray.find((error) => error.message);

        const parentElement = e.target.parentElement;
        const errorText = parentElement.querySelector("[data-error]");
        const targetIcon = parentElement.querySelector("[data-icon]");

        errorText.textContent = error?.message || "";

        this.toggleIcon(error, targetIcon);
      },
      false
    );
  },

  addListenerOnSubmit() {
    this.form.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(this.form).entries());

        const errors = this.validationCallback(formData);

        Object.values(errors).map((arrayErrors, index) => {
          const errorText = $errorsText[index];
          const icon = $icons[index];
          const foundError = arrayErrors.find((el) => el.message);

          errorText.textContent = foundError?.message || "";
          this.toggleIcon(foundError, icon);
        });

        const isError = Object.values(errors)
          .flat(Infinity)
          .find((el) => el.message);

        if (!isError) {
          showSuccessModal();
          $form.reset();
          this.resetIcons($icons);

          //     /*
          //       sendMessage(formData);
          //       function call commented now because I do not want to use limited numbers of email.js requests
          //     */
        }
      },

      false
    );
  },

  toggleIcon(error, icon) {
    const classesSuccessIcon = ["fa-check", "form__item__icon-success"];
    const classesFailureIcon = [
      "fa-exclamation-circle",
      "form__item__icon-failure",
    ];
    if (error?.message) {
      icon.classList.add(...classesFailureIcon);
      icon.classList.remove(...classesSuccessIcon);
    } else {
      icon.classList.add(...classesSuccessIcon);
      icon.classList.remove(...classesFailureIcon);
    }

    icon.style.opacity = SHOW_ICON;
  },

  resetIcons(icons) {
    return icons.forEach((icon) => (icon.style.opacity = HIDE_ICON));
  },
};

const form = Object.create(Validator);

form.constructor($form, (formData) => {
  const { name, email, subject, description } = formData;

  const validationData = {
    name: [
      validation.isLengthValid(name, "name is required"),
      validation.isMinLength(name, 3, "must be at least 3 characters"),
      validation.isOverMaxLength(name, 15, "must be maximum 15 characters"),
    ],
    email: [
      validation.isLengthValid(email, "email is required"),
      validation.isMinLength(email, 3, "must be at least 3 characters"),
      validation.isEmailValid(
        email,
        "email is not valid - has to contains @ and ."
      ),
    ],
    subject: [
      validation.isLengthValid(subject, "subject is required"),
      validation.isMinLength(subject, 3, "must be at least 3 characters"),
      validation.isOverMaxLength(subject, 15, "must be maximum 15 characters"),
    ],
    description: [
      validation.isLengthValid(description, "description is required"),
      validation.isMinLength(description, 3, "must be at least 3 characters"),
    ],
  };

  return validationData;
});

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

// text area change size

function resizeTextArea({ target }) {
  target.style.height = "auto";

  const scrollHeight = target.scrollHeight;
  target.style.height = `${scrollHeight}px`;
}

const $textArea = document.querySelector("[data-area]");
$textArea.addEventListener("keyup", resizeTextArea);

// additionally I could use the debunce function and do not call input target all the time when key is pressed

function debounce(fn, delay) {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
