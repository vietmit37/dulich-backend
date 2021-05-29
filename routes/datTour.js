const router = require('express').Router()
const sql = require("mssql");
const dbConfig = require('../dbConfig')

//Đặt tour
router.route('/datTour').post((req, res) => {
    const DanhXung = req.body.DanhXung
    const HoTen = req.body.HoTen
    const SoDienThoai = req.body.SoDienThoai
    const Email = req.body.Email

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
    @TongTien = ${TongTien}, @IDTour = ${IDTour}`

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