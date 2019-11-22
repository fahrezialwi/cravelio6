const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const cors = require ('cors')
const routers = require('./routers')

const port = process.env.PORT || 1010

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors())

app.get('/', (req, res) => res.send("Welcome to Cravelio API"))
app.get('/favicon.ico', (req, res) => res.status(204))

app.use(routers.userRouter)
app.use(routers.tripRouter)
app.use(routers.pictureRouter)
app.use(routers.favoriteRouter)
app.use(routers.reviewRouter)
app.use(routers.transactionRouter)
app.use(routers.scheduleRouter)
app.use(routers.promoRouter)
app.use(routers.tokenRouter)

app.use('/files/trip', express.static('uploads/trip-pictures'))
app.use('/files/review', express.static('uploads/review-pictures'))
app.use('/files/transfer', express.static('uploads/transfer-proofs'))
app.use('/files/banner', express.static('uploads/banner-pictures'))
app.use('/files/profile-picture', express.static('uploads/profile-pictures'))
app.use('/files/general', express.static('uploads/general'))

app.listen(port, () => console.log("Server up in port " + port))