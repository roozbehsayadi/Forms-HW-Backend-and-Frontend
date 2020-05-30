import React from 'react'

import { withRouter } from 'react-router-dom'

import { Typography, Table, Switch } from 'antd'

import { Layout } from 'antd'

import { ConfigProvider } from 'antd'

const axios = require('axios')

class Forms extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title_en: "Forms' List",
			title_fa: 'لیست فرم‌ها',
			forms: [],
			language: 'EN',
		}

		this.handleTableCreation = this.handleTableCreation.bind(this)
		this.handleLanguageSwitch = this.handleLanguageSwitch.bind(this)
	}

	handleTableCreation = (data) => {
		this.setState({
			forms: data,
		})
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: 'http://localhost:8000/api/forms/',
		})
			.then((response) => {
				this.handleTableCreation(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	nextPath(path) {
		this.props.history.push(path)
	}

	handleLanguageSwitch() {
		this.setState((prevState) => {
			return { language: prevState.language === 'EN' ? 'FA' : 'EN' }
		})
	}

	render() {
		const { Title } = Typography
		const { Header, Content, Footer } = Layout

		const headerTextStyle = {
			color: '#333333',
			marginLeft: '-20px',
			display: 'inline-block',
			height: '100%',
			position: 'absolute',
			top: '10px',
		}

		const forms = this.state.forms.map((form, index) => {
			return {
				key: index + 1,
				id: form.id,
				title: form.title,
			}
		})

		const columns =
			this.state.language === 'EN'
				? [
						{
							title: '#',
							dataIndex: 'key',
							key: 'key',
							width: '1%',
						},
						{
							title: 'id',
							dataIndex: 'id',
							key: 'id',
							width: '4%',
						},
						{
							title: 'title',
							dataIndex: 'title',
							key: 'title',
						},
				  ]
				: [
						{
							title: '#',
							dataIndex: 'key',
							key: 'key',
							width: '1%',
						},
						{
							title: 'شناسه',
							dataIndex: 'id',
							key: 'id',
							width: '4%',
						},
						{
							title: 'عنوان',
							dataIndex: 'title',
							key: 'title',
						},
				  ]

		return (
			<>
				<ConfigProvider
					direction={this.state.language === 'EN' ? 'ltr' : 'rtl'}
				>
					<Layout>
						<Header
							style={{
								overflow: 'hidden',
								position: 'relative',
								width: '100%',
							}}
						>
							<Title style={headerTextStyle}>
								{this.state.language === 'EN'
									? this.state.title_en
									: this.state.title_fa}
							</Title>
						</Header>

						<Content
							style={{
								textAlign: 'left',
								marginLeft: '7%',
								width: '86%',
								marginTop: '2%',
							}}
						>
							<Table
								dataSource={forms}
								columns={columns}
								onRow={(record, index) => ({
									onClick: () => {
										console.log(
											'clicked on id ' + record.id
										)
										this.nextPath(
											'/submit_form/' + record.id + '/'
										)
									},
								})}
							/>
						</Content>
						<Footer>
							<Switch
								checkedChildren="فارسی"
								unCheckedChildren="English"
								onChange={this.handleLanguageSwitch}
								size="default"
							/>
						</Footer>
					</Layout>
				</ConfigProvider>
			</>
		)
	}
}

export default withRouter(Forms)
