const mysql = require('mysql2');
require('dotenv/config');
const connexion = mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});
module.exports= connexion;