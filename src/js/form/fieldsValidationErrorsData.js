const validation = {
  isLengthValid(input, errorMessage) {
    return input.length > 0 || { message: errorMessage };
  },
  isMinLength(input, min, errorMessage) {
    return input.length >= min || { message: errorMessage };
  },
  isOverMaxLength(input, max, errorMessage) {
    return input.length <= max || { message: errorMessage };
  },
  isEmailValid(input, errorMessage) {
    const regexPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      regexPattern.test(String(input).toLowerCase()) || {
        message: errorMessage,
      }
    );
  },
};

export const fieldsValidationErrorsData = {
  getErrors({ name, email, subject, description }) {
    return {
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
        validation.isOverMaxLength(
          subject,
          15,
          "must be maximum 15 characters"
        ),
      ],
      description: [
        validation.isLengthValid(description, "description is required"),
        validation.isMinLength(description, 3, "must be at least 3 characters"),
      ],
    };
  },
};
