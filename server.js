const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())

//IMPORT ROUTERS
const diaDiemRouter = require('./routes/diaDiem')
const tourRouter = require('./routes/tour')
const theLoaiTourRouter = require('./routes/theLoaiTour')

app.use('/diaDiem', diaDiemRouter)
app.use('/tour', tourRouter)
app.use('/theLoaiTour', theLoaiTourRouter)

app.listen(port, () => {
    console.log(`Backend đang chạy tại http://localhost:${port}`)
})