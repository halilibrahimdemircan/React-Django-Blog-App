import { combineReducers } from 'redux';
import userReducer from './userReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
    user: userReducer,
    blogs: blogReducer
});

export default rootReducer;