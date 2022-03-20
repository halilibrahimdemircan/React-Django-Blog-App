import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_RESET, ADD_COMMENT_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_BLOG_DETAILS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_MORE_BLOGS_FAIL, GET_MORE_BLOGS_REQUEST, GET_MORE_BLOGS_SUCCESS } from '../constants/blogConstants';

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
        case BLOG_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            };
        case CLEAR_BLOG_DETAILS:
            return {
                state: null
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
        case ADD_COMMENT_SUCCESS:
            return {
                commentLoading: false,
                message: payload,
                success: true
            };
        case ADD_COMMENT_FAIL:
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
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
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