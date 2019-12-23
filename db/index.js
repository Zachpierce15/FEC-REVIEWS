const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'ec2-3-15-238-226.us-east-2.compute.amazonaws.com',
  user: 'root',
  password: '',
  database: 'reviews',
});

connection.connect();

module.exports = connection;
