import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
//import 4 simpler reducers:
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
//middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

//This is the store
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes, //dishes manage by Dishes which is from redux folder 'dishes.js', Dishes has 3 state: isLoading, errMess and dishes.//to get the dishes[], need to go to dishes.dishes
			comments: Comments, //to get the comments[], need to go to comments.comments
			promotions: Promotions, //to get the promotions[], need to go to promotions.promotions
			leaders: Leaders, //to get the leaders[], need to go to leaders.leaders
			...createForms({
				feedback: InitialFeedback
			})
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
