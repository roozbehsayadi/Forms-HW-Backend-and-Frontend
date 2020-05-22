const express = require('express')
const router = express.Router()
const repository = require('./repository')

router.get('/forms/:id', (req, res) => {
	console.log(req.params)
	for (let i = 0; i < repository.formsData.length; i++) {
		if (repository.formsData[i].id == req.params['id'])
			res.status(200).send(repository.formsData[i])
	}
	res.status(404).send({
		message: 'Form with id ' + req.params['id'] + ' not found.',
	})
})

router.get('/forms', (req, res) => {
	console.log('Get for forms')
	res.status(200).send(repository.formsData)
})

module.exports = router
