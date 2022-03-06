const router = require('express').Router()
const sql = require("mssql/msnodesqlv8");
const dbConfig = require('../dbConfig')

//GET tất cả các tours
router.route('/').get((req, res) => {
    //simple query
    const query =
        'select * FROM TOUR';

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

//GET tour bằng IDTour
router.route('/chiTiet/:IDTour').get((req, res) => {
    const query = 'EXEC GetTourWithID ' + req.params.IDTour;

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

//GET chi tiết đăng ký tour bằng IDTour
router.route('/chiTietDangKy/:IDTour').get((req, res) => {
    const query =
        'SELECT * FROM CHITIETTOUR WHERE IDTour = ' + req.params.IDTour;

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

//GET các tour bằng IDDiaDiem
router.route('/:IDDiaDiem').get((req, res) => {
    //simple query
    const query = 'EXEC GetToursWithIDDiaDiem ' + req.params.IDDiaDiem;

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

//GET top 4 tour bằng IDDiaDiem
router.route('/top4/:IDDiaDiem').get((req, res) => {
    //simple query
    const query = 'SELECT TOP 5 * FROM TOUR WHERE IDDiaDiem = ' + req.params.IDDiaDiem;

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

//GET hình ảnh bìa của 1 tour
router.route('/HinhAnh/:IDTour').get((req, res) => {
    const query =
        'EXEC GetAnhBiaTour ' + req.params.IDTour;

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

//GET các khung thời gian của 1 tour
router.route('/chiTiet/khungThoiGian/:IDTour').get((req, res) => {
    const query =
        'SELECT * FROM KHUNGTHOIGIAN WHERE IDTour = ' + req.params.IDTour;

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

//GET list hình ảnh của 1 tour
router.route('/ListHinhAnh/:IDTour').get((req, res) => {
    const query =
        'EXEC GetListHinhAnhTour ' + req.params.IDTour;

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

//Thêm tour
router.route('/add').post((req, res) => {
    const DiaDiem = req.body.DiaDiem
    const TheLoai = req.body.TheLoai
    const TenTour = req.body.TenTour
    const DiaChiTour = req.body.DiaChiTour
    const DiemNoiBat = req.body.DiemNoiBat
    const LichTrinh = req.body.LichTrinh
    const NoiDung = req.body.NoiDung
    const DoDai = req.body.DoDai
    const GiaNguoiLon = req.body.GiaNguoiLon
    const GiaTreEm = req.body.GiaTreEm

    //Query
    const query =
        `EXEC AddTour @IDDiaDiem = ${DiaDiem}, @IDTheLoaiTour = ${TheLoai}, @TenTour = N'${TenTour}',
            @DiaChiTour = N'${DiaChiTour}', @DiemNoiBat = N'${DiemNoiBat}', @LichTrinh = N'${LichTrinh}',
            @NoiDung = N'${NoiDung}', @DoDai = ${DoDai}, @GiaNguoiLon = ${GiaNguoiLon}, @GiaTreEm = ${GiaTreEm}, @NguoiLonToiThieu = 1`

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

//Xoá tour
router.route('/remove').post((req, res) => {
    const IDTour = req.body.IDTour
    //simple query
    const query = `EXEC DeleteTour ` + IDTour;

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

//Thêm 1 hình ảnh vào tour
router.route('/insertPic').post((req, res) => {
    const IDTour = req.body.IDTour
    const HinhAnhDiaDiem = req.body.hinhAnh
    //simple query
    const query = `DECLARE @str VARCHAR(MAX);
        SET @str = '${HinhAnhDiaDiem}';
        INSERT INTO HINHANHTOUR(IDTour, HinhAnh)
        VALUES (${IDTour}, cast(N'' as xml).value('xs:base64Binary(sql:variable("@str"))', 'VARBINARY(MAX)'))`;

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

//Sửa thông tin tour
router.route('/modifyTour').post((req, res) => {
    const IDTour = req.body.IDTour
    const TenTour = req.body.TenTour
    const TheLoai = req.body.TheLoai
    const DiaChiTour = req.body.DiaChiTour
    const DiemNoiBat = req.body.DiemNoiBat
    const LichTrinh = req.body.LichTrinh
    const NoiDung = req.body.NoiDung
    const DoDai = req.body.DoDai
    const GiaNguoiLon = req.body.GiaNguoiLon
    const GiaTreEm = req.body.GiaTreEm
    const NguoiLonToiThieu = req.body.NguoiLonToiThieu

    const query = `EXEC ModifyTour @IDTour = ${IDTour}, @IDTheLoaiTour = ${TheLoai}, @TenTour = N'${TenTour}',
        @DiaChiTour = N'${DiaChiTour}', @DiemNoiBat = N'${DiemNoiBat}', @LichTrinh = N'${LichTrinh}',
        @NoiDung = N'${NoiDung}', @DoDai = ${DoDai}, @GiaNguoiLon = ${GiaNguoiLon}, @GiaTreEm = ${GiaTreEm}, @NguoiLonToiThieu = ${NguoiLonToiThieu}`

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

//Xoá tất cả hình ảnh tour
router.route('/removeAllPic').post((req, res) => {
    const IDTour = req.body.IDTour
    //simple query
    const query = `DELETE FROM HINHANHTOUR WHERE IDTour = ` + IDTour

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

//Search tour
router.route('/searchTour/:TuKhoaTimKiem').get((req, res) => {
    const TuKhoaTimKiem = req.params.TuKhoaTimKiem

    const query =
        `EXEC SearchTour @TenTour = N'%${TuKhoaTimKiem}%'`;

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

//GET list tour đã đặt của khách
router.route('/tourDaDat/:IDUser').get((req, res) => {
    const IDUser = req.params.IDUser

    const query =
        `SELECT * FROM DATTOUR WHERE IDUser = '` + IDUser + `'`;

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

//Thêm tour vào yêu thích
router.route('/favorite').post((req, res) => {
    const IDTour = req.body.IDTour
    const IDUser = req.body.IDUser
    //simple query
    const query = `INSERT INTO YEUTHICH(IDTour, IDUser) VALUES(${IDTour}, '${IDUser}')`

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
router.route('/getFavorites/:IDUser').get((req, res) => {
    const query =
        `SELECT * FROM YEUTHICH WHERE IDUser = '${req.params.IDUser}'`;

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
module.exports = router;