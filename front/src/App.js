import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from 'react-router-dom'
import MyForm from './components/MyForm'
import Forms from './components/Forms'
import 'antd/dist/antd.css'
import './App.less'

function App() {
	// console.log('IN APP')
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/" children={<Forms />} />
					<Route path="/submit_form/:id" children={<MyForm />} />
				</Switch>
			</Router>
		</>
	)
}

export default App
