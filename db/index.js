const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '3.15.238.226',
  user: 'root',
  password: '',
  database: 'reviews',
});

connection.connect();

module.exports = connection;
