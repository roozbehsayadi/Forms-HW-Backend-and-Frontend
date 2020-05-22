const fs = require('fs')

let formsData = JSON.parse(fs.readFileSync('resources/repository.json'))

module.exports = {
	formsData: formsData,
}
