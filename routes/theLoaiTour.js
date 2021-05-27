const router = require('express').Router()
const sql = require("mssql");
const dbConfig = require('../dbConfig')

//GET thông tin thể loại tour theo ID
router.route('/:IDTheLoaiTour').get((req, res) => {
    //simple query
    const query =
        'select * FROM THELOAITOUR WHERE IDTheLoaiTour = ' + req.params.IDTheLoaiTour;

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
//GET tất cả các thể loại tour
router.route('/').get((req, res) => {
    //simple query
    const query =
        'select * FROM THELOAITOUR';

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