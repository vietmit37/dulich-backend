const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//IMPORT ROUTERS
const diaDiemRouter = require('./routes/diaDiem')
const tourRouter = require('./routes/tour')
const theLoaiTourRouter = require('./routes/theLoaiTour')

app.use('/diaDiem', diaDiemRouter)
app.use('/tour', tourRouter)
app.use('/theLoaiTour', theLoaiTourRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})