// console.log(document.querySelector("input[name='username']"));
const pageVisited = ({target})=> {
    console.log(target.value);
}

document.querySelector("input[name='username']").addEventListener('blur', pageVisited);