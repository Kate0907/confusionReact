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
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
	return {
		//These 4 will be available as props in Main Component
		dishes: state.dishes, // state.dishes: These dishes are from redux state
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	};
};
//dispatch function, the only way to update the state and pass in an action object.
const mapDispatchToProps = (dispatch) => ({
	addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

// this is the App component
class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.props.dishes.filter((dish) => dish.featured)[0]}
					promotion={this.props.promotions.filter((dish) => dish.featured)[0]}
					leader={this.props.leaders.filter((dish) => dish.featured)[0]}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			return (
				<div>
					<Dishdetail
						//1st attribute
						dishSelected={
							this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]
						}
						//2nd attribute
						comments={this.props.comments.filter(
							(comment) => comment.dishId === parseInt(match.params.dishId, 10)
						)}
						//3rd attribute
						addComment={this.props.addComment}
					/>
				</div>
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

// withRouter: Connect my component to React Router
// mapStateToProps: Connect main component to Redux Store
// mapDispatchToProps: put addComment to props, so the main can use it as props.addComment
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
