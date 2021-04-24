import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Col,
	Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

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
//RenderComments has 3 props
function RenderComments({ comments, addComment, dishId }) {
	console.log('render the comments');
	if (comments != null) {
		const commentList = comments.map((eachComment) => {
			return (
				<li key={eachComment.id}>
					<p className="list-unstyled py-1">{eachComment.comment}</p>
					<p className="list-unstyled py-1">
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
			<div>
				<ul className="list-unstyled">
					<h4>Comments</h4>
					{commentList}
				</ul>

				<CommentForm dishId={dishId} addComment={addComment} />
			</div>
		);
	} else return <div>No dish selected</div>;
}

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleComment = this.handleComment.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleComment(values) {
		this.toggleModal();
		//The new comment will be added to the redux store's state, but will not alter COMMENT
		//Will reflect on React view: the new comments will appear in Comments section of webpage
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg" /> Submit Comment
				</Button>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleComment(values)}>
							<Row className="form-group">
								<Label md={12} htmlFor="rating">
									Rating
								</Label>
								<Col md={12}>
									<Control.select model=".rating" id="rating" name="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} htmlFor="author">
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: 'Can not leave empty ',
											minLength: 'Must be greater than 3 characters',
											maxLength: 'Must be 15 characters or less'
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} htmlFor="comment">
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>

							<Button type="submit" color="primary">
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

//a funtional component:
const Dishdetail = (props) => {
	if (props.isLoading) {
		return (
			//to use Bootstrap grid, must has "container" and "row"
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		<div className="container">
			<div className="row">
				<h4>{props.errMess}</h4>
			</div>
		</div>;
	} else if (props.dishSelected != null) {
		//Must have this if-else, otherwise system will crash
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
						<RenderComments
							comments={props.comments}
							addComment={props.addComment}
							dishId={props.dishSelected.id}
						/>
					</div>
				</div>
			</div>
		);
	} else return <div>no dish</div>;
};

export default Dishdetail;
