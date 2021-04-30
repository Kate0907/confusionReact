import * as ActionTypes from './ActionTypes';

export const Leaders = (
	state = {
		isLoading: true,
		errMess: null,
		leaders: []
	},
	action
) => {
	// switch on action type
	switch (action.type) {
		case ActionTypes.ADD_LEADERS:
			return { ...state, isLoading: false, errMess: null, leaders: action.payload };
		//action.payload: different action has its own payload,see ActionCreators.js

		case ActionTypes.LEADERS_LOADING:
			return { ...state, isLoading: true, errMess: null, leaders: [] };
		//...state: take current value of state， operation is immutable, original state is not changed, create a new state and modify on new state, return the new state

		case ActionTypes.LEADERS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, leaders: [] };

		default:
			return state;
	}
};
