import { COMMENTS } from '../shared/comments';
//reducer function, takes state and action as parameter
//if state is undefine, not modified, then give the COMMENTS as initial state
export const Comments = (state = COMMENTS, action) => {
	// switch on action type
	switch (action.type) {
		default:
			return state;
	}
};
