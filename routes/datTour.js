const router = require('express').Router()
const sql = require("mssql");
const dbConfig = require('../dbConfig')

//Đặt tour
router.route('/').post((req, res) => {
    const DanhXung = req.body.DanhXung
    const HoTen = req.body.HoTen
    const SoDienThoai = req.body.SoDienThoai
    const Email = req.body.Email
    const NgayDi = req.body.NgayDi

    const HoTenChung = req.body.HoTenChung
    const SoDienThoaiChung = req.body.SoDienThoaiChung
    const EmailChung = req.body.EmailChung
    const LaKhachThamQuan = req.body.LaKhachThamQuan
    const SoLuongNguoiLon = req.body.SoLuongNguoiLon
    const SoLuongTreEm = req.body.SoLuongTreEm
    const TongTien = req.body.TongTien
    const IDTour = req.body.IDTour

    const query = `EXEC OrderTour @DanhXung = ${DanhXung}, @HoTen = ${HoTen}, @SoDienThoai = ${SoDienThoai}, @Email = N'${Email}',
    @HoTenChung = N'${HoTenChung}', @SoDienThoaiChung = N'${SoDienThoaiChung}', @EmailChung = N'${EmailChung}',
    @LaKhachThamQuan = N'${LaKhachThamQuan}', @SoLuongNguoiLon = ${SoLuongNguoiLon}, @SoLuongTreEm = ${SoLuongTreEm}, 
    @TongTien = ${TongTien}, @IDTour = ${IDTour}, @NgayDi = ${NgayDi}`

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

//GET tất cả các records trong table DATTOUR
router.route('/getDatTour').get((req, res) => {

    const query = `SELECT * FROM DATTOUR`

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

//GET thông tin Đặt tour chi tiết bằng ID
router.route('/chiTiet/:IDDat').get((req, res) => {

    const query = `SELECT * FROM DATTOUR WHERE IDDat = ` + req.params.IDDat

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

//GET thông tin Đặt tour chi tiết bằng các trường thông tin
router.route('/chiTiet/useThongTinCT').post((req, res) => {
    const hoTen = req.body.HoTen
    const soDienThoai = req.body.SoDienThoai
    const ngayDi = req.body.NgayDi
    const IDTour = req.body.IDTour

    const query = `SELECT * 
    FROM DATTOUR 
    WHERE HoTen = N'${hoTen}' AND SoDienThoai = '${soDienThoai}' AND IDTour = ${IDTour} AND NgayDi = '${ngayDi}';`

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

// //Thanh toán Stripe
// router.route('/thanhToan').post(cors(), async (req, res) => {
//     let { amount, id } = req.body
//     try {
//         const payment = await stripe
//     } catch (error) {

//     }
// })

module.exports = router