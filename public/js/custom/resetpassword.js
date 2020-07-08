const url = new URL(window.location.href);
if (url.searchParams.get('user')) {
    let username = url.searchParams.get('user');
    document.querySelector("input[name='username']").setAttribute("value", username)
}
