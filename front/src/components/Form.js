import React from 'react'
import { useParams } from 'react-router-dom'
const axios = require('axios').default

export default function Form() {
	let { id } = useParams()

	// console.log('localhost:8000/api/forms/' + id)

	axios({
		method: 'get',
		url: 'http://localhost:8000/api/forms/' + id,
	})
		.then(function (response) {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error)
		})

	// axios
	// 	.get('http://localhost:8000/api/forms/' + id)
	// 	.then(function (response) {
	// 		console.log(response)
	// 	})
	// 	.catch(function (error) {
	// 		console.log('Error')
	// 		console.log(JSON.stringify(error))
	// 	})

	return <></>
}
