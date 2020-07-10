'use strict';

const decision = (res) => {
	document.querySelector('button[dis-like]').textContent = res.message;
}

(() => {
	const participant = document.querySelector('._').value;
	const liked_participant = document.querySelector("#username").textContent.trim();
	console.log(liked_participant);
	const api = `http://localhost:4000/api/dis-like?participant=${participant}&liked_participant=${liked_participant}`;
	fetch(api).then((res) => { return res.json(); })
			.then(decision)
			.catch((error) => { console.error('Error', error);});
})();


const checkResponce = (res) => {
	if (!res.message.includes('dislike')){
		document.querySelector('button[dis-like]').textContent = 'dislike';
	} else {
		document.querySelector('button[dis-like]').textContent = 'like';
	}
	if (!document.querySelector('.alert').hasAttribute('show')) {
		document.querySelector('.alert').classList.add('show');
	}
	document.querySelector('.alert').textContent = res.message;
} 

const dis_like = () => {
	const api = `http://localhost:4000/api/dis-like/${document.querySelector('button[dis-like]').textContent}`;
	const participant = document.querySelector('._').value;
	const liked_participant = document.querySelector("#username").textContent.trim();
	const Info = {
			participant: participant,
			liked_participant: liked_participant
	}
	fetch(api, {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(Info)
	}).then((res) => { return res.json(); })
			.then(checkResponce)
			.catch((error) => { console.error('Error', error);});
};

// event listeners
document.querySelector('button[dis-like]').addEventListener('click', dis_like);
