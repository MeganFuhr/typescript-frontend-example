import { Box, Typography } from '@mui/material';

const drawerWidth = 240;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        ml: { xs: 0, sm: `${drawerWidth}px` },
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} TypeScript Frontend Example. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
