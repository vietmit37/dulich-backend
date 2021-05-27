const router = require('express').Router()
const db = require('../dbConfig')

//GET tất cả các tours
router.route('/').get((req, res) => {
    db.connect().then(() => {
        //simple query
        const queryString =
            'select * FROM TOUR';

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})
//GET tour bằng IDTour
router.route('/chiTiet/:IDTour').get((req, res) => {
    db.connect().then(() => {
        const queryString =
            'EXEC GetTourWithID ' + req.params.IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})
//GET chi tiết đăng ký tour bằng IDTour
router.route('/chiTietDangKy/:IDTour').get((req, res) => {
    db.connect().then(() => {
        const queryString =
            'SELECT * FROM CHITIETTOUR WHERE IDTour = ' + req.params.IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})
//GET các tour bằng IDDiaDiem
router.route('/:IDDiaDiem').get((req, res) => {
    db.connect().then(() => {
        //simple query
        const queryString =
            'EXEC GetToursWithIDDiaDiem ' + req.params.IDDiaDiem;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})


//GET hình ảnh bìa của 1 tour
router.route('/HinhAnh/:IDTour').get((req, res) => {
    db.connect().then(() => {
        const queryString =
            'EXEC GetAnhBiaTour ' + req.params.IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//GET các khung thời gian của 1 tour
router.route('/chiTiet/khungThoiGian/:IDTour').get((req, res) => {
    db.connect().then(() => {
        const queryString =
            'SELECT * FROM KHUNGTHOIGIAN WHERE IDTour = ' + req.params.IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//GET list hình ảnh của 1 tour
router.route('/ListHinhAnh/:IDTour').get((req, res) => {
    db.connect().then(() => {
        const queryString =
            'EXEC GetListHinhAnhTour ' + req.params.IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Thêm tour
router.route('/add').post((req, res) => {
    db.connect().then(() => {
        const DiaDiem = req.body.DiaDiem
        const TheLoai = req.body.TheLoai
        const TenTour = req.body.TenTour
        const DiaChiTour = req.body.DiaChiTour
        const DiemNoiBat = req.body.DiemNoiBat
        const LichTrinh = req.body.LichTrinh
        const NoiDung = req.body.NoiDung
        const DoDai = req.body.DoDai

        //Query
        const queryString =
            `EXEC AddTour @IDDiaDiem = ${DiaDiem}, @IDTheLoaiTour = ${TheLoai}, @TenTour = N'${TenTour}',
            @DiaChiTour = N'${DiaChiTour}', @DiemNoiBat = N'${DiemNoiBat}', @LichTrinh = N'${LichTrinh}',
            @NoiDung = N'${NoiDung}', @DoDai = ${DoDai}`

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Xoá tour
router.route('/remove').post((req, res) => {
    db.connect().then(() => {
        const IDTour = req.body.IDTour
        //simple query
        const queryString = `EXEC DeleteTour ` + IDTour;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Thêm 1 hình ảnh vào tour
router.route('/insertPic').post((req, res) => {
    db.connect().then(() => {
        const IDTour = req.body.IDTour
        const HinhAnhDiaDiem = req.body.hinhAnh
        //simple query
        const queryString = `DECLARE @str VARCHAR(MAX);
        SET @str = '${HinhAnhDiaDiem}';
        INSERT INTO HINHANHTOUR(IDTour, HinhAnh)
        VALUES (${IDTour}, cast(N'' as xml).value('xs:base64Binary(sql:variable("@str"))', 'VARBINARY(MAX)'))`;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Sửa thông tin tour
router.route('/modifyTour').post((req, res) => {
    db.connect().then(() => {
        const IDTour = req.body.IDTour
        const TenTour = req.body.TenTour
        const DiaChiTour = req.body.DiaChiTour
        const DiemNoiBat = req.body.DiemNoiBat
        const LichTrinh = req.body.LichTrinh
        const NoiDung = req.body.NoiDung
        const DoDai = req.body.DoDai
        const GiaNguoiLon = req.body.GiaNguoiLon
        const GiaTreEm = req.body.GiaTreEm
        const NguoiLonToiThieu = req.body.NguoiLonToiThieu

        const queryString = `EXEC ModifyTour @IDTour = ${IDTour}, @IDDiaDiem = ${DiaDiem}, @IDTheLoaiTour = ${TheLoai}, @TenTour = N'${TenTour}',
        @DiaChiTour = N'${DiaChiTour}', @DiemNoiBat = N'${DiemNoiBat}', @LichTrinh = N'${LichTrinh}',
        @NoiDung = N'${NoiDung}', @DoDai = ${DoDai}, @GiaNguoiLon = ${GiaNguoiLon}, @GiaTreEm = ${GiaTreEm}, @NguoiLonToiThieu = ${NguoiLonToiThieu}`

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Xoá tất cả hình ảnh tour
router.route('/removeAllPic').post((req, res) => {
    db.connect().then(() => {
        const IDTour = req.body.IDTour
        //simple query
        const queryString = `DELETE FROM HINHANHTOUR WHERE IDTour = ` + IDTour

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})

//Search tour
router.route('/searchTour/:TuKhoaTimKiem').get((req, res) => {
    db.connect().then(() => {
        const TuKhoaTimKiem = req.params.TuKhoaTimKiem

        const queryString =
            `EXEC SearchTour @TenTour = N'%${TuKhoaTimKiem}%'`;

        db.request().query(queryString, (err, result) => {
            err ? console.log(err) : res.send(result.recordset)
        })
    })
})


module.exports = router;