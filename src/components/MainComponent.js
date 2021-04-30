import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	postComment,
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders,
	postFeedback
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//Map the state in store to MainComponent
const mapStateToProps = (state) => {
	return {
		//These 4 will be available as props in Main Component
		dishes: state.dishes, // state.dishes: These dishes are from redux store state
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	};
};
//Dispatch function, it is the only way to update the state and pass in an action object.
const mapDispatchToProps = (dispatch) => ({
	//postComment is a props of MainComponent
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	//postFeedback is a props of MainComponent
	postFeedback: (feedback) => dispatch(postFeedback(feedback)),
	//dispatch the fetchDishes thunk, so fetchDishes can be used as  MainComponent's props
	//fetchDishes is a props of MainComponent
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	//resetFeedbackForm is props of MainComponent, it is dispatched with actions.reset, actions is imported from 'react-redux-form'
	resetFeedbackForm: () => {
		dispatch(actions.reset('feedback'));
	},
	fetchComments: () => {
		dispatch(fetchComments());
	},
	fetchPromos: () => {
		dispatch(fetchPromos());
	},
	fetchLeaders: () => {
		dispatch(fetchLeaders());
	}
});

// this is the App component
class Main extends Component {
	constructor(props) {
		super(props);
	}

	//lifecycle method, will appear just after vue is mounted
	//When my main component is mounted, will fetch all these from server
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					//1 ~~~~~ dishes ~~~~~
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					//2
					dishesLoading={this.props.dishes.isLoading}
					//3
					dishesErrMess={this.props.dishes.errMess}
					//1 ~~~~~ promotions ~~~~~
					promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
					//2
					promoLoading={this.props.promotions.isLoading}
					//3
					promoErrMess={this.props.promotions.errMess}
					//1 ~~~~~  leaders ~~~~~
					leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
					//2
					leadersLoading={this.props.leaders.isLoading}
					//3
					leadersErrMess={this.props.leaders.errMess}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			return (
				<div>
					<Dishdetail
						//1
						dishSelected={
							this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]
						}
						//2
						isLoading={this.props.dishes.isLoading}
						//3
						errMess={this.props.dishes.errMess}
						//4
						comments={this.props.comments.comments.filter(
							(comment) => comment.dishId === parseInt(match.params.dishId, 10)
						)}
						//5
						commentsErrMess={this.props.comments.errMess}
						//6
						postComment={this.props.postComment}
					/>
				</div>
			);
		};

		return (
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						<Switch>
							<Route path="/home" component={HomePage} />
							{/* MenuComponent has a props called dishes which is equal to state.dishes in the store */}
							<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
							<Route path="/menu/:dishId" component={DishWithId} />
							<Route
								exact
								path="/contactus"
								component={() => (
									<Contact
										resetFeedbackForm={this.props.resetFeedbackForm}
										postFeedback={this.props.postFeedback}
									/>
								)}
							/>
							<Route
								path="/aboutus"
								component={() => (
									<About
										leaders={this.props.leaders.leaders}
										leadersLoading={this.props.leaders.isLoading}
										leadersErrMess={this.props.leaders.errMess}
									/>
								)}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

// withRouter: Connect my component to React Router
// mapStateToProps: Connect main component to Redux Store
// mapDispatchToProps: put addComment to props, so the main can use it as props.addComment
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
