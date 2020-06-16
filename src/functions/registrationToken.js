export function regToken(length) {
    let text = '';
    let allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < length; i++) {
        text += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return text;
}