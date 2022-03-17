import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';
import HomePage from '../pages/HomePage.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import PostDetails from '../pages/PostDetails.js';
import UpdateBlog from '../pages/UpdateBlog.js';
import NewBlog from '../pages/NewBlog.js';


const AppRouter = () => {
    return (
        <Router>
            <NavbarComp />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/detail/:id' element={<PostDetails />} />
                <Route path='/update/:id' element={<UpdateBlog />} />
                <Route path='/new' element={<NewBlog />} />



            </Routes>
        </Router>
    )
}

export default AppRouter