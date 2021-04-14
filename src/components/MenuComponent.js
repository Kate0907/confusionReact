import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

//A pure funtional component
function RenderMenuItem({ dish, onClick }) {
	return (
		<Card onClick={() => onClick(dish.id)}>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardImgOverlay>
				<CardTitle> {dish.name} </CardTitle>
			</CardImgOverlay>
		</Card>
	);
}

const Menu = (props) => {
	//go through the dishes arrey, for every dish I will do the return=>
	const menu = props.dishes.map((dish) => {
		return (
			//each items should have a unique key
			<div key={dish.id} className="col-12 col-md-5 m-1">
				<RenderMenuItem dish={dish} onClick={props.onClick} />
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">{menu}</div>
		</div>
	);
};

export default Menu;
