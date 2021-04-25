import * as ActionTypes from './ActionTypes';

export const Promotions = (
	state = {
		isLoading: true,
		errMess: null,
		promotions: []
	},
	action
) => {
	// switch on action type
	switch (action.type) {
		case ActionTypes.ADD_PROMOS:
			return { ...state, isLoading: false, errMess: null, promotions: action.payload };
		//action.payload: different action has its own payload,see ActionCreators.js

		case ActionTypes.PROMOS_LOADING:
			return { ...state, isLoading: true, errMess: null, promotions: [] };
		//...state: take current value of state， operation is immutable, original state is not changed, create a new state and modify on new state, return the new state

		case ActionTypes.PROMOS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, promotions: [] };
		default:
			return state;
	}
};
