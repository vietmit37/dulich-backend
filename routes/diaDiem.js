const router = require('express').Router()
const sql = require("mssql/msnodesqlv8");
const dbConfig = require('../dbConfig')

//GET địa điểm = IDDiaDiem
router.route('/:IDDiaDiem').get((req, res) => {
    const query = 'EXEC GetDiaDiemWithID ' + req.params.IDDiaDiem;

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

//GET tất cả địa điểm
router.route('/').get((req, res) => {
    // Create connection instance
    const conn = new sql.ConnectionPool(dbConfig);

    conn.connect()
        // Successfull connection
        .then(function () {

            // Create request instance, passing in connection instance
            const req = new sql.Request(conn);

            // Call mssql's query method passing in params
            req.query("SELECT * FROM DIADIEM")
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

//Thêm địa điểm
router.route('/add').post((req, res) => {
    const TenDiaDiem = req.body.tenDiaDiem
    const HinhAnhDiaDiem = req.body.hinhAnh
    const GioiThieuDiaDiem = req.body.gioiThieu
    //simple query
    const query = `DECLARE @str VARCHAR(MAX);
        SET @str = '${HinhAnhDiaDiem}';
        INSERT INTO DIADIEM(TenDiaDiem, HinhAnhDiaDiem, GioiThieu)
        VALUES (N'${TenDiaDiem}', cast(N'' as xml).value('xs:base64Binary(sql:variable("@str"))', 'VARBINARY(MAX)'), N'${GioiThieuDiaDiem}')`;

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

//Xoá địa điểm
router.route('/remove').post((req, res) => {
    const IDDiaDiem = req.body.IDDiaDiem
    //simple query
    const query = `DELETE FROM DIADIEM WHERE IDDiaDiem = ` + IDDiaDiem;

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