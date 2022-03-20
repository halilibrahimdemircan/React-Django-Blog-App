import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 375 }} className='card'>
            <div onClick={() => navigate(`/detail/${data.id}`)}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: grey[900] }} aria-label='recipe'>
                            {data.author[0].toUpperCase() || 'A'}
                        </Avatar>
                    }
                    title={data.title.length > 30 ? data.title.substring(0, 30) + '...' : data.title}
                    subheader={
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography variant='body2' color='text.secondary'>
                                {data.category}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {data.days_since_creation > 0 ? data.days_since_creation + ' days ago' : 'today'}
                            </Typography>
                        </div>
                    }
                />
                <CardMedia component='img' height='194' image={data.image} alt={data.title} />
                <CardContent>
                    <Typography variant='body2' color='text.secondary' className='line-clamp'>
                        {data.content}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant='body1' color='text.secondary' style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {data.author || 'Anonymous'}
                    </Typography>
                </CardContent>
            </div>

            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <BiLike />
                    &nbsp;
                    <p style={{ fontSize: '1rem' }}>{data.like_count}</p>
                </IconButton>
                <IconButton aria-label='view'>
                    <FaEye />
                    &nbsp;
                    <p style={{ fontSize: '1rem' }}>{data.view_count}</p>
                </IconButton>
                <IconButton aria-label='add to comment'>
                    <MdComment />
                    &nbsp;
                    <p style={{ fontSize: '1rem' }}>{data.comment_count}</p>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BlogCard;