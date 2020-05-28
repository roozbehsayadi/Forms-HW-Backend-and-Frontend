import React from 'react'

import {withRouter} from 'react-router-dom'

import {
    Typography,
    Table,
} from 'antd'

import {Layout} from 'antd'
import App from "../App";

const axios = require('axios')

export default class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
        }

        this.handleTableCreation = this.handleTableCreation.bind(this);
    }

    handleTableCreation = (data) => {
        this.setState({
            forms: data,
        });
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/forms/'
        })
            .then((response) => {
                this.handleTableCreation(response.data);
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    render() {
        const {Title} = Typography
        const {Header, Content} = Layout

        const headerTextStyle = {
            color: '#333333',
            marginLeft: '-20px',
            display: 'inline-block',
            height: '100%',
            position: 'absolute',
            top: '0',
        }

        const forms = this.state.forms.map((form, index) => {
            return ({
                key: index + 1,
                id: form.id,
                title: form.title,
            })
        });

        const columns = [
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

        return (
            <>
                <Layout>
                    <Header
                        style={{
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%',
                        }}
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
                        <h1>Forms Forms FORMS.</h1>
                        <Table
                            dataSource={forms}
                            columns={columns}
                            onRow={(record, index) => ({
                                onClick: () => {
                                    console.log('clicked on id ' + record.id);
                                    // TODO: do routing
                                }
                            })}
                        />
                    </Content>
                </Layout>
            </>
        )
    }
}
