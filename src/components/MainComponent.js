import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

// this is the App component
class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			selectedDish: null
		};
	}

	// onDishSelect(dishId) {
	// 	this.setState({
	// 		selectedDish: dishId
	// 	});
	// }

	render() {
		const HomePage = () => {
			return <Home />;
		};

		console.log(this.state.selectedDish);
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
