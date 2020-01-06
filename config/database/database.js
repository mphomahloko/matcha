import mysql from 'mysql';
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    socketPath: process.env.DB_SOCKETPATH
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
    con.query('CREATE DATABASE IF NOT EXISTS matcha', (err, result) => {
        if (err) throw err;
        console.log("Database created");
      });
    con.query('USE matcha');
    con.query(`CREATE TABLE IF NOT EXISTS matcha_users(
        id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
        username varchar(50) NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(100) NOT NULL
    )`, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
});

module.exports = con;
