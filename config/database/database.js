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
        user_id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
        username varchar(50) NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(100) NOT NULL,
        firstname varchar(100),
        lastname varchar(100),
        gender varchar(10),
        sexualPreference varchar(10),
        bibliography varchar(250),
        active int(2) NOT NULL
    )`, (err, result) => {
        if (err) throw err;
        console.log("users Table created");
    });
    con.query(`CREATE TABLE IF NOT EXISTS interests(
        interest_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        interestName varchar(50)
    )`, (err, results) => {
        if (err) throw err;
        console.log("interests table created");
    });
    con.query(`CREATE TABLE IF NOT EXISTS pictures(
        picture_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id int(11) NOT NULL,
        profilePic int(2)
    )`, (err, results) => {
        if (err) throw err;
        console.log("pictures table created");
    });
    con.query(`CREATE TABLE IF NOT EXISTS rooms(
        room_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        participant_1 int(11) NOT NULL,
        participant_2 int(11) NOT NULL
    )`, (err, results) => {
        if (err) throw err;
        console.log("rooms table created");
    });
    
    con.query(`CREATE TABLE IF NOT EXISTS messages(
        msg_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        room_id int(11) NOT NULL,
        from_participant int(11) NOT NULL,
        to_participant int(11) NOT NULL,
        msg varchar(255)
    )`, (err, results) => {
        if (err) throw err;
        console.log("messages table created");
    });
});

module.exports = con;
