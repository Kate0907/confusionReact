import { DISHES } from '../shared/dishes';
//reducer function, takes state and action as parameter
//if state is undefine, not modified, then give the DISHES as initial state
export const Dishes = (state = DISHES, action) => {
	// switch on action type
	switch (action.type) {
		default:
			return state;
	}
};

// Before split reducer.js, it look like below:

// export const initialState = {
// 	dishes: DISHES,
// 	comments: COMMENTS,
// 	promotions: PROMOTIONS,
// 	leaders: LEADERS
// };
// //ES6 way of define a function
// //If the state is undefined, it will be set to initialState
// export const Reducer = (state = initialState, action) => {
// 	return state;
// };
