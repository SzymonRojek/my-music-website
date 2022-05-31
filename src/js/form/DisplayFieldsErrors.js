const $form = document.querySelector("[data-form]");
const $errorsText = document.querySelectorAll("[data-error]");
const $icons = document.querySelectorAll("[data-icon]");
const HIDE_ICON = 0;
const SHOW_ICON = 1;

export class DisplayFieldsErrors {
  constructor(errors) {
    this.errors = errors;
  }

  displayErrorsOnChange(e) {
    const targetCurrentName = e.target.attributes["name"].value;
    const currentErrorsArray = this.errors[targetCurrentName];
    const error = currentErrorsArray.find((error) => error.message);

    const parentElement = e.target.parentElement;
    const errorText = parentElement.querySelector("[data-error]");
    const targetIcon = parentElement.querySelector("[data-icon]");

    errorText.textContent = error?.message || "";

    this.toggleIcon(error, targetIcon);
  }

  displayErrorsOnSubmit() {
    Object.values(this.errors).forEach((arrayErrors, index) => {
      const errorText = $errorsText[index];
      const icon = $icons[index];
      const foundError = arrayErrors.find((el) => el.message);

      errorText.textContent = foundError?.message || "";
      this.toggleIcon(foundError, icon);
    });

    const isError = Object.values(this.errors)
      .flat(Infinity)
      .find((el) => el.message);

    if (!isError) {
      this.showSuccessModal();
      $form.reset();
      this.resetIcons($icons);

      /*
          sendMessage(formData);
          function call commented now because I do not want to use limited numbers of email.js requests
        */
    }
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

  showSuccessModal() {
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
}
