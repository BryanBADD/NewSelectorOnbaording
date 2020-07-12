const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fName = !isEmpty(data.fName) ? data.fName : "";
  data.lName = !isEmpty(data.lName) ? data.lName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  // Name checks
  if (Validator.isEmpty(data.fName)) {
    errors.fName = "First name field is required";
  }
  if (Validator.isEmpty(data.lName)) {
    errors.lName = "Last name field is required";
  }

  //Location and role checks
  if (Validator.isEmpty(data.location)) {
    errors.lName = "Location field is required";
  }
  if (Validator.isEmpty(data.role)) {
    errors.lName = "Role field is required";
  }


  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};