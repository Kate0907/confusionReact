import { createStore, combineReducers } from 'redux';
//import 4 simpler reducers:
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes, //dishes manage by Dishes
			comments: Comments,
			promotions: Promotions,
			leaders: Leaders
		})
	);

	return store;
};
