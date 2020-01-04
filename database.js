import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    socketPath: '/goinfre/mmahloko/Desktop/mampstack/mysql/tmp/mysql.sock'
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
    con.query("CREATE DATABASE matcha", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
});

module.exports = con;
