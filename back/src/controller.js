const express = require('express')
const router = express.Router()
let repository = require('./repository')

router.get('/forms/:id', (req, res) => {
	// console.log(req.params)
	let flag = false
	for (let i = 0; i < repository.formsData.length; i++) {
		if (repository.formsData[i].id == req.params['id']) {
			res.status(200).send(repository.formsData[i])
			flag = true
		}
	}
	if (flag === false) {
		res.status(404).send({
			message: 'Form with id ' + req.params['id'] + ' not found.',
		})
	}
})

router.get('/forms', (req, res) => {
	// console.log('Get for forms')
	res.status(200).send(repository.formsData)
})

router.post('/post_form', (req, res) => {
	console.log('Got a form!')
	console.log(req.body)
	res.status(200).send('Form retrieved successfully')
})

router.post('/admin/add', (req, res) => {
    console.log('Got a new form!');
    // console.log(req.body);
    repository.add_data(req.body);
    res.status(200).send('new form added.');
    console.log('new form added.');
})

module.exports = router
