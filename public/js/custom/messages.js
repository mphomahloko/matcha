"use strict";
const checkResponce = (data) => {
	console.log(data);
};

const addMessages =  (data) => {
	console.log(data.message + " from front-end");
};

const sendMsg = () => {
	let msg = document.querySelector(".write_msg").value;
	if (msg.trim()) {
		const api = 'http://localhost:3000/messages';
		let sender = document.querySelector('._').value;
		let reciever = "";
		if (sender == "santa")
			reciever = "test";
		else
			reciever = "santa";

		fetch(api, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				message: msg.trim(),
				from: sender,
				to: reciever
			})
		}).then((res) => { return res.json(); })
          .then()
		  .catch((error) => { console.error('Error', error);});
	}
	document.querySelector(".write_msg").value =  "";
};

document.querySelector(".msg_send_btn").addEventListener('click', sendMsg);
