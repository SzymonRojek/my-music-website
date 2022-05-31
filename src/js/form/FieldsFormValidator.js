import { DisplayFieldsErrors } from "./DisplayFieldsErrors";

export class FieldsFormValidator {
  constructor(form, validationData) {
    this.form = form;
    this.validationData = validationData;

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
        const formData = this.getFormData(this.form);
        const errors = this.validationData.getErrors(formData);
        const displayErrors = new DisplayFieldsErrors(errors);
        displayErrors.displayErrorsOnChange(e, errors);
      },
      false
    );
  }

  addListenerOnSubmit() {
    this.form.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const formData = this.getFormData(this.form);
        const errors = this.validationData.getErrors(formData);

        const displayErrors = new DisplayFieldsErrors(errors);
        displayErrors.displayErrorsOnSubmit(errors);
      },
      false
    );
  }

  getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }
}
