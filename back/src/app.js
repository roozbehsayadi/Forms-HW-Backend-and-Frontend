const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const router = require('./controller')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}

app.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}!`)
)
