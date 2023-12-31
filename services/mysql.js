const mysql = require("mysql");
const pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
    "acquireTimeout": 6000000
});

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) => {
            if (error) {
                reject(error)
            } else {
                conn.query(query, params, (error, results, fields) => {
                    conn.release()
                    if(error){
                        reject(error)
                    } else {
                        resolve(results)
                    }
                })
            }
        })
    })
}
// module.exports = pool;
exports.pool = pool;