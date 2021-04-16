import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

//user defined component start with Capital Letter: RenderDish
//inside () is the prop of this component, so should add {}
function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	} else {
		return <div />;
	}
}

function RenderComments({ comments }) {
	console.log('render the comments');
	if (comments != null) {
		const commentList = comments.map((eachComment) => {
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
			<ul className="list-unstyled">
				<h4>Comments</h4>
				{commentList}
			</ul>
		);
	} else return <div>No dish selected</div>;
}

//a funtional component:
const Dishdetail = (props) => {
	//Must have this if-else, otherwise system will crash
	if (props.dishSelected != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dishSelected.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dishSelected.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dishSelected} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.comments} />
					</div>
				</div>
			</div>
		);
	} else return <div>no dish</div>;
};

export default Dishdetail;
