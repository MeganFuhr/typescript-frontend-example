import { Typography, Box } from '@mui/material';

const Page03 = () => {
  return (
    <Box sx={{ py: 4, px: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Page03
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </Box>
  );
};

export default Page03;
