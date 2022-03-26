import { Button, CircularProgress, Container, Grid, Grow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { clearDetail, clearErrors, loadAnotherPageBlogs, loadBlogs } from '../redux/actions/blogAction';
import { NEW_BLOG_RESET } from '../redux/constants/blogConstants';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, count, next, loading, error, moreLoading } = useSelector(state => state.blogs);
  const { success } = useSelector(state => state.newBlog);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: NEW_BLOG_RESET });
    }
    dispatch(clearDetail());
    dispatch(loadBlogs());
  }, [dispatch, error, success]);

  const loadMoreData = () => {
    if (next !== null) {
      dispatch(loadAnotherPageBlogs(next));
    }
  };

  return (
    <Grow in>
      <Container>
        <Grid container justify='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {loading ? (
              <Loader />
            ) : (
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: '5rem' }} spacing={2}>
                {blogs?.map(data => (
                  <Grid key={data.id} item xs={12} md={4} sm={6} justifyContent='center'>
                    <BlogCard data={data} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          {moreLoading ? (
            <CircularProgress style={{ display: 'flex', margin: '0 auto 2rem auto' }} color='inherit' />
          ) : (
            <Button disabled={next === null} onClick={loadMoreData} style={{ display: 'flex', margin: '2rem auto 2rem auto' }} variant='contained' color='secondary'>
              Load More Post
            </Button>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
