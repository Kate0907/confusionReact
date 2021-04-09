import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDish: null
		};
	}

	renderDish(dish) {
		if (dish != null) {
			return (
				<div className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		} else {
			return <div />;
		}
	}

	renderComments(dish) {
		if (dish != null) {
			var MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

			const com = dish.comments.map((eachComment) => {
				var date = new Date(eachComment.date);
				var month = date.getMonth();
				var year = date.getFullYear();
				var day = date.getDate();

				return (
					<div key={eachComment.id} className="mx=0 px=0 height=20px">
						<li className="list-unstyled py-2">{eachComment.comment}</li>
						<li className="list-unstyled py-2">
							-- {eachComment.author} ,
							{MONTHS[month]} {day}, {year}
						</li>
					</div>
				);
			});

			return (
				<div className="col-12 col-md-5 m-1">
					<ul className="list-unstyled">
						<h4>Comments</h4>
						{com}
					</ul>
				</div>
			);
		} else return <div />;
	}

	render() {
		// console.log("Dishdetail Component: ")
		// console.log(this.props.dishFromMenu)
		return (
			<div className="row">
				{this.renderDish(this.props.dishFromMenu)}
				{this.renderComments(this.props.dishFromMenu)}
			</div>
		);
	}
}

export default Dishdetail;
