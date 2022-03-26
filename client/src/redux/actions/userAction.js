import axios from 'axios';
import { errorNote, successNote } from '../../helpers/toastNotify';
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../constants/userConstants';

//! LOGIN
export const login = (values, navigate) => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}users/auth/login/`,
      values,
      { withCredentials: true },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    // console.log(data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('token', JSON.stringify(data.key));
    successNote('Login Successful');
    navigate('/');
  } catch (error) {
    errorNote(error.response.data.non_field_errors[0]);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.non_field_errors[0] });
  }
};

//! REGISTER
export const register = (userData, navigate) => async dispatch => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}users/auth/register/`,
      userData,
      { withCredentials: true },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    // console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    localStorage.setItem('token', JSON.stringify(data.token));
    successNote('Register Successful');
    navigate('/');
  } catch (error) {
    errorNote(error.response.data.non_field_errors[0]);
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.non_field_errors[0] });
  }
};

//! LOAD USER
export const loadUser = token => async dispatch => {
  dispatch({ type: LOAD_USER_REQUEST });

  const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/auth/user/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  }).then(res => res.json());
  // console.log(data);

  if (token) {
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } else {
    dispatch({ type: LOAD_USER_FAIL, payload: data.detail });
  }
};

//! LOGOUT
export const logout = () => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/auth/logout/`, { withCredentials: true });
    // console.log(data);

    dispatch({ type: LOGOUT_SUCCESS, payload: data.detail });
    localStorage.removeItem('token');
    successNote(data.detail);
  } catch (error) {
    errorNote(error.response.data.non_field_errors[0]);
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.non_field_errors[0] });
  }
};

//! Clearing Errors
export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
