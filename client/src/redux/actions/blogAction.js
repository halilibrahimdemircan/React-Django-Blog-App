import axios from 'axios';
import { errorNote, successNote } from '../../helpers/toastNotify';
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_BLOG_DETAILS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_LIKES_FAIL, GET_LIKES_SUCCESS, GET_MORE_BLOGS_FAIL, GET_MORE_BLOGS_REQUEST, GET_MORE_BLOGS_SUCCESS, INCREASE_VIEWS_COUNT_FAIL, INCREASE_VIEWS_COUNT_SUCCESS, LIKE_FAIL, LIKE_SUCCESS, NEW_BLOG_FAIL, NEW_BLOG_REQUEST, NEW_BLOG_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from '../constants/blogConstants';

//! LOAD BLOGS
export const loadBlogs = () => async dispatch => {
  try {
    dispatch({ type: GET_BLOGS_REQUEST });

    const data = await axios(`${process.env.REACT_APP_BACKEND_URL}blog/`, { withCredentials: true });
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

    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}blog/${id}/`, {
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
        `${process.env.REACT_APP_BACKEND_URL}blog/${id}/comment/`,
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

//! GET COMMENT
export const getCommentAPI = id => async dispatch => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await axios(`${process.env.REACT_APP_BACKEND_URL}blog/${id}/comment/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    // console.log(data);

    dispatch({ type: GET_COMMENT_SUCCESS, payload: data.data });
  } catch (error) {
    errorNote(error.response.data.message);
    dispatch({ type: GET_COMMENT_FAIL, payload: error.response });
  }
};

//! DELETE POST
export const deleteBlogAPI = (id, navigate) => async dispatch => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}blog/${id}/`, {
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

//! Increase View Count
export const increseViewCountAPI = id => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}blog/${id}/view/`,
      { post: id },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch({ type: INCREASE_VIEWS_COUNT_SUCCESS, payload: true });
  } catch (error) {
    dispatch({ type: INCREASE_VIEWS_COUNT_FAIL, payload: error.response });
  }
};

//! Like post
export const likePostAPI = id => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}blog/${id}/like/`,
      { post: id },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch({ type: LIKE_SUCCESS, payload: true });
  } catch (error) {
    dispatch({ type: LIKE_FAIL, payload: error.response });
  }
};

//! Get Likes
export const getLikesAPI = id => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await axios(`${process.env.REACT_APP_BACKEND_URL}blog/${id}/like/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    dispatch({ type: GET_LIKES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_LIKES_FAIL, payload: error.response });
  }
};

//! createBlog
export const createBlog = (blogData, navigate) => async dispatch => {
  try {
    dispatch({ type: NEW_BLOG_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(blogData);

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}blog/`,
      {
        title: blogData.title,
        content: blogData.content,
        image: blogData.image,
        category: blogData.category
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    // console.log(data);

    dispatch({ type: NEW_BLOG_SUCCESS, payload: data.message });
    successNote(data.message);
    navigate('/');
  } catch (error) {
    errorNote(error.response.data.message);
    dispatch({ type: NEW_BLOG_FAIL, payload: error.response.data.message });
  }
};

//! UPDATE BLOG
export const updateBlog = (blogData, navigate) => async dispatch => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));

    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}blog/${blogData.id}/`, blogData, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    // console.log(data);

    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data.message });
    successNote(data.message);
    navigate(`/detail/${blogData.id}`);
  } catch (error) {
    errorNote(error.response.data.message);
    dispatch({ type: UPDATE_BLOG_FAIL, payload: error.response.data.message });
  }
};

//! Clearing Errors
export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
