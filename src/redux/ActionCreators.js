//import everything
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
// => : means return
//create a action, receive a comment and push that comment into the Redux store
export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
	const newComment = {
		//create a new Javascript object, map the various parameters we received into this JavaScript object
		dishId: dishId,
		rating: rating,
		author: author,
		comment: comment
	};
	newComment.date = new Date().toISOString();

	return fetch(baseUrl + 'comments', {
		method: 'POST',
		body: JSON.stringify(newComment),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin' //will learn in Node js course
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				//error handler: in this case you don't hear anything from server, no response (such as server is down)
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response))) //will be add to Redux store by dispatch it//Only if response is OK
		.catch((error) => {
			console.log('Post comments ', error.message);
			alert('Your comment could not be posted\nError: ' + error.message);
		});
};
//doing 2 dispatches
//A Thunk: returns a function, call dispatch for several actions
export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true));
	//fetch the dishes get from server into redux store
	return fetch(baseUrl + 'dishes')
		.then(
			(response) => {
				if (response.ok) {
					//response is ok
					return response; //This response is then available to the next then
				} else {
					//response is not ok, is an error.// response.status: error code => 200,304,404 etc
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error; // error will throw to go over to the last then
				}
			},
			(error) => {
				//error handler: in this case you don't hear anything from server, no response (such as server is down)
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json()) //convert response to json file
		.then((dishes) => dispatch(addDishes(dishes)))
		.catch((error) => dispatch(dishesFailed(error.message))); //we throw 2 errors, either one will be catched
};
//A function returns an action. tell user the dishes are laoding...
export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING
});
//A function returns an action
export const dishesFailed = (errmess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmess
});

//A funtion returns an action
export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes //the action payload is what you pass in ()
});

export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl + 'comments')
		.then(
			(response) => {
				if (response.ok) {
					//response is ok
					return response; //This response is then available to the next then
				} else {
					//response is not ok, is an error. response.status: error code => 200,304,404 etc
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error; // error will throw to go over to the last then
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			} //error handler: in this case you don't hear anything from server, no response
		)
		.then((response) => response.json()) //convert response to json file
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message))); //fetch the comments get from server into redux store
};

export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess
});

//A funtion returns an action
export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments //action.payload is what you pass in ()
});

export const fetchPromos = () => (dispatch) => {
	//This is a thunk, should add (dispatch) here, send the function of a function
	dispatch(promosLoading(true));

	return fetch(baseUrl + 'promotions')
		.then(
			(response) => {
				if (response.ok) {
					//response is ok
					return response; //This response is then available to the next then
				} else {
					//response is not ok, is an error. response.status: error code => 200,304,404 etc
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error; // error will throw to go over to the last then
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			} //error handler: in this case you don't hear anything from server, no response
		)
		.then((response) => response.json()) //convert response to json file
		.then((promos) => dispatch(addPromos(promos)))
		.catch((error) => dispatch(promosFailed(error.message))); //fetch the dishes get from server into redux store
};
//A function returns an action. tell user the promotions are laoding...
export const promosLoading = () => ({
	type: ActionTypes.PROMOS_LOADING
});
//A function returns an action
export const promosFailed = (errmess) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmess
});

//A funtion returns an action
export const addPromos = (promos) => ({
	type: ActionTypes.ADD_PROMOS,
	payload: promos //the action payload is what you pass in ()
});
