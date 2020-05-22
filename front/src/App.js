import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from 'react-router-dom'
import Form from './components/Form'
import Forms from './components/Forms'
import 'antd/dist/antd.css'

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						<Forms />
					</Route>
					<Route path="/submit_form/:id" children={<Form />} />
				</Switch>
			</Router>
		</>
	)
}

export default App
