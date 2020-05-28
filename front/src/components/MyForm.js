import React from 'react'
import { withRouter } from 'react-router-dom'

import { Typography, Form, Input, Select } from 'antd'
import { Layout } from 'antd'

const axios = require('axios').default

class MyForm extends React.Component {
	constructor() {
		super()
		this.state = {
			fields: [],
			title: '',
			id: 0,
			componentCounter: 0,
		}

		this.handleFormCreation = this.handleFormCreation.bind(this)
		this.getRespectiveComponent = this.getRespectiveComponent.bind(this)
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
		// console.log('component did mount')
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

	handleSubmit() {}

	getTextComponent(description, index) {
		const { Option } = Select

		return (
			<Form.Item
				name={description.name}
				label={description.title}
				key={index}
				rules={[
					{
						required: description.hasOwnProperty('required')
							? description.required
							: false,
					},
				]}
				style={{ display: 'inline-block' }}
			>
				{description.hasOwnProperty('options') ? (
					<Select allowClear>
						{description.options.map((option, optionIndex) => {
							return (
								<Option value={option.value} key={optionIndex}>
									{option.label}
								</Option>
							)
						})}
					</Select>
				) : (
					<Input />
				)}
			</Form.Item>
		)
	}

	getRespectiveComponent(description, index) {
		if (description.type === 'Text')
			return this.getTextComponent(description, index)
		else return <h1 key={index}>Temp</h1>
	}

	render() {
		const { Title } = Typography
		const { Header, Footer, Sider, Content } = Layout

		const headerTextStyle = { color: '#333333', marginLeft: '0' }

		const formItems = this.state.fields.map((field, index) => {
			return this.getRespectiveComponent(field, index)
		})

		return (
			<>
				<Layout>
					<Header>
						<Title style={headerTextStyle}>
							{this.state.title}
						</Title>
					</Header>
					<Content style={{ textAlign: 'left', marginLeft: '7%' }}>
						<Form
							name={'form_' + this.state.id}
							onFinish={this.handleSubmit}
						>
							{formItems}
						</Form>
					</Content>
				</Layout>
			</>
		)
	}
}

export default withRouter(MyForm)
