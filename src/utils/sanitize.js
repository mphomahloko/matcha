const sanitize = (input) => {
    let entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&qt;',
        '\"': '&quot;',
        '\'': '&apos',
        '`': '&#96;',
        ' ': '&#32;'
    };

    return input.trim().split('').map((char) => {
        return entities[char] || char;
    }).join('');
}

module.exports = { sanitize };
