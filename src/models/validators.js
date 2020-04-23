const validateUsername = (username) => {
  const validUserPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
  return username.match(validUserPattern);
};

const validateEmail = (email) => {
  const validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
  return email.match(validEmailPattern);
};

const validatePass = (password) => {
  const validPassPattern = /(?=^.{6,100}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  return password.match(validPassPattern);
};

const validateConfPass = (pass, confirmPass) => (validatePass(confirmPass) && pass === confirmPass);

// firstname or lastname
const validateFirstName = (name) => {
  // Joe change the regex
  const validNamePattern = /(?=^.{2,50}$)^[A-Za-z]+$/;
  return name.match(validNamePattern);
};

const validateLastName = (name) => {
  // Joe change the regex
  const validNamePattern = /(?=^.{2,50}$)^[A-Za-z]+$/;
  return name.match(validNamePattern);
};

module.exports = {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateUsername,
  validatePass,
  validateConfPass
};
