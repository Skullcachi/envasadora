const mysql = require('mysql');
const { promisify } = require('util');
const { database}  = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
        console.log(err);
        return;
    }
    if(connection){
        connection.release();
        console.log("Db is connected");
        return;
    }
});

// Promisify Pool Queries
pool.query = promisify(pool.query);
module.exports = pool;