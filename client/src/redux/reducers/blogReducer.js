import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_RESET, ADD_COMMENT_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_BLOG_DETAILS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_LIKES_FAIL, GET_LIKES_SUCCESS, GET_MORE_BLOGS_FAIL, GET_MORE_BLOGS_REQUEST, GET_MORE_BLOGS_SUCCESS, INCREASE_VIEWS_COUNT_FAIL, INCREASE_VIEWS_COUNT_RESET, INCREASE_VIEWS_COUNT_SUCCESS, LIKE_FAIL, LIKE_RESET, LIKE_SUCCESS, NEW_BLOG_FAIL, NEW_BLOG_REQUEST, NEW_BLOG_RESET, NEW_BLOG_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_RESET, UPDATE_BLOG_SUCCESS } from '../constants/blogConstants';

const initialState = {
  blogs: [],
  blog: {}
};

export const blogsReducer = (state = initialState.blogs, { type, payload }) => {
  switch (type) {
    case GET_BLOGS_REQUEST:
      return {
        loading: true
      };
    case GET_MORE_BLOGS_REQUEST:
      return {
        ...state,
        moreLoading: true
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        count: payload.count,
        next: payload.next,
        blogs: payload.results
      };
    case GET_MORE_BLOGS_SUCCESS:
      return {
        ...state,
        moreLoading: false,
        next: payload.next,
        blogs: [...state.blogs, ...payload.results]
      };
    case GET_BLOGS_FAIL:
    case GET_MORE_BLOGS_FAIL:
      return {
        loading: false,
        moreLoading: false,
        blogs: null,
        error: payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const blogDetailReducer = (state = initialState.blog, { type, payload }) => {
  switch (type) {
    case BLOG_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case BLOG_DETAILS_SUCCESS:
      return {
        loading: false,
        blog: payload
      };
    case INCREASE_VIEWS_COUNT_SUCCESS:
      return {
        ...state,
        viewSuccess: payload
      };
    case BLOG_DETAILS_FAIL:
    case INCREASE_VIEWS_COUNT_FAIL:
      return {
        loading: false,
        error: payload
      };
    case CLEAR_BLOG_DETAILS:
      return {
        state: null
      };
    case INCREASE_VIEWS_COUNT_RESET:
      return {
        ...state,
        viewSsuccess: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const addCommentReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        commentLoading: true
      };
    case GET_COMMENT_REQUEST:
      return {
        ...state
      };
    case ADD_COMMENT_SUCCESS:
      return {
        commentLoading: false,
        message: payload,
        success: true
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: payload
      };
    case ADD_COMMENT_FAIL:
    case GET_COMMENT_FAIL:
      return {
        ...state,
        commentLoading: false,
        commentError: payload
      };
    case ADD_COMMENT_RESET:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export const blogReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_BLOG_REQUEST:
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        success: true
      };
    case DELETE_BLOG_FAIL:
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case UPDATE_BLOG_RESET:
      return {
        ...state,
        success: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        isLiked: payload
      };
    case GET_LIKES_SUCCESS:
      return {
        likes: payload
      };
    case LIKE_FAIL:
    case GET_LIKES_FAIL:
      return {
        ...state,
        error: payload
      };
    case LIKE_RESET:
      return {
        ...state,
        isLiked: false
      };
    default:
      return state;
  }
};

export const newBlogReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case NEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NEW_BLOG_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload
      };
    case NEW_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case NEW_BLOG_RESET:
      return {
        ...state,
        success: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
