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
			dishes: Dishes, //dishes manage by Dishes which is from redux folder, Dishes has 3 state: isLoading, errMess and dishes
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders,
			...createForms({
				feedback: InitialFeedback
			})
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
