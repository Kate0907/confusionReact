import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//A pure funtional component
function RenderMenuItem({ dish, onClick }) {
	return (
		<Card>
			<Link to={`/menu/${dish.id}`}>
				<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
				<CardImgOverlay>
					<CardTitle> {dish.name} </CardTitle>
				</CardImgOverlay>
			</Link>
		</Card>
	);
}

const Menu = (props) => {
	//go through the dishes arrey, for every dish I will do the return=>
	const menu = props.dishes.dishes.map((dish) => {
		return (
			//each items should have a unique key
			<div key={dish.id} className="col-12 col-md-5 m-1">
				<RenderMenuItem dish={dish} />
			</div>
		);
	});

	if (props.dishes.isLoading) {
		return (
			//to use Bootstrap grid, must has "container" and "row"
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.dishes.errMess) {
		<div className="container">
			<div className="row">
				<h4>{props.errMess}</h4>
			</div>
		</div>;
	} else
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/home">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>Menu</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>Menu</h3>
						<hr />
					</div>
				</div>
				<div className="row">{menu}</div>
			</div>
		);
};

export default Menu;
