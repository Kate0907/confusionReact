//import everything
import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
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
	//setTimeout: will wait 2 sec then run dispatch function
	setTimeout(() => {
		dispatch(addDishes(DISHES));
	}, 2000);
};
//A function returns an action
//tell user the dishes are laoding...
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
	payload: dishes //action.payload is what you pass in ()
});
