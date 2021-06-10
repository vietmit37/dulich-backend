const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const stripe = require("stripe")("sk_test_51IzjQtAHeeyUAi3RSHbt1sPob40b8icOzAMQYELld6hLGtJvMS1oqZtcvx0vcetqLSQMrgLS8nPeurvLJVMI35Mb00vo0mXV7B")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//IMPORT ROUTERS
const diaDiemRouter = require('./routes/diaDiem')
const tourRouter = require('./routes/tour')
const theLoaiTourRouter = require('./routes/theLoaiTour')
const khungThoiGianRouter = require('./routes/khungThoiGian')
const datTourRouter = require('./routes/datTour')

app.post('/thanhToan', cors(), async (req, res) => {
    let { amount, id, description } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "VND",
            description,
            payment_method: id,
            confirm: true
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