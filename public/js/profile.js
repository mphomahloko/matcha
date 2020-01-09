// not complete
const activateBtn = ({srcElement})=>{
	let element = document.querySelector("input[name=submit]");
	if (element.hasAttribute('disabled') && srcElement.value) {
		element.removeAttribute('disabled');
	}
	if (!document.querySelector("input[name='username']").value &&
		!document.querySelector("input[name='email']").value &&
		!document.querySelector("input[name='name']").value &&
		!document.querySelector("input[name='password']").value) {
			let disabled = document.createAttribute('disabled');
			element.setAttributeNode(disabled);
		}

};

document.querySelector("input[name='username']").addEventListener('blur', activateBtn);
document.querySelector("input[name='email']").addEventListener('blur', activateBtn);
document.querySelector("input[name='name']").addEventListener('blur', activateBtn);
document.querySelector("input[name='password']").addEventListener('blur', activateBtn);
