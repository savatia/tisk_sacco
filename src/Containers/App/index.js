import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

import PrivateRoute from "../../Components/PrivateRoute"
import { getAuthStatus } from "../../Store/Users/selectors"

import Home from "../Home"
import SignUp from "../SignUp"
import SignIn from "../SignIn"
import Welcome from "../Welcome"
import Deposit from "../Deposit"
import Activate from "../Activate"

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/activate" component={Activate}/>
						<Route path="/signup" component={SignUp} />
						<Route path="/deposit/new" component={Deposit} />
						<Route path="/signin" component={SignIn} />
						<Route path="/home" component={Home}/>
{/* 					
						<PrivateRoute
							path="/deposit"
							component={Deposit}
							isUserAuthenticated={this.props.isUserAuthenticated}
						/> */}
						{/* <PrivateRoute
							path="/home"
							component={Home}
							isUserAuthenticated={this.props.isUserAuthenticated}
						/> */}
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
		isUserAuthenticated: getAuthStatus(state.users)
	}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
