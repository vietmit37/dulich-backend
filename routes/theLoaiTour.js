const router = require('express').Router()
const db = require('../dbConfig')

//GET thông tin thể loại tour theo ID
router.route('/:IDTheLoaiTour').get((req, res) => {
    db.connect().then(() => {
        //simple query
        const queryString =
            'select * FROM THELOAITOUR WHERE IDTheLoaiTour = ' + req.params.IDTheLoaiTour;
        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})
//GET tất cả các thể loại tour
router.route('/').get((req, res) => {
    db.connect().then(() => {
        //simple query
        const queryString =
            'select * FROM THELOAITOUR';
        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

module.exports = router