import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { HomeOutlined } from '@ant-design/icons'

import {
	Typography,
	Form,
	Input,
	InputNumber,
	Select,
	Space,
	DatePicker,
	Button,
} from 'antd'
import { Layout } from 'antd'

const axios = require('axios').default

class MyForm extends React.Component {
	constructor() {
		super()
		this.state = {
			error: undefined,
			fields: [],
			title: '',
			id: 0,
			redirect: null,
		}

		this.handleFormCreation = this.handleFormCreation.bind(this)
		this.getRespectiveComponent = this.getRespectiveComponent.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.redirectToHome = this.redirectToHome.bind(this)
	}

	handleFormCreation = (data) => {
		this.setState({
			error: false,
			fields: data.fields,
			title: data.title,
			id: data.id,
		})
	}

	componentDidMount() {
		const id = this.props.match.params.id
		axios({
			method: 'get',
			url: 'http://localhost:8000/api/forms/' + id,
		})
			.then((response) => {
				this.handleFormCreation(response.data)
			})
			.catch((error) => {
				this.setState({
					error: true,
					id: id,
				})
				// console.error(error)
			})
	}

	handleSubmit(values) {
		console.log(values)
		axios.post('http://localhost:8000/api/post_form', values).then(() => {
			console.log('HEREEE')
			this.setState({ redirect: '/' })
		})
	}

	redirectToHome() {
		this.setState({ redirect: '/' })
	}

	renderSelectComponent(description) {
		const { Option } = Select
		return (
			<Select allowClear>
				{description.options.map((option, optionIndex) => {
					return (
						<Option
							value={JSON.stringify(option.value)}
							key={optionIndex}
						>
							{JSON.stringify(option.label)}
						</Option>
					)
				})}
			</Select>
		)
	}

	getMapComponent(description, index) {
		return (
			<>
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

					style={{
						display: 'inline-block',
                        width: description.hasOwnProperty('options') ? '100px':'400px',
						height: description.hasOwnProperty('options') ? '100px':'400px',
						marginBottom: description.hasOwnProperty('options') ? '0%':'50px'
					}}
				>
					{description.hasOwnProperty('options') ? (
						this.renderSelectComponent(description)
					) : (
						<Map
							google={this.props.google}
							zoom={14}
							containerStyle={{
                                width: '400px',
                                height: '400px',
							}}
							initialCenter={{ lat: -1.2884, lng: 36.8233 }}
							key={index}
						/>
					)}
				</Form.Item>
				<br />
			</>
		)
	}

	getDateComponent(description, index) {
		return (
			<>
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
						this.renderSelectComponent(description)
					) : (
						<DatePicker />
					)}
				</Form.Item>
				<br />
			</>
		)
	}

	getNumberComponent(description, index) {
		return (
			<>
				<Form.Item
					name={description.name}
					label={description.title}
					key={index}
					rules={[
						{
							required: description.hasOwnProperty('required')
								? description.required
								: false,
							type: 'number',
							message: 'Age should be a number.',
						},
					]}
					style={{ display: 'inline-block' }}
				>
					{description.hasOwnProperty('options') ? (
						this.renderSelectComponent(description)
					) : (
						<InputNumber />
					)}
				</Form.Item>
				<br />
			</>
		)
	}

	getTextComponent(description, index) {
		return (
			<>
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
						this.renderSelectComponent(description)
					) : (
						<Input />
					)}
				</Form.Item>
				<br />
			</>
		)
	}

	getRespectiveComponent(description, index) {
		if (description.type === 'Text')
			return this.getTextComponent(description, index)
		if (description.type === 'Number')
			return this.getNumberComponent(description, index)
		if (description.type === 'Date')
			return this.getDateComponent(description, index)
		if (description.type === 'Location')
			return this.getMapComponent(description, index)
		else return <h1 key={index}>Temp</h1>
	}

	render() {
		if (this.state.error === true) {
			return <h1>Could not find form with ID {this.state.id}!</h1>
		}

		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		const { Title } = Typography
		const { Header, Content } = Layout

		const headerTextStyle = {
			color: '#333333',
			marginLeft: '-20px',
			display: 'inline-block',
			height: '100%',
			position: 'absolute',
			top: '0',
		}

		const formItems = this.state.fields.map((field, index) => {
			return this.getRespectiveComponent(field, index)
		})

		return (
			<>
				<Layout>
					<Header
						style={
							({ overflow: 'hidden' },
							{ position: 'relative' },
							{ width: '100%' })
						}
					>
						<Title style={headerTextStyle}>
							{this.state.title}
						</Title>
					</Header>
					<Content
						style={{
							textAlign: 'left',
							marginLeft: '7%',
							width: '86%',
						}}
					>
						<Form
							name={'form_' + this.state.id}
							onFinish={this.handleSubmit}
						>
							<Space
								direction="vertical"
								style={{ marginTop: '2%' }}
							>
								<Button
									type="default"
									onClick={this.redirectToHome}
									icon={<HomeOutlined />}
								>
									Go back home
								</Button>
								{formItems}{' '}
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Space>
							{/* {formItems} */}
						</Form>
					</Content>
				</Layout>
			</>
		)
	}
}

export default withRouter(
	GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_API_KEY })(MyForm)
)
