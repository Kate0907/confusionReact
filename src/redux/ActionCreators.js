//import everything
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
// => : means return
//Create an action called addComment
export const addComment = (dishId, rating, author, comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: {
		dishId: dishId, //the dishId should be what I receive in the parameter
		rating: rating,
		author: author,
		comment: comment
	}
});
//doing 2 dispatches
//A Thunk: returns a function, call dispatch for several actions
export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true));

	return fetch(baseUrl + 'dishes')
		.then((response) => response.json()) //convert response to json file
		.then((dishes) => dispatch(addDishes(dishes))); //fetch the dishes get from server into redux store
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
		.then((response) => response.json()) //convert response to json file
		.then((comments) => dispatch(addComments(comments))); //fetch the comments get from server into redux store
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
	dispatch(promosLoading(true));

	return fetch(baseUrl + 'promotions')
		.then((response) => response.json()) //convert response to json file
		.then((promos) => dispatch(addPromos(promos))); //fetch the dishes get from server into redux store
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
