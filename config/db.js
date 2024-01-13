const mysql = require('mysql');
const dbconfig = require('./dbconfig.json')

// mysql과 연결
const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,  
    debug: false
})

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;