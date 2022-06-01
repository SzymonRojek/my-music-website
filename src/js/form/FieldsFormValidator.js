import { DisplayFieldsErrors } from "./DisplayFieldsErrors";
import { FieldsValidationFormData } from "./FieldsValidationFormData";

export class FieldsFormValidator {
  constructor(form) {
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
        const fieldData = this.createFieldDataObject(e, formData);

        const errors = FieldsValidationFormData.getErrors(fieldData);

        DisplayFieldsErrors.displayErrorsOnChange(e, errors);
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
        const errors = FieldsValidationFormData.getErrors(formData);

        DisplayFieldsErrors.displayErrorsOnSubmit(errors);
      },
      false
    );
  }

  getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  createFieldDataObject(e, formData) {
    const currentTarget = e.target.attributes["name"].value;
    const currentFieldValue = formData[currentTarget];

    const fieldData = {};
    fieldData[currentTarget] = currentFieldValue;

    return fieldData;
  }
}
