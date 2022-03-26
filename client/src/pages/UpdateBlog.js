import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import Loader from '../components/Loader';
import { loadBlogDetails } from '../redux/actions/blogAction';

const UpdateBlog = () => {
  const { id } = useParams();
  const { blog, loading } = useSelector(state => state.blogDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogDetails(id));
  }, [dispatch, id]);

  return (
    <div style={{ marginTop: '5rem' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container justifyContent='center'>
            <img src='/images/blog.jpg' alt='new blog' width={500} height={300} />
          </Grid>
          <Typography style={{ fontFamily: 'Qwitcher Grypen' }} variant='h4' align='center' sx={{ my: 2, color: '#c9c9c9' }}>
            <span>
              <span style={{ fontSize: '3rem' }}>U</span>
              PDATE
              <span style={{ fontSize: '3rem' }}> B</span>
              LOG
            </span>
          </Typography>
          <Grid container justifyContent='center' alignItems='flex-start'>
            <Grid item xs={12} sm={8} md={4}>
              <BlogForm blog={blog} />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default UpdateBlog;
