import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import { clearErrors, loadBlogs } from '../redux/actions/blogAction';

const results = [
    {
        id: 1,
        author: 'Hüseyin Arslan',
        title: 'Football',
        content: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania); gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football.[1] These various forms of football share to varying extent common origins and are known as football codes.',
        image: 'https://media.istockphoto.com/photos/close-up-of-legs-and-feet-of-football-player-in-blue-socks-and-shoes-picture-id1150952747?k=20&m=1150952747&s=612x612&w=0&h=vreccM0RO2rNp4aLN-mLyBwTfN7sfwvkdkwegzYPrXo=',
        updatedDate: '2022-03-16T13:52:18.063378Z',
        days_since_creation: 2,
        category: 'Sports',
        like_count: 1,
        view_count: 0,
        comment_count: 2,
        comments: [
            {
                id: 1,
                post: 1,
                user: 1,
                content: 'good post',
                createdDate: '2022-03-16T13:59:48.320620Z',
                days_since_creation: 2
            },
            {
                id: 2,
                post: 1,
                user: 2,
                content: 'thanks',
                createdDate: '2022-03-16T14:00:00.937101Z',
                days_since_creation: 2
            }
        ]
    },
    {
        id: 2,
        author: 'Halil Denircan',
        title: 'Django',
        content: "Django's primary goal is to ease the creation of complex, database-driven websites. The framework emphasizes reusability and pluggability of components, less code, low coupling, rapid development, and the principle of don't repeat yourself.[9] Python is used throughout, even for settings, files, and data models. Django also provides an optional administrative create, read, update and delete interface that is generated dynamically through introspection and configured via admin models.",
        image: 'https://miro.medium.com/max/1400/1*eXueYfyPmD2H3t_6nB9_0Q.png',
        updatedDate: '2022-03-16T13:53:55.554374Z',
        days_since_creation: 2,
        category: 'Technology',
        like_count: 0,
        view_count: 0,
        comment_count: 1,
        comments: [
            {
                id: 3,
                post: 2,
                user: 1,
                content: 'football is excellent sport',
                createdDate: '2022-03-16T14:01:11.291702Z',
                days_since_creation: 2
            }
        ]
    },
    {
        id: 3,
        author: 'Hüseyin Arslan',
        title: 'Django Django Django Django Django Django',
        content: "Django's primary goal is to ease the creation of complex, database-driven websites. The framework emphasizes reusability and pluggability of components, less code, low coupling, rapid development, and the principle of don't repeat yourself.[9] Python is used throughout, even for settings, files, and data models. Django also provides an optional administrative create, read, update and delete interface that is generated dynamically through introspection and configured via admin models.",
        image: 'https://miro.medium.com/max/1400/1*eXueYfyPmD2H3t_6nB9_0Q.png',
        updatedDate: '2022-03-16T13:53:55.554374Z',
        days_since_creation: 2,
        category: 'Technology',
        like_count: 0,
        view_count: 0,
        comment_count: 1,
        comments: [
            {
                id: 3,
                post: 2,
                user: 1,
                content: 'football is excellent sport',
                createdDate: '2022-03-16T14:01:11.291702Z',
                days_since_creation: 2
            }
        ]
    }
];

const HomePage = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector(state => state.blogs);
    console.log(blogs);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
        dispatch(loadBlogs());
    }, [dispatch, error]);

    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5rem' }} alignItems='stretch' spacing={3}>
            {results?.map(data => (
                <Grid key={data.id} item xs={12} md={4} sm={6} justifyContent='center'>
                    <BlogCard data={data} />
                </Grid>
            ))}
        </Grid>
    );
};

export default HomePage;