const fs = require('fs')

let formsData = JSON.parse(fs.readFileSync('resources/repository.json'))

function add_data(data){
	this.formsData = formsData.concat(data);
	fs.writeFile('resources/repository.json', JSON.stringify(this.formsData), (err => {
		if (err) {
			console.log('error in updating repository.');
			throw err;
		}
	}));
}

module.exports = {
	formsData: formsData,
	add_data: add_data,
}
