import axios from 'axios';
import { CLEAR_ERRORS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS } from '../constants/blogConstants';

//! LOAD BLOGS
export const loadBlogs = () => async dispatch => {
    try {
        dispatch({ type: GET_BLOGS_REQUEST });

        const data = await axios(`https://hsynarslan.pythonanywhere.com/blog/`, { withCredentials: true });
        console.log(data.data);

        dispatch({ type: GET_BLOGS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: GET_BLOGS_FAIL, payload: error.response });
    }
};

//! Clearing Errors
export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS });
};