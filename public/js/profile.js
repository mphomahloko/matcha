// not complete
const activateBtn = ({srcElement})=>{
	let element = document.querySelector("input[name=submit]");
	if (element.hasAttribute('disabled') && srcElement.value) {
		element.removeAttribute('disabled');
	}
};

document.querySelector("input[name='username']").addEventListener('blur', activateBtn);
document.querySelector("input[name='email']").addEventListener('blur', activateBtn);
document.querySelector("input[name='name']").addEventListener('blur', activateBtn);
document.querySelector("input[name='password']").addEventListener('blur', activateBtn);
