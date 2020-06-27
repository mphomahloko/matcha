// not complete
'use strict';

const checkResponce = (data) => {
	console.log('#' + data.field);
	if (data.success == true)
		$('#' + data.field).attr('style', "border-radius: 5px; border:green 1px solid;");
	else
		$('#' + data.field).attr('style', "border-radius: 5px; border:red 1px solid;");
}

const activateBtn = ({srcElement})=>{
	let element = document.querySelector("input[name=submit]");
	if (element.hasAttribute('disabled') && srcElement.value) {
		element.removeAttribute('disabled');
	}
	if (!document.querySelector("input[name='username']").value &&
		!document.querySelector("input[name='email']").value &&
		!document.querySelector("input[name='firstname']").value &&
		!document.querySelector("input[name='lastname']").value &&
		!document.querySelector("input[name='password']").value) {
			let disabled = document.createAttribute('disabled');
			element.setAttributeNode(disabled);
		}
		const api = 'http://localhost:4000/api/validate';

		let userInfo = {
			name: srcElement.name,
			value: srcElement.value
		}

		fetch(api, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(userInfo)
		}).then((res) => { return res.json(); })
          .then(checkResponce)
          .catch((error) => { console.error('Error', error);});

};

// event listeners
document.querySelector("input[name='username']").addEventListener('blur', activateBtn);
document.querySelector("input[name='email']").addEventListener('blur', activateBtn);
document.querySelector("input[name='firstname']").addEventListener('blur', activateBtn);
document.querySelector("input[name='lastname']").addEventListener('blur', activateBtn);
document.querySelector("input[name='password']").addEventListener('blur', activateBtn);
