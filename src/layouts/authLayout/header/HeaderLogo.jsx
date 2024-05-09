//mui
import { Box, Typography } from '@mui/material';
//----------------------------------------------

const HeaderLogo = () => {
  return (
    <Box>
      <Typography
        sx={{
          textTransform: 'capitalize',
          fontSize: '1.8rem',
          color: 'primary.main',
        }}
      >
        IdeaSwap
      </Typography>
    </Box>
  );
};

export default HeaderLogo;
