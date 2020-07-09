
import mysql from 'mysql'
import 'dotenv/config'

const con = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    socketPath: process.env.DB_SOCKETPATH,
    multipleStatements: true
  }
);

module.exports = con;
