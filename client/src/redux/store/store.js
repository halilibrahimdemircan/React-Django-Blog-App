import { Avatar, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../redux/actions/userAction';

//! Yup --> validation olarak kullanılıyor
//! Bu şemayı Formik içerisine validationShema olarak atıyoruz.
const signUpValidationSchema = Yup.object().shape({
    //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
    email: Yup.string().email('Invalid Email'),
    username: Yup.string().min(2, 'Username must be at least 2 characters'),
    password: Yup.string()
        .required('No password provided')
        .min(8, 'Password is too short - should be 8 chars minimum')
        .matches(/\d+/, 'Password must have a number')
        .matches(/[a-z]+/, 'Password must have a lowercase')
        .matches(/[A-Z]+/, 'Password must have a uppercase')
        .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char')
});

function Login() {
    const initialValues = {
        email: '',
        username: '',
        password: ''
    };
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        // console.log(values);
        dispatch(login(values));
        resetForm();
        navigate('/');
    };

    return (
        <div className='auth'>
            <Container
                sx={{
                    marginTop: '5rem',
                    height: 'calc(80vh - 1rem)',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '3rem',
                    borderRadius: '20px'
                }}
                maxWidth='sm'
            >
                <Avatar
                    sx={{
                        margin: 'auto',
                        bgcolor: 'primary.main'
                        // bgcolor: blue[500],
                    }}
                >
                    <MdLockOutline />
                </Avatar>
                <Typography sx={{ margin: '1rem' }} variant='h4'>
                    LOGIN
                </Typography>
                {/* //! Bütün formu sarmallıyoruz. Kendi local state i var. ilave olarak state tanımlamıyoruz. Sadece yukarıda const ile initialValues tanımlıyoruz. initial değerleri formik tagi içerisine tanımlıyoruz. */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
                    validationSchema={signUpValidationSchema}
                >
                    {/* //!Bütün formu curly braces içerisine alıyoruz. Ve arrow function kullanarak bütün değişkenleri burada tanımlıyoruz. Ayrıca değerleri destructuring yapmak önemli  */}
                    {({
                        //!Parametre olarak tanımladığımız (values) değişkenleri TextField içerisinde value değişkenlerine atıyoruz.
                        values,
                        handleChange,
                        //! handleSubmit önce burada, daha sonra Formik içerisinde tanımlıyoruz. Müteakiben fonksiyonu yukarıda oluşturuyoruz.
                        handleSubmit,
                        //! touched and errors and handleBlur--> validation hatasını almak için eklememiz gerekiyor.
                        touched,
                        errors,
                        //! handleBlur --> focustan yani inputtan çıktığımızda blur oluyor.
                        handleBlur
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField name='email' label='Email' variant='outlined' value={values.email} onChange={handleChange} onBlur={handleBlur} helperText={touched.email && errors.email} error={touched.email && Boolean(errors.email)} fullWidth />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField name='username' label='Username' variant='outlined' value={values.username} onChange={handleChange} onBlur={handleBlur} helperText={touched.username && errors.username} error={touched.username && Boolean(errors.username)} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='password' label='Password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} helperText={touched.password && errors.password} error={touched.password && Boolean(errors.password)} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <CircularProgress color='secondary' />
                                    ) : (
                                        <>
                                            <Button type='submit' variant='contained' color='primary' fullWidth style={{ marginBottom: '1rem' }}>
                                                LOGIN
                                            </Button>
                                        </>
                                    )}
                                </Grid>
                                <Grid container justifyContent='flex-end'>
                                    <p>
                                        Don't have an account yet?
                                        <Link
                                            sx={{
                                                textDecoration: 'none',
                                                fontWeight: '600',
                                                paddingLeft: '0.5rem',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => navigate('/register')}
                                        >
                                            Register
                                        </Link>
                                    </p>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}

export default Login;