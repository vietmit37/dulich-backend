const sql = require('mssql/msnodesqlv8')
//msnodesqlv8 module is requiered for Windows Authentication without using Username and Password

const config = new sql.ConnectionPool({
    database: 'TOURDULICH',
    server: '.\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
})

module.exports = config