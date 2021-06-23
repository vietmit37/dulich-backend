const router = require('express').Router()
const sql = require("mssql");
const dbConfig = require('../dbConfig')

//Đặt tour
router.route('/').post((req, res) => {
    const UserID = req.body.UserID
    const DanhXung = req.body.DanhXung
    const HoTen = req.body.HoTen
    const SoDienThoai = req.body.SoDienThoai
    const Email = req.body.Email
    const NgayDi = req.body.NgayDi

    const SoLuongNguoiLon = req.body.SoLuongNguoiLon
    const SoLuongTreEm = req.body.SoLuongTreEm
    const TongTien = req.body.TongTien
    const IDTour = req.body.IDTour
    const IDKhungThoiGian = req.body.IDKhungThoiGian
    const ThoiGianTaoOrder = req.body.ThoiGianTaoOrder

    const query = `EXEC OrderTour @IDUser = ${UserID}, @DanhXung = N'${DanhXung}', @HoTen = N'${HoTen}', @SoDienThoai = '${SoDienThoai}', @Email = '${Email}',
    @SoLuongNguoiLon = ${SoLuongNguoiLon}, @SoLuongTreEm = ${SoLuongTreEm}, 
    @TongTien = ${TongTien}, @IDTour = ${IDTour}, @IDKhungThoiGian = ${IDKhungThoiGian}, @NgayDi = '${NgayDi}', @ThoiGianTaoOrder = '${ThoiGianTaoOrder}'`

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

//Customer huỷ tour, chuyển trạng thái thành Refunding
router.route('/refunding/:IDDat').get((req, res) => {

    const query = `UPDATE DATTOUR SET TrangThai = 1 WHERE IDDat = ` + req.params.IDDat

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
                    res.send('very sad right now');
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

//Partner xác nhận huỷ tour, chuyển trạng thái thành Refunded

//GET thông tin Đặt tour chi tiết bằng các trường thông tin
router.route('/chiTiet/useThongTinCT').post((req, res) => {
    const IDUser = req.body.IDUser
    const SDT = req.body.SoDienThoai
    const ngayDi = req.body.NgayDi
    const IDTour = req.body.IDTour
    const ThoiGianTaoOrder = req.body.ThoiGianTaoOrder

    const query = `SELECT * 
    FROM DATTOUR 
    WHERE SDT = '${SDT}' AND IDUser = '${IDUser}' AND IDTour = ${IDTour} AND NgayDi = '${ngayDi}' AND ThoiGianTaoOrder = ${ThoiGianTaoOrder};`

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