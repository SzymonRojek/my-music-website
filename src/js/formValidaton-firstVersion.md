```js
const $form = document.querySelector(".form");
const $formListInputs = document.querySelector(".form**list");
const $fieldsControls = document.querySelectorAll(".form**item**field");
const $successIcons = document.querySelectorAll(".form**item__icon-success");

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
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)\*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexPattern.test(String(input).toLowerCase()) || {
        message: errorMessage,
      }
    );
  },
};

init();

function init() {
  //  add icon to Input onChange when there is no error

  $formListInputs.addEventListener(
    "keyup",
    debounce(({ target }) => {
      const listItemParent = target.parentElement;
      const inputName = target.attributes["data-validate"].value;
      const error = checkInputOnChange(inputName, target.value);

      if (!error?.message) {
        listItemParent.querySelector(
          ".form__item__icon-success"
        ).style.opacity = SHOW_ICON;

        listItemParent.querySelector(
          ".form__item__icon-failure"
        ).style.opacity = HIDE_ICON;

        listItemParent.nextSibling.nextSibling.querySelector(
          ".form__error-text"
        ).textContent = "";
      } else {
        listItemParent.querySelector(
          ".form__item__icon-success"
        ).style.opacity = HIDE_ICON;
      }
    }, 500)
  );

  //  submit form

  $form.addEventListener("submit", onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData($form).entries());

  const errors = checkFieldsOnSubmit(formData);
  displayError(errors);

  if (!isError(errors).length) {
    $form.reset();
    resetIcons($successIcons);

    // sendMessage(formData); function call commented now because I do not want to use limited numbers of email.js requests

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
    description: validation.isMinLength(
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
  const { name, email, subject, description } = formData;

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
    description: [
      validation.isLengthValid(description, "description is required"),
      validation.isMinLength(description, 3, "must be at least 3 characters"),
    ],
  };
}

function displayError(errors) {
  const $errorsParagraphs = document.querySelectorAll(".form__error-text");

  Object.values(errors).forEach((error, index) => {
    const foundError = error.find((error) => error?.message);
    const errorText = $errorsParagraphs[index];
    const listItem = $fieldsControls[index].parentElement;
    const errorIcon = listItem.querySelector(".form**item**icon-failure");

    errorIcon.style.opacity = foundError ? SHOW_ICON : HIDE_ICON;
    errorText.textContent = foundError?.message;
  });
}

function debounce(fn, delay) {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function isError(data) {
  return Object.values(data).reduce((acc, val) => {
    val.filter((error) => (error?.message ? acc.push(error.message) : true));

    return acc;
  }, []);
}

function resetIcons(icons) {
  return icons.forEach((icon) => (icon.style.opacity = HIDE_ICON));
}
```

// second version

```js
const $form = document.querySelector("[data-form]");
const $errorsText = document.querySelectorAll("[data-error]");
const $icons = document.querySelectorAll("[data-icon]");
const HIDE_ICON = 0;
const SHOW_ICON = 1;

class Validator {
  constructor(form, validationCallback) {
    this.form = form;
    this.validationCallback = validationCallback;

    this.init();
  }

  init() {
    this.addListenerOnChange();
    this.addListenerOnSubmit();
  }

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
  }

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
  }

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
  }

  resetIcons(icons) {
    return icons.forEach((icon) => (icon.style.opacity = HIDE_ICON));
  }
}

const form = new Validator($form, getValidationErrors);

// helpers

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

function getValidationErrors(formData) {
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
```
