class ValidationMethods {
  static isLengthValid(input, errorMessage) {
    return input.length > 0 || { message: errorMessage };
  }

  static isMinLength(input, min, errorMessage) {
    return input.length >= min || { message: errorMessage };
  }

  static isOverMaxLength(input, max, errorMessage) {
    return input.length <= max || { message: errorMessage };
  }

  static isEmailValid(input, errorMessage) {
    const regexPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexPattern.test(String(input).toLowerCase()) || {
        message: errorMessage,
      }
    );
  }
}

export class FieldsValidationFormData {
  getErrors({ name, email, subject, description }) {
    return {
      name: [
        ValidationMethods.isLengthValid(name, "name is required"),
        ValidationMethods.isMinLength(name, 3, "must be at least 3 characters"),
        ValidationMethods.isOverMaxLength(
          name,
          15,
          "must be maximum 15 characters"
        ),
      ],
      email: [
        ValidationMethods.isLengthValid(email, "email is required"),
        ValidationMethods.isMinLength(
          email,
          3,
          "must be at least 3 characters"
        ),
        ValidationMethods.isEmailValid(
          email,
          "email is not valid - has to contains @ and ."
        ),
      ],
      subject: [
        ValidationMethods.isLengthValid(subject, "subject is required"),
        ValidationMethods.isMinLength(
          subject,
          3,
          "must be at least 3 characters"
        ),
        ValidationMethods.isOverMaxLength(
          subject,
          15,
          "must be maximum 15 characters"
        ),
      ],
      description: [
        ValidationMethods.isLengthValid(description, "description is required"),
        ValidationMethods.isMinLength(
          description,
          3,
          "must be at least 3 characters"
        ),
      ],
    };
  }
}
