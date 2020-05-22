const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./controller')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api', router)

app.listen(8000, () => console.log(`Server listening on port ${8000}!`))
