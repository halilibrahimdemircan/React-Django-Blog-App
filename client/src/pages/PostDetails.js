import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, List, Paper, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import Loader from '../components/Loader';
import { addCommentAPI, clearErrors, deleteBlogAPI, getCommentAPI, getLikesAPI, likePostAPI, loadBlogDetails } from '../redux/actions/blogAction';
import { ADD_COMMENT_RESET, INCREASE_VIEWS_COUNT_RESET, LIKE_RESET } from '../redux/constants/blogConstants';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5
    }
  },
  paper: {
    padding: 10,
    backgroundColor: '#fff'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  inputField: {
    backgroundColor: '#c9c9c9'
  },
  buttonSubmit: {
    marginTop: 5,
    width: '5rem',
    height: '3.4rem',
    '&:hover': {
      background: '#aec8bf',
      color: '#126d88'
    }
  }
}));

const PostDetails = () => {
  const { id } = useParams();
  const [comment, setComment] = useState({
    post: '',
    content: ''
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { blog, loading, error, viewSuccess } = useSelector(state => state.blogDetail);
  const { commentLoading, message, success, commentError, comments } = useSelector(state => state.comment);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { error: deleteError } = useSelector(state => state.blog);
  const { isLiked, error: likeError, likes } = useSelector(state => state.like);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (commentError) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (likeError) {
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: ADD_COMMENT_RESET });
    }
    if (viewSuccess) {
      dispatch({ type: INCREASE_VIEWS_COUNT_RESET });
    }
    if (isLiked) {
      dispatch({ type: LIKE_RESET });
    }
    dispatch(loadBlogDetails(id));
    dispatch(getCommentAPI(id));
    dispatch(getLikesAPI(id));
  }, [dispatch, id, error, commentError, success, deleteError, viewSuccess, likeError, isLiked]);

  const addComment = async e => {
    e.preventDefault();

    dispatch(addCommentAPI({ ...comment, id: id, content: comment.content }));
    setComment({ ...comment, content: '' });
  };

  const likeBlog = () => {
    if (likes?.length === 0) {
      dispatch(likePostAPI(blog.id));
    } else if (!likes?.find(like => like.user === (user.id || user.pk))) {
      dispatch(likePostAPI(blog.id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card sx={{ maxWidth: 750 }} style={{ display: 'flex', flexDirection: 'column', margin: '6rem auto 1rem auto', backgroundColor: '#1c1f26', color: '#c9c9c9' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: grey[200], color: '#000' }} aria-label='recipe'>
                {blog?.author[0].toUpperCase() || 'A'}
              </Avatar>
            }
            title={blog?.author.toUpperCase() || 'Anonymous'}
            subheader={
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#c9c9c9' }}>
                <Typography variant='body2'>{blog?.category}</Typography>
                <Typography variant='body2'>{blog?.days_since_creation > 0 ? blog?.days_since_creation + ' days ago' : 'today'}</Typography>
              </div>
            }
          />
          <CardMedia component='img' height='300' image={blog?.image} alt={blog?.title} />
          <CardContent>
            <Typography variant='body1' style={{ fontFamily: 'Permanent Marker', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
              {blog?.title}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant='body2'>{blog?.content}</Typography>
          </CardContent>
          <CardActions disableSpacing style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1c1f26', color: '#c9c9c9' }}>
            <div>
              <IconButton aria-label='add to favorites' onClick={likeBlog}>
                {!blog?.likes.find(like => like.user === (user?.id || user?.pk)) ? <BiLike color='#c9c9c9' /> : <AiFillLike color='red' />}
                &nbsp;
                <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{blog?.like_count}</p>
              </IconButton>
              <IconButton aria-label='view'>
                <FaEye color='#c9c9c9' />
                &nbsp;
                <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{blog?.view_count}</p>
              </IconButton>
              <IconButton aria-label='add to comment'>
                <MdComment color='#c9c9c9' />
                &nbsp;
                <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{blog?.comment_count}</p>
              </IconButton>
            </div>
            {(user?.pk || user?.id) === blog?.user && (
              <div>
                <IconButton style={{ fontSize: '0.8em' }} size='large' color='info' onClick={() => navigate(`/update/${blog.id}`)} aria-label='share'>
                  <AiFillEdit fontSize='large' />
                  &nbsp; EDIT &nbsp;
                </IconButton>
                <IconButton style={{ fontSize: '0.8em' }} size='large' color='error' onClick={() => dispatch(deleteBlogAPI(blog.id, navigate))} aria-label='share'>
                  <AiFillDelete fontSize='large' />
                  &nbsp; DELETE &nbsp;
                </IconButton>
              </div>
            )}
          </CardActions>
          <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={addComment}>
              <TextField className={classes.inputField} name='content' variant='outlined' label='Comment *' fullWidth value={comment.content} onChange={e => setComment({ ...comment, content: e.target.value })} />
              <Button className={classes.buttonSubmit} sx={{ bgcolor: grey[800] }} variant='contained' size='medium' type='submit'>
                SEND
              </Button>
            </form>
          </Paper>
          <Typography style={{ fontFamily: 'Permanent Marker', marginLeft: '30px', textDecoration: 'underline' }} variant='h6' sx={{ color: '#c9c9c9', m: 2 }}>
            COMMENTS
          </Typography>
          {comments?.length === 0 ? (
            <Grid item xs={12} sm={12} md={12}>
              <Typography style={{ fontFamily: 'Permanent Marker', marginLeft: '30px' }} variant='body2' sx={{ color: '#c9c9c9', m: 2 }}>
                No comments yet...
              </Typography>
            </Grid>
          ) : (
            <>
              {commentLoading ? (
                <CircularProgress style={{ display: 'flex', margin: '0 auto 2rem auto' }} color='inherit' />
              ) : (
                <Grid item xs={12} sm={12} md={12} container direction='columnn' justifyContent='center'>
                  {comments?.map(comment => (
                    <List key={comment.id} sx={{ width: '95%', maxWidth: 1180, bgcolor: '#1c1f26' }}>
                      <Comments comment={comment} />
                    </List>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default PostDetails;
