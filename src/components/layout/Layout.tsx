import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useState, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import LoadingFallback from '../LoadingFallback';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: 'flex'}}>
        <Navigation mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 0,
          }}
        >
          <Toolbar /> {/*  Used for spacing instead of margin/padding top */}
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
