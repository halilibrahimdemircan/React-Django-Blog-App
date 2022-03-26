import { combineReducers } from 'redux';
import { addCommentReducer, blogDetailReducer, blogReducer, blogsReducer, likePostReducer, newBlogReducer } from './blogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer,
  blogDetail: blogDetailReducer,
  comment: addCommentReducer,
  blog: blogReducer,
  like: likePostReducer,
  newBlog: newBlogReducer
});

export default rootReducer;
