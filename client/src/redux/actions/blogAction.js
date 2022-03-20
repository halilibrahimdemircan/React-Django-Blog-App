import axios from 'axios';
import { errorNote, successNote } from '../../helpers/toastNotify';
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_BLOG_DETAILS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_MORE_BLOGS_FAIL, GET_MORE_BLOGS_REQUEST, GET_MORE_BLOGS_SUCCESS } from '../constants/blogConstants';

//! LOAD BLOGS
export const loadBlogs = () => async dispatch => {
    try {
        dispatch({ type: GET_BLOGS_REQUEST });

        const data = await axios(`https://hsynarslan.pythonanywhere.com/blog/`, { withCredentials: true });
        // console.log(data.data);

        dispatch({ type: GET_BLOGS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: GET_BLOGS_FAIL, payload: error.response });
    }
};

//! LOAD MORE BLOGS
export const loadAnotherPageBlogs = url => async dispatch => {
    try {
        dispatch({ type: GET_MORE_BLOGS_REQUEST });

        const data = await axios(`${url}`, { withCredentials: true });
        // console.log(data.data);

        dispatch({ type: GET_MORE_BLOGS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: GET_MORE_BLOGS_FAIL, payload: error.response });
    }
};

//! LOAD BLOG DETAILS
export const loadBlogDetails = id => async dispatch => {
    try {
        dispatch({ type: BLOG_DETAILS_REQUEST });
        const token = JSON.parse(localStorage.getItem('token'));

        const data = await fetch(`https://hsynarslan.pythonanywhere.com/blog/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(res => res.json());
        // console.log(data);

        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: BLOG_DETAILS_FAIL, payload: error.response });
    }
};

//! Clearing Blog Details
export const clearDetail = () => async dispatch => {
    dispatch({ type: CLEAR_BLOG_DETAILS });
};

//! ADD COMMENT
export const addCommentAPI =
    ({ id, content }) =>
        async dispatch => {
            try {
                dispatch({ type: ADD_COMMENT_REQUEST });
                const token = JSON.parse(localStorage.getItem('token'));

                const data = await axios.post(
                    `https://hsynarslan.pythonanywhere.com/blog/${id}/comment/`,
                    { post: id, content: content },
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                );
                // console.log(data);

                dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.data.message });
                successNote(data.data.message);
            } catch (error) {
                errorNote(error.response.data.message);
                dispatch({ type: ADD_COMMENT_FAIL, payload: error.response });
            }
        };

//! DELETE POST
export const deleteBlogAPI = (id, navigate) => async dispatch => {
    try {
        dispatch({ type: DELETE_BLOG_REQUEST });
        const token = JSON.parse(localStorage.getItem('token'));

        const data = await axios.delete(`https://hsynarslan.pythonanywhere.com/blog/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        // console.log(data);

        dispatch({ type: DELETE_BLOG_SUCCESS, payload: data.data.message });
        successNote(data.data.message);
        navigate('/');
    } catch (error) {
        errorNote(error.response.data.message);
        dispatch({ type: DELETE_BLOG_FAIL, payload: error.response });
    }
};

//! Clearing Errors
export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS });
};
