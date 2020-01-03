var express = require('express');
var app = express();
var path = require('path');

app.get('/', (req, res)=>{
    res.send("Hello World!");
});

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, '/register.html'));
});

app.listen(3000);