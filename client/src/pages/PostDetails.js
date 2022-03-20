import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, List, Paper, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import Loader from '../components/Loader';
import { addCommentAPI, clearErrors, deleteBlogAPI, loadBlogDetails } from '../redux/actions/blogAction';
import { ADD_COMMENT_RESET } from '../redux/constants/blogConstants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: 5
        }
    },
    paper: {
        padding: 10
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
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
    const { blog, loading, error } = useSelector(state => state.blogDetail);
    const { commentLoading, message, success, commentError } = useSelector(state => state.comment);
    const { user, isAuthenticated } = useSelector(state => state.user);
    const { error: deleteError } = useSelector(state => state.blog);
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
        if (success) {
            dispatch({ type: ADD_COMMENT_RESET });
        }
        dispatch(loadBlogDetails(id));
    }, [dispatch, id, error, commentError, success, deleteError]);

    const addComment = async e => {
        e.preventDefault();

        dispatch(addCommentAPI({ ...comment, id: id, content: comment.content }));
        setComment({ ...comment, content: '' });
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Card sx={{ maxWidth: 750 }} style={{ display: 'flex', flexDirection: 'column', margin: '5rem auto 1rem auto' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: grey[900] }} aria-label='recipe'>
                                {blog?.author[0].toUpperCase() || 'A'}
                            </Avatar>
                        }
                        title={blog?.title}
                        subheader={
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography variant='body2' color='text.secondary'>
                                    {blog?.category}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {blog?.days_since_creation > 0 ? blog?.days_since_creation + ' days ago' : 'today'}
                                </Typography>
                            </div>
                        }
                    />
                    <CardMedia component='img' height='300' image={blog?.image} alt={blog?.title} />
                    <CardContent>
                        <Typography variant='body2' color='text.secondary'>
                            {blog?.content}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant='body1' color='text.secondary' style={{ textAlign: 'right', fontWeight: 'bold' }}>
                            {blog?.author || 'Anonymous'}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>
                            <IconButton aria-label='add to favorites'>
                                <BiLike />
                                &nbsp;
                                <p style={{ fontSize: '1rem' }}>{blog?.like_count}</p>
                            </IconButton>
                            <IconButton aria-label='view'>
                                <FaEye />
                                &nbsp;
                                <p style={{ fontSize: '1rem' }}>{blog?.view_count}</p>
                            </IconButton>
                            <IconButton aria-label='add to comment'>
                                <MdComment />
                                &nbsp;
                                <p style={{ fontSize: '1rem' }}>{blog?.comment_count}</p>
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
                            <TextField name='content' variant='outlined' label='Comment *' fullWidth value={comment.content} onChange={e => setComment({ ...comment, content: e.target.value })} />
                            <Button className={classes.buttonSubmit} sx={{ bgcolor: grey[800] }} variant='contained' size='medium' type='submit'>
                                SEND
                            </Button>
                        </form>
                    </Paper>
                    <Typography style={{ fontFamily: 'Permanent Marker', marginLeft: '30px' }} variant='h6' sx={{ color: '#046582', mt: 2 }}>
                        COMMENTS
                    </Typography>
                    {blog?.comments.length === 0 ? (
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography style={{ fontFamily: 'Permanent Marker', marginLeft: '30px' }} variant='body2' sx={{ color: '#046582', mt: 2 }}>
                                No comments yet...
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={12} md={12}>
                            {blog?.comments.map(comment => (
                                <List key={comment.id} sx={{ width: '100%', maxWidth: 1180, bgcolor: 'background.paper' }}>
                                    <Comments comment={comment} />
                                </List>
                            ))}
                        </Grid>
                    )}
                </Card>
            )}
        </>
    );
};

export default PostDetails;