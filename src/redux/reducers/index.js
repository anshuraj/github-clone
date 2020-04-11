import user from './user';
import repos from './repos';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ user, repos });

export default rootReducer;
