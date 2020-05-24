import React from 'react'
import { withRouter } from 'react-router-dom'

import { Typography, Form, Input, Button } from 'antd'
import { Layout } from 'antd'

const axios = require('axios').default

class MyForm extends React.Component {
	constructor() {
		super()
		this.state = {
			fields: [],
			title: '',
			id: 0,
		}

		this.handleFormCreation = this.handleFormCreation.bind(this)
		// this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleFormCreation = (data) => {
		this.setState({
			fields: data.fields,
			title: data.title,
			id: data.id,
		})
	}

	componentDidMount() {
		console.log('component did mount')
		const id = this.props.match.params.id
		axios({
			method: 'get',
			url: 'http://localhost:8000/api/forms/' + id,
		})
			.then((response) => {
				this.handleFormCreation(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	// handleSubmit() {}

	render() {
		const { Title } = Typography
		const { Header, Footer, Sider, Content } = Layout

		return (
			<>
				<Layout>
					<Header style={{ textAlign: 'center' }}>
						<Title
							style={
								({ color: '#111111' },
								{ display: 'inline-block' })
							}
						>
							{this.state.title}
						</Title>
					</Header>
				</Layout>
			</>
		)
	}
}

export default withRouter(MyForm)
