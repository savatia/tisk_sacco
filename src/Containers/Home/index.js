import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"

import styles from "./style.css"

import * as userActions from "../../Store/Users/actions"
import * as userSelectors from "../../Store/Users/selectors"

import ProfileBanner from "../../Components/ProfileBanner"
import RecentTransactions from "../../Components/RecentTransactions"
class HomePage extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		let getUser = () =>
			Promise.resolve(
				this.props.userActions.getUserInformation(this.props.userInformation)
			)
		getUser().then(() => {
			this.props.userActions.getUserDeposits(this.props.userInformation)
		})
	}

	render() {
		return (
			<div>
				{this.props.userInformation && (
					<div>
						<ProfileBanner user={this.props.userInformation} />
						<div className={styles.contentGrid}>
							<RecentTransactions />
						</div>

						<div className={styles.quickActions}>
							<div>
								<button type="submit" className={styles.quickActionDeposit}
									onClick={()=>{this.props.history.push("/deposit/new")}}>
									<div className={styles.quickActionIcon} />
									<div>Deposit Cash</div>
								</button>
								<button type="submit" className={styles.quickActionLoan}>
									<div className={styles.quickActionIcon} />
									<div>Take Loan</div>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		getUserInformationProcess: userSelectors.getUserInformationStatus(
			state.users
		),
		userInformation: userSelectors.getUserInformation(state.users),
		userDepoists: userSelectors.getUserDeposits(state.users)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(HomePage)
)
