import { DisplayFieldsErrors } from "./DisplayFieldsErrors";
import { FieldsValidationFormData } from "./FieldsValidationFormData";

export class FieldsFormValidator extends FieldsValidationFormData {
  constructor(form, getErrors) {
    super(getErrors);
    this.form = form;

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
        const errors = this.getErrors(formData);

        const displayErrors = new DisplayFieldsErrors(errors);
        displayErrors.displayErrorsOnChange(e);
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
        const errors = this.getErrors(formData);

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
