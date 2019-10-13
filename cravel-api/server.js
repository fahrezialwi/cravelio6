var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')

const app = express()
const port = 1010
const routers = require('./routers')


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send("Welcome to Cravel API"))
app.get('/favicon.ico', (req, res) => res.status(204))

app.use(routers.authRouter)
app.use(routers.tripRouter)
app.use(routers.transactionRouter)
app.use(routers.promoRouter)

app.listen(port, () => console.log("Server up in port " + port))