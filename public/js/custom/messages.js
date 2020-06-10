'use strict';

let msgHistory = document.querySelector('.msg_history');
const sender = document.querySelector('._').value;
let receiver = '';
let room = 0;

const sendMsg = () => {
  const msg = document.querySelector('.write_msg').value;
  if (msg.trim()) {
    const api = 'http://localhost:4000/messages';

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        msg: msg.trim(),
        from: sender,
        to: receiver,
        room: room
      })
    }).then((res) =>  res.json())
      .then(data => {
        console.log(data); // append upon success add time on messaging or remove time all in all
        msgHistory.innerHTML += `<div class="outgoing_msg">
                        <div class="sent_msg">
                          <p>${msg.trim()}</p>
                          <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                      </div>`;
      })
      .catch((error) => { console.error('Error', error); });
  }
  document.querySelector('.write_msg').value = '';
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getMessages = (id, contact) => {
  const api = `http://localhost:4000/api/messages?id=${id}`;
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      from: sender,
    })
  }).then((res) =>  res.json())
      .then(res => {
        console.log(res); // works for successful requests only

        removeAllChildNodes(msgHistory);
        res.data.forEach(obj => {
          if (sender !== obj.from_participant) {
            msgHistory.innerHTML += `<div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                        <div class="received_msg">
                          <div class="received_withd_msg">
                            <p>${obj.msg}</p>
                            <span class="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                      </div>`;
          } else {
            msgHistory.innerHTML += `<div class="outgoing_msg">
                        <div class="sent_msg">
                          <p>${obj.msg}</p>
                          <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                      </div>`;
          }
        });
      })
      .catch((error) => { console.error('Error', error); });
  room = parseInt(id);
  receiver = contact;
};

const addMessages = (msg) => {
  msgHistory.innerHTML += `<div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                        <div class="received_msg">
                          <div class="received_withd_msg">
                            <p>${msg}</p>
                            <span class="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                      </div>`;
}
// find a solution for sending a msg
document.querySelector('.msg_send_btn').addEventListener('click', sendMsg);
