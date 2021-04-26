import * as ActionTypes from './ActionTypes';

//Comments is a Reducer function, it takes current state and action as parameter, then return a new state according to action
//if state is undefine, not modified, then give the COMMENTS as initial state
export const Comments = (
	state = {
		errMess: null,
		comments: []
	},
	action
) => {
	// switch on action type
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, isLoading: false, errMess: null, comments: action.payload };
		case ActionTypes.COMMENTS_FAILED:
			return { ...state, isLoading: false, errMess: action.payload, comments: [] };
		case ActionTypes.ADD_COMMENT:
			var comment = action.payload;
			return { ...state, comments: state.comments.concat(comment) };
		default:
			return state;
	}
};
