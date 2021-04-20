import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
	dishes: DISHES,
	comments: COMMENTS,
	promotions: PROMOTIONS,
	leaders: LEADERS
};
//ES6 way of define a function
//If the state is undefined, it will be set to initialState
export const Reducer = (state = initialState, action) => {
	return state;
};
