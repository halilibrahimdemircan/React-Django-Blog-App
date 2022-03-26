import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NewBlog from '../pages/NewBlog';
import PostDetails from '../pages/PostDetails';
import Register from '../pages/Register';
import UpdateBlog from '../pages/UpdateBlog';

const AppRouter = () => {
  const { isAuthenticated } = useSelector(state => state.user);

  function PrivateRoute({ children }) {
    return isAuthenticated ? children : <Navigate to='/login' />;
  }

  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/detail/:id'
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          }
        />
        <Route
          path='/update/:id'
          element={
            <PrivateRoute>
              <UpdateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path='/new'
          element={
            <PrivateRoute>
              <NewBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
