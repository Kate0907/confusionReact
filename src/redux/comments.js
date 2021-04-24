import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

//Comments is a reducer function, it takes current state and action as parameter, then return a new state according to action
//if state is undefine, not modified, then give the COMMENTS as initial state
export const Comments = (state = COMMENTS, action) => {
	// switch on action type
	switch (action.type) {
		case ActionTypes.ADD_COMMENT:
			var comment = action.payload;
			comment.id = state.length; //new comment's id = state.length
			comment.date = new Date().toISOString();
			return state.concat(comment);
		default:
			return state;
	}
};
