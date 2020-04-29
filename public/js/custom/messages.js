const sendMsg = () => {
  const msg = document.querySelector('.write_msg').value;
  if (msg.trim()) {
    const api = 'http://localhost:4000/messages';
    const sender = document.querySelector('._').value;
    const room = parseInt(document.querySelector('.__').value);
    let reciever = '';
    if (sender === 'santa') {
      reciever = 'test';
    } else {
      reciever = 'santa';
    }
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        msg: msg.trim(),
        from: sender,
        to: reciever,
        room: room
      })
    }).then((res) =>  res.json())
      .then(data => console.log(data))
      .catch((error) => { console.error('Error', error); });
  }
  document.querySelector('.write_msg').value = '';
};

document.querySelector('.msg_send_btn').addEventListener('click', sendMsg);
