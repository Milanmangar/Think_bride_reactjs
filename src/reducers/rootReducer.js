import { combineReducers } from 'redux';
import itemListReducer from './itemListReducer';

const rootReducer = combineReducers({
  itemListReducer: itemListReducer
})

export default rootReducer;
