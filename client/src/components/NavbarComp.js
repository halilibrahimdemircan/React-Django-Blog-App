import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userAction';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='fixed' sx={{ bgcolor: grey[900], pb: 1, pt: 1 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row' }}>
              <Avatar alt='Logo' variant='square' src='/images/cw.png' sx={{ width: { xs: 50, sm: 50, md: 50 }, height: 50 }} />
              <Avatar alt='Logo' variant='square' src='/images/cw.png' sx={{ width: { xs: 50, sm: 50, md: 50 }, height: 50 }} />
              <Avatar alt='Logo' variant='square' src='/images/cw.png' sx={{ width: { xs: 50, sm: 50, md: 50 }, height: 50 }} />
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {user?.first_name ? (
                <Typography variant='body1' sx={{ color: 'white', display: 'block' }} style={{ fontFamily: 'Architects Daughter' }}>
                  {user?.first_name.split(' ')[0].toUpperCase()}
                </Typography>
              ) : (
                ''
              )}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? <Avatar alt={user.first_name?.toUpperCase()} src={'/static/images/avatar/2.jpg'} sx={{ bgcolor: grey[200], color: '#000' }} /> : <Avatar alt='Remy Sharp' />}
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem onClick={() => navigate('/new')}>New</MenuItem>
                  <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
