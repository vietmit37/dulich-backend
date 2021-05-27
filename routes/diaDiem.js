const router = require('express').Router()
const db = require('../dbConfig')

//GET địa điểm = IDDiaDiem
router.route('/:IDDiaDiem').get((req, res) => {
    db.connect().then(() => {

        const queryString = 'EXEC GetDiaDiemWithID ' + req.params.IDDiaDiem;
        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//GET tất cả địa điểm
router.route('/').get((req, res) => {
    db.connect().then(() => {
        //simple query
        const queryString = 'select * FROM DIADIEM';
        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Thêm địa điểm
router.route('/add').post((req, res) => {
    db.connect().then(() => {
        const TenDiaDiem = req.body.tenDiaDiem
        const HinhAnhDiaDiem = req.body.hinhAnh
        const GioiThieuDiaDiem = req.body.gioiThieu
        //simple query
        const queryString = `DECLARE @str VARCHAR(MAX);
        SET @str = '${HinhAnhDiaDiem}';
        INSERT INTO DIADIEM(TenDiaDiem, HinhAnhDiaDiem, GioiThieu)
        VALUES (N'${TenDiaDiem}', cast(N'' as xml).value('xs:base64Binary(sql:variable("@str"))', 'VARBINARY(MAX)'), N'${GioiThieuDiaDiem}')`;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Xoá địa điểm
router.route('/remove').post((req, res) => {
    db.connect().then(() => {
        const IDDiaDiem = req.body.IDDiaDiem
        //simple query
        const queryString = `DELETE FROM DIADIEM WHERE IDDiaDiem = ` + IDDiaDiem;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

module.exports = router