import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
 //   socketPath: '/goinfre/mmahloko/Desktop/mampstack/mysql/tmp/mysql.sock'
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
