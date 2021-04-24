import { createStore, combineReducers, applyMiddleware } from 'redux';
//import 4 simpler reducers:
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
//middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//This is the store
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes, //dishes manage by Dishes which is from redux folder, Dishes has 3 state: isLoading, errMess and dishes
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
