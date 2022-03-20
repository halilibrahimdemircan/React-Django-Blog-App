import { combineReducers } from 'redux';
import { addCommentReducer, blogDetailReducer, blogReducer, blogsReducer } from './blogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    blogs: blogsReducer,
    blogDetail: blogDetailReducer,
    comment: addCommentReducer,
    blog: blogReducer
});

export default rootReducer;