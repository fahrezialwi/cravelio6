var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')

const app = express()
const port = 1010
const routers = require('./routers')


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send("Welcome to Cravelio API"))
app.get('/favicon.ico', (req, res) => res.status(204))

app.use(routers.authRouter)
app.use(routers.tripRouter)
app.use(routers.pictureRouter)
app.use(routers.favoriteRouter)
app.use(routers.reviewRouter)
app.use(routers.transactionRouter)
app.use(routers.scheduleRouter)
app.use(routers.promoRouter)

app.use('/files/trip', express.static('uploads/trip-pictures'))
app.use('/files/review', express.static('uploads/review-pictures'))
app.use('/files/transfer', express.static('uploads/transfer-proofs'))

app.listen(port, () => console.log("Server up in port " + port))