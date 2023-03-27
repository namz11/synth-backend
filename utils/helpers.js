const alphanumericRegex = /^[0-9a-zA-Z]+$/;
const alphanumericWithSpaceRegex = /^[0-9a-zA-Z ]+$/;
const pwdRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
const alphabetRegex = /^[a-zA-Z ]+$/;
const fullNameRegex = /[A-Za-z]{3,}\s[A-Za-z]{3,}$/;

export const helpers = {
  // Check for valid string
  isStringValid: (str, charCount = 1, maxCharCount = null) => {
    if (str === undefined || str === null || typeof str !== "string") {
      return false;
    }
    str = str.trim();

    if (maxCharCount) {
      return !isNaN(str)
        ? false
        : str && str?.length >= charCount && str?.length <= maxCharCount;
    } else {
      return !isNaN(str) ? false : str && str?.length >= charCount;
    }
  },
  // sanitize string
  sanitizeString: (str) => {
    if (str === undefined || str === null || typeof str !== "string") {
      return "";
    }
    return (str || "").trim();
  },
  // Check for valid number
  isNumberValid: (value) => {
    value = +value;
    return typeof value === "number" ? (value > 0 ? true : false) : false;
  },
};

export const validations = {
  isPasswordValid: (str) => {
    if (str.length < 6) {
      return false;
    }
    return str.match(pwdRegex);
  },
  isName: (str) => {
    if (!helpers.isStringValid(str, 3)) {
      return false;
    }
    str = helpers.sanitizeString(str);
    return str.match(alphabetRegex);
  },
};
