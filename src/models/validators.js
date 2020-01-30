'use strict';

const validateUsername = (username) => {
    let validUserPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;

    let validate_user = username.match(validUserPattern);

    if (!validate_user) {
        return false;
    } else {
        return true;
    }
};

const validateEmail = (email) => {
	let validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;

	let validate_email = email.match(validEmailPattern);
	if (!validate_email) {
		return false;
	} else {
		return true;
	}
};

const validatePassword = (password) => {
	let validPassPattern = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
	
	let validate_pass = password.match(validPassPattern);
	if (!validate_pass) {
		return false;
	} else {
		return true;
	}
};

const validateConfPassword = (pass, confirmPass) => {
	if (validatePassword(confirmPass) && pass === confirmPass) {
		return true;
	} else {
		return false;
	}
};

// firstname or lastname
const validateName = (name) => {
	// Joe change the regex
	let validNamePattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;

    let validate_name = name.match(validNamePattern);

    if (!validate_name) {
        return false;
    } else {
        return true;
    }
};

module.exports = {
	validateName,
	validateEmail,
	validateUsername,
	validatePassword,
	validateConfPassword
};
