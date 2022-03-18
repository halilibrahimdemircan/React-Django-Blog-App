import axios from 'axios';
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../constants/userConstants';

//! LOGIN
export const login = (values, navigate) => async dispatch => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(
            `https://hsynarslan.pythonanywhere.com/users/auth/login/`,
            values,

            { withCredentials: true },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(data);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        localStorage.setItem('token', JSON.stringify(data.key));
        navigate('/');
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.non_field_errors[0] });
    }
};

//! REGISTER
export const register = (userData, navigate) => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const { data } = await axios.post(
            `https://hsynarslan.pythonanywhere.com/users/auth/register/`,
            userData,
            { withCredentials: true },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(data);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.non_field_errors[0] });
    }
};

//! LOAD USER
export const loadUser = () => async dispatch => {
    dispatch({ type: LOAD_USER_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));

    const data = await fetch(`https://hsynarslan.pythonanywhere.com/users/auth/user/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    }).then(res => res.json());
    console.log(data);
    if (token) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } else {
        dispatch({ type: LOAD_USER_FAIL, payload: data.detail });
    }
};

//! LOGOUT
export const logout = () => async dispatch => {
    try {
        const { data } = await axios.post(`https://hsynarslan.pythonanywhere.com/users/auth/logout/`, { withCredentials: true });
        console.log(data);

        dispatch({ type: LOGOUT_SUCCESS, payload: data.detail });
        localStorage.removeItem('token');
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.non_field_errors[0] });
    }
};

//! Clearing Errors
export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS });
};