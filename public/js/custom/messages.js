const checkResponce = (data) => {
	console.log(data);
};

const sendMsg = () => {
	let msg = document.querySelector(".write_msg").value;
	if (msg.trim()) {
		const api = 'http://localhost:3000/messages';

		fetch(api, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({message: msg.trim()})
		}).then((res) => { return res.json(); })
          .then(checkResponce)
          .catch((error) => { console.error('Error', error);});
	}
	document.querySelector(".write_msg").value =  "";
};
document.querySelector(".msg_send_btn").addEventListener('click', sendMsg);