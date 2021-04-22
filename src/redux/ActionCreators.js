//import everything
import * as ActionTypes from './ActionTypes';

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
