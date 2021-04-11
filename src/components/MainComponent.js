import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

// this is the App component
class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			selectedDish: null
		};
	}

	onDishSelect(dishId) {
		this.setState({
			selectedDish: dishId
		});
	}

	render() {
		return (
			<div>
				{/* render the Navbar component */}
				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
					</div>
				</Navbar>

				{/* render the Menu component  */}
				<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
				<Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.selectedDish)[0]} />
			</div>
		);
	}
}

export default Main;
