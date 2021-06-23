const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const stripe = require("stripe")("sk_test_51IzjQtAHeeyUAi3RSHbt1sPob40b8icOzAMQYELld6hLGtJvMS1oqZtcvx0vcetqLSQMrgLS8nPeurvLJVMI35Mb00vo0mXV7B")
const sql = require("mssql");
const dbConfig = require('./dbConfig')

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain)
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

//IMPORT ROUTERS
const diaDiemRouter = require('./routes/diaDiem')
const tourRouter = require('./routes/tour')
const theLoaiTourRouter = require('./routes/theLoaiTour')
const khungThoiGianRouter = require('./routes/khungThoiGian')
const datTourRouter = require('./routes/datTour')

app.post('/thanhToan', cors(), async (req, res) => {
    let { IDDat, amount, id, description } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "VND",
            description,
            payment_method: id,
            confirm: true
        })
            .then((res) => {
                //console.log(res.id)
                const stripeID = res.id

                const query = `UPDATE DATTOUR SET StripeID = '${stripeID}' WHERE IDDat = ${IDDat}`

                // Create connection instance
                const conn = new sql.ConnectionPool(dbConfig);

                conn.connect()
                    // Successfull connection
                    .then(function () {

                        // Create request instance, passing in connection instance
                        const req = new sql.Request(conn);

                        // Call mssql's query method passing in params
                        req.query(query)
                            .then(function () {
                                conn.close();
                            })
                            // Handle sql statement execution errors
                            .catch(function (err) {
                                conn.close();
                            })

                    })
                    // Handle connection errors
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    });
            })
        res.json({
            message: "Payment successful on backend !",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Payment failed on backend !",
            success: false
        })
    }
})

app.post('/datTour/refunded/', cors(), async (req, res) => {
    const query = `UPDATE DATTOUR SET TrangThai = 2 WHERE IDDat = ` + req.body.IDDat
    console.log(req.body)
    try {
        const refund = await stripe.refunds.create({
            payment_intent: req.body.StripeID,
        })
            .then(() => {
                console.log('Hoàn tiền thành công !')
            })
    } catch (error) {

    }

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
                    //res.send(recordsets.recordset);
                    res.send('success')
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

app.use('/diaDiem', diaDiemRouter)
app.use('/tour', tourRouter)
app.use('/theLoaiTour', theLoaiTourRouter)
app.use('/khungThoiGian', khungThoiGianRouter)
app.use('/datTour', datTourRouter)
app.use('/', (req, res) => {
    res.send('Welcome to API tour du lịch OKA2')
})
app.listen(port, () => {
    console.log(`Backend đang chạy tại http://localhost:${port}`)
})