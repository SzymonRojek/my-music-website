import { fieldsValidationErrorsData } from "./fieldsValidationErrorsData";
import { FieldsFormValidator } from "./FieldsFormValidator";

const $form = document.querySelector("[data-form]");

new FieldsFormValidator($form, fieldsValidationErrorsData);

// text area functionality
function resizeTextArea({ target }) {
  target.style.height = "auto";

  const scrollHeight = target.scrollHeight;
  target.style.height = `${scrollHeight}px`;
}

const $textArea = document.querySelector("[data-area]");
$textArea.addEventListener("keyup", resizeTextArea);
