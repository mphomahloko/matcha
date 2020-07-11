// // console.log(document.querySelector("input[name='username']"));
// 'use strict';

// const checkResponce = ({success, message})=> {
//     console.log(success);
//     console.log(message);
// }

// const activateBtn = ({srcElement}) => {
//     let element = document.querySelector("input[name=submit]");
//     if (element.hasAttribute('disabled') && srcElement.value) {
//         element.removeAttribute('disabled');
//     }
//     if (!document.querySelector("input[name='username']").value &&
//         !document.querySelector("input[name='password']").value) {
//             let disabled = document.createAttribute('disabled');
//             element.setAttributeNode(disabled);
//         }
//         const api = 'http://localhost:4000/api/validate';

//         const userInfo = {
//             name: srcElement.name,
//             value: srcElement.value
//         }

//         fetch(api, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify(userInfo)
//         }).then((res) => { return res.json(); })
//           .then(checkResponce)
//           .catch((error) => { console.error('Error', error);});
// };

// // event listeners to activate the submit button
// document.querySelector("input[name='username']").addEventListener('blur', activateBtn);
// document.querySelector("input[name='password']").addEventListener('blur', activateBtn);
