import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

//user defined component start with Capital Letter: RenderDish
//inside () is the prop of this component, so should add {}
function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
	console.log('render the comments');
	if (comments != null) {
		const com = comments.map((eachComment) => {
			return (
				<li key={eachComment.id}>
					<p className="list-unstyled py-2">{eachComment.comment}</p>
					<p className="list-unstyled py-2">
						-- {eachComment.author} ,{' '}
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: 'short',
							day: '2-digit'
						}).format(new Date(Date.parse(eachComment.date)))}
					</p>
				</li>
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
	} else return <div>No dish selected</div>;
}

//a funtional component:
const Dishdetail = (props) => {
	//Must have this if-else, otherwise system will crash
	if (props.dishFromMenu != null) {
		console.log('Dishdetail Component: ');
		console.log(props);
		// console.log(this.state.selectedDish);
		return (
			<div className="row">
				<RenderDish dish={props.dishFromMenu} />
				<RenderComments comments={props.dishFromMenu.comments} />
			</div>
		);
	} else return <div>no dish</div>;
};

export default Dishdetail;
