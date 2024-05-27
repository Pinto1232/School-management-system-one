import React from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Navibar from '../NavigationBar/Navibar';
import { useThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLoggedIn = false;
  const location = useLocation();
  const onDashboard = location.pathname === '/dashboard';
  const { toggleColorMode } = useThemeContext();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Navibar />
      <AppBar position="sticky" color="default">
        <Toolbar>
          {onDashboard && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleColorMode}
              aria-label="toggle color mode"
            >
              {theme.palette.mode === 'light' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          )}

          {!onDashboard && (
            <>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!isLoggedIn && (
                  <MenuItem component={RouterLink} to="/">
                    Home
                  </MenuItem>
                )}
                {!isLoggedIn && (
                  <MenuItem component={RouterLink} to="/about">
                    About
                  </MenuItem>
                )}
                {!isLoggedIn && (
                  <MenuItem component={RouterLink} to="/faq">
                    FAQs
                  </MenuItem>
                )}
              </Menu>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                {!isLoggedIn && (
                  <Button component={RouterLink} to="/" color="inherit">
                    Home
                  </Button>
                )}
                {!isLoggedIn && (
                  <Button
                    component={RouterLink}
                    to="/about"
                    color="inherit"
                    sx={{ ml: 2 }}
                  >
                    About
                  </Button>
                )}
                {!isLoggedIn && (
                  <Button
                    component={RouterLink}
                    to="/faq"
                    color="inherit"
                    sx={{ ml: 2 }}
                  >
                    FAQs
                  </Button>
                )}
              </Box>
            </>
          )}

          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            <Grid item sx={{ flexGrow: 1 }}>
              <SearchBar />
            </Grid>
            {!isLoggedIn && !onDashboard && (
              <Grid item>
                <Button
                  component={RouterLink}
                  to="/register"
                  color="inherit"
                  sx={{ ml: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>
            )}
            {!onDashboard && (
              <Grid item>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={toggleColorMode}
                  aria-label="toggle color mode"
                  sx={{ ml: 2 }}
                >
                  {theme.palette.mode === 'light' ? <SunIcon /> : <MoonIcon />}
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const MemoizedNavbar = React.memo(Navbar);
export default MemoizedNavbar;