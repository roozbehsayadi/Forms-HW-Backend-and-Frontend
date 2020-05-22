import React from 'react'
const axios = require('axios')

export default class Forms extends React.Component {
	constructor() {
		super()
		this.state = {
			forms: null,
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:8000/api/forms')
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				// console.log(error)
			})
	}

	render() {
		return <h1>Forms Forms FORMS.</h1>
	}
}
