import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, increseViewCountAPI, likePostAPI } from '../redux/actions/blogAction';
import { LIKE_RESET } from '../redux/constants/blogConstants';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: grey[900],
    border: '1px solid #474c58',
    borderRadius: 50,
    '&:hover': {
      boxShadow: '4px 3px 11px 6px #c9c9c9',
      transform: 'translateY(-3px)'
    }
  }
}));

const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { isLiked, error: likeError } = useSelector(state => state.like);
  const [datas, setDatas] = useState(data);

  useEffect(() => {
    if (likeError) {
      dispatch(clearErrors());
    }
    if (isLiked) {
      dispatch({ type: LIKE_RESET });
    }
  }, [dispatch, likeError, isLiked]);

  const goDetailPageAndIncreasaeViewCount = () => {
    navigate(`/detail/${data.id}`);
    if (isAuthenticated) {
      dispatch(increseViewCountAPI(data.id));
    }
  };

  const likeBlog = () => {
    if (datas?.likes.length === 0) {
      dispatch(likePostAPI(data.id));
      setDatas({ ...datas, like_count: datas.like_count + 1, likes: [...datas.likes, { user: user.id || user.pk, post: data.id }] });
    } else if (!datas?.likes.find(like => like.user === (user.id || user.pk))) {
      dispatch(likePostAPI(data.id));
      setDatas({ ...datas, like_count: datas.like_count + 1, likes: [...datas.likes, { user: user.id || user.pk, post: data.id }] });
    }
  };

  return (
    <Card sx={{ maxWidth: 375 }} className={`${classes.card}`}>
      <div onClick={goDetailPageAndIncreasaeViewCount} style={{ color: '#c9c9c9' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: grey[200], color: '#000' }} aria-label='author'>
              {datas.author[0].toUpperCase() || 'A'}
            </Avatar>
          }
          title={datas.author.toUpperCase() || 'Anonymous'}
          subheader={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#c9c9c9' }}>
              <Typography variant='body2'>{datas.category}</Typography>
              <Typography variant='body2'>{datas.days_since_creation > 0 ? datas.days_since_creation + ' days ago' : 'today'}</Typography>
            </div>
          }
          style={{ borderBottom: '1px solid #c9c9c9', padding: '1.5rem' }}
        />
        <CardContent>
          <Typography variant='body1' style={{ fontFamily: 'Permanent Marker', fontWeight: 'bold', marginBottom: '0.6rem' }}>
            {datas.title.length > 40 ? datas.title.substring(0, 40) + '...' : datas.title}
          </Typography>
          <Typography variant='body2' className='line-clamp'>
            {datas.content}
          </Typography>
        </CardContent>
        <CardMedia component='img' height='150' image={datas.image} alt={datas.title} />
      </div>

      <CardActions disableSpacing style={{ backgroundColor: '#1c1f26', color: '#c9c9c9', display: 'flex', justifyContent: 'space-evenly', padding: '0px 4rem' }}>
        <IconButton aria-label='add to favorites' onClick={likeBlog}>
          {!datas?.likes.find(like => like.user === (user?.id || user?.pk)) ? <BiLike color='#c9c9c9' /> : <AiFillLike color='red' />}
          &nbsp;
          <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{datas.like_count}</p>
        </IconButton>
        <IconButton aria-label='view'>
          <FaEye color='#c9c9c9' />
          &nbsp;
          <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{datas.view_count}</p>
        </IconButton>
        <IconButton aria-label='add to comment'>
          <MdComment color='#c9c9c9' />
          &nbsp;
          <p style={{ fontSize: '1rem', color: '#c9c9c9' }}>{datas.comment_count}</p>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
