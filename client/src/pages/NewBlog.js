import { Grid, Typography } from '@mui/material';
import React from 'react';
import BlogForm from '../components/BlogForm';

const NewBlog = () => {
  return (
    <div style={{ marginTop: '5rem' }}>
      <Grid container justifyContent='center'>
        <img src='/images/blog.jpg' alt='new blog' width={500} height={300} />
      </Grid>

      <Typography style={{ fontFamily: 'Qwitcher Grypen' }} variant='h4' align='center' sx={{ my: 2, color: '#c9c9c9' }}>
        <span>
          <span style={{ fontSize: '3rem' }}>N</span>
          EW
          <span style={{ fontSize: '3rem' }}> B</span>
          LOG
        </span>
      </Typography>
      <Grid container justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12} sm={8} md={4}>
          <BlogForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewBlog;
