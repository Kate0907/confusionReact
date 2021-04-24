import * as ActionTypes from './ActionTypes';

//Reducer function, takes state and action as parameter
//if state is undefine, not modified, then give the DISHES as initial state
export const Dishes = (
	state = {
		isLoading: true,
		errMess: null,
		dishes: []
	},
	action
) => {
	// switch on action type
	switch (action.type) {
		case ActionTypes.ADD_DISHES:
			return { ...state, isLoading: false, errMess: null, dishes: action.payload }; //action.payload: different action has its own payload,see ActionCreators.js

		case ActionTypes.DISHES_LOADING:
			//...state: take current value of state， operation is immutable, original state is not changed, create a new state and modify on new state, return the new state
			return { ...state, isLoading: true, errMess: null, dishes: [] };

		case ActionTypes.DISHES_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, dishes: [] };

		default:
			return state;
	}
};

//the dish information is displayed in 3 different components: the dish detail component, the  menu component and the home component.

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
