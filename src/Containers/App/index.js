import React, { Component } from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,	
} from "react-router-dom"
import { connect } from "react-redux"



import PrivateRoute from "../../Components/PrivateRoute"
import { getAuthStatus } from "../../Store/Users/selectors"

import Home from "../Home"
import SignUp from "../SignUp"
import SignIn from "../SignIn"
import Welcome from "../Welcome"

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/signup" component={SignUp} />
						<Route path="/signin" component={SignIn} />
						<Route path="/home" component={Home} />
						<PrivateRoute
							path="/protected"
							component={Home}
							isUserAuthenticated={this.props.isUserAuthenticated}
						/>
						<Route path="/" component={Welcome} />
					</Switch>
				</div>
			</Router>
		)
	}
}



const mapStateToProps = state => {
	return {
		isAuthenticated: getAuthStatus(state.users)
	}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
