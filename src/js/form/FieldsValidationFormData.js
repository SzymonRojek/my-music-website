class ValidationMethods {
  static isRequired(input, errorMessage) {
    return input.length > 0 || { message: errorMessage };
  }

  static isLessThan(input, min, errorMessage) {
    return input.length >= min || { message: errorMessage };
  }

  static isGreaterThan(input, max, errorMessage) {
    return input.length <= max || { message: errorMessage };
  }

  static isNumber(input, errorMessage) {
    const isNumberRegex = /\d/;
    return !isNumberRegex.test(input) || { message: errorMessage };
  }

  static isEmail(input, errorMessage) {
    const regexEmailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexEmailPattern.test(String(input).toLowerCase()) || {
        message: errorMessage,
      }
    );
  }
}

export class FieldsValidationFormData {
  static getErrors(formData) {
    const templateValidation = {
      name(name) {
        return [
          ValidationMethods.isRequired(name, "name is required"),
          ValidationMethods.isNumber(name, "number is not required"),
          ValidationMethods.isLessThan(
            name,
            3,
            "must be at least 3 characters"
          ),
          ValidationMethods.isGreaterThan(
            name,
            15,
            "must be maximum 15 characters"
          ),
        ];
      },
      email(email) {
        return [
          ValidationMethods.isRequired(email, "email is required"),
          ValidationMethods.isLessThan(
            email,
            3,
            "must be at least 3 characters"
          ),
          ValidationMethods.isEmail(
            email,
            "email is not valid - has to contains @ and ."
          ),
        ];
      },
      subject(subject) {
        return [
          ValidationMethods.isRequired(subject, "subject is required"),
          ValidationMethods.isLessThan(
            subject,
            3,
            "must be at least 3 characters"
          ),
          ValidationMethods.isGreaterThan(
            subject,
            15,
            "must be maximum 15 characters"
          ),
        ];
      },
      description(description) {
        return [
          ValidationMethods.isRequired(description, "description is required"),
          ValidationMethods.isLessThan(
            description,
            3,
            "must be at least 3 characters"
          ),
        ];
      },
    };

    return [formData].reduce((acc, fieldsData) => {
      for (const field in fieldsData) {
        acc[field] = templateValidation[field](fieldsData[field]);
      }

      return acc;
    }, {});
  }
}
