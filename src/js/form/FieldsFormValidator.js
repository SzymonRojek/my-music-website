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
    const handlerOnChange = (e) => {
      const formData = this.getFormData(this.form);
      const fieldData = this.createFieldDataObject(e, formData);

      const errors = FieldsValidationFormData.getErrors(fieldData);

      DisplayFieldsErrors.displayErrorsOnChange(e, errors);
    };

    this.form.addEventListener("keyup", this.debounce(handlerOnChange, 400));
  }

  addListenerOnSubmit() {
    const handlerOnSubmit = (e) => {
      e.preventDefault();
      const formData = this.getFormData(this.form);
      const errors = FieldsValidationFormData.getErrors(formData);

      DisplayFieldsErrors.displayErrorsOnSubmit(errors);
    };

    this.form.addEventListener("submit", handlerOnSubmit);
  }

  getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  createFieldDataObject({ target }, formData) {
    const currentTarget = target.attributes["name"].value;
    const currentFieldValue = formData[currentTarget];

    const fieldData = {};
    fieldData[currentTarget] = currentFieldValue;

    return fieldData;
  }

  debounce(fn, delay) {
    let timeoutId;

    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }
}
