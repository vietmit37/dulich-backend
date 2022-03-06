const router = require('express').Router()
const sql = require("mssql/msnodesqlv8");
const dbConfig = require('../dbConfig')

//GET khung thời gian = IDKhungThoiGian
router.route('/:IDKhungThoiGian').get((req, res) => {
    const query = 'SELECT * FROM KHUNGTHOIGIAN WHERE IDKhungThoiGian = ' + req.params.IDKhungThoiGian;

    // Create connection instance
    const conn = new sql.ConnectionPool(dbConfig);

    conn.connect()
        // Successfull connection
        .then(function () {

            // Create request instance, passing in connection instance
            const req = new sql.Request(conn);

            // Call mssql's query method passing in params
            req.query(query)
                .then(function (recordsets) {
                    res.send(recordsets.recordset);
                    conn.close();
                })
                // Handle sql statement execution errors
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                })

        })
        // Handle connection errors
        .catch(function (err) {
            console.log(err);
            conn.close();
        });
})

module.exports = router