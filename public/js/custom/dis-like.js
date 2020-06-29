'use strict';

const checkResponce = ({success, message}) => {
    console.log(success, message);
}

const dis_like = () => {
    const api = 'http://localhost:4000/api/dis-like';
    const participant = document.querySelector('._').value;
    const liked_participant = document.querySelector("input[name='username']").placeholder;
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
