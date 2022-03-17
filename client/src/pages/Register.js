import { Avatar, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { register } from '../redux/actions/userAction';

//! Yup --> validation olarak kullanılıyor
//! Bu şemayı Formik içerisine validationShema olarak atıyoruz.
const signUpValidationSchema = Yup.object().shape({
    username: Yup.string().required('Display name is required').min(2, 'Too short').max(15, 'Must be 15 char or less'),
    first_name: Yup.string().required('First name is required').min(2, 'Too short').max(15, 'Must be 15 char or less'),
    last_name: Yup.string().required('Last name is required').min(2, 'Too short').max(15, 'Must be 15 char or less'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string()
        .required('No password provided')
        .min(8, 'Password is too short - should be 8 chars minimum')
        .matches(/\d+/, 'Password must have a number')
        .matches(/[a-z]+/, 'Password must have a lowercase')
        .matches(/[A-Z]+/, 'Password must have a uppercase')
        .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char'),
    password2: Yup.string()
        .required('No password provided')
        .min(8, 'Password is too short - should be 8 chars minimum')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function Register() {
    const initialValues = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    };
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (values, { resetForm }) => {
        // console.log(values);
        dispatch(register(values));
        resetForm();
        navigate('/');
    };

    return (
        <div className='auth'>
            <Container
                sx={{
                    marginTop: '5rem',
                    height: 'calc(80vh)',
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
                    REGISTER
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
                                <Grid item xs={6}>
                                    <TextField name='username' label='User Name' variant='outlined' value={values.username} onChange={handleChange} onBlur={handleBlur} helperText={touched.username && errors.username} error={touched.username && Boolean(errors.username)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='email' label='Email' variant='outlined' value={values.email} onChange={handleChange} onBlur={handleBlur} helperText={touched.email && errors.email} error={touched.email && Boolean(errors.email)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='first_name' label='First Name' variant='outlined' value={values.first_name} onChange={handleChange} onBlur={handleBlur} helperText={touched.first_name && errors.first_name} error={touched.first_name && Boolean(errors.first_name)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='last_name' label='Last Name' variant='outlined' value={values.last_name} onChange={handleChange} onBlur={handleBlur} helperText={touched.last_name && errors.last_name} error={touched.last_name && Boolean(errors.last_name)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='password' label='Password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} helperText={touched.password && errors.password} error={touched.password && Boolean(errors.password)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name='password2' label='Password Again' variant='outlined' type='password' value={values.password2} onChange={handleChange} onBlur={handleBlur} helperText={touched.password2 && errors.password2} error={touched.password2 && Boolean(errors.password2)} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <CircularProgress color='secondary' />
                                    ) : (
                                        <>
                                            <Button type='submit' variant='contained' color='primary' fullWidth style={{ marginBottom: '1rem' }}>
                                                REGISTER
                                            </Button>
                                        </>
                                    )}
                                </Grid>
                                <Grid container justifyContent='flex-end'>
                                    <p>
                                        Already have an account?
                                        <Link
                                            sx={{
                                                textDecoration: 'none',
                                                fontWeight: '600',
                                                paddingLeft: '0.5rem',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => navigate('/login')}
                                        >
                                            Login
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

export default Register;