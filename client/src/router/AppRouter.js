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
  // console.log(isAuthenticated);

  function RequireAuth({ children, redirectTo }) {
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} />;
    }
    return children;
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
            <RequireAuth redirectTo='/login'>
              <PostDetails />
            </RequireAuth>
          }
        />
        <Route
          path='/update/:id'
          element={
            <RequireAuth redirectTo='/login'>
              <UpdateBlog />
            </RequireAuth>
          }
        />
        <Route
          path='/new'
          element={
            <RequireAuth redirectTo='/login'>
              <NewBlog />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
