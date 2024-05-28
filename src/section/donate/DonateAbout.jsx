//mui
import { Box, Typography, Divider } from '@mui/material';
//component
import Slider from './slider/Slider';
//-----------------------------------------------------

const DonateAbout = () => {
  return (
    <Box sx={{ my: '2rem' }}>
      <Box sx={{ bgcolor: 'primary.main', borderRadius: '0.4rem' }}>
        <Typography variant="subtitle1" sx={{ color: 'white', p: '0.5rem' }}>
          IdeaSwap About
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          my: '1rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
              IdeaSwap Team Member
            </Typography>
          </Box>
        </Box>
        <Slider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '2rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'inline-block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
              IdeaSwap Ecosystem
            </Typography>
          </Box>
          <Box sx={{ ml: '2rem' }}>
            <Typography variant="body2">IdeaSwap AI</Typography>
            <Typography variant="body2">IdeaSwap Cloud</Typography>
            <Typography variant="body2">Socail Media IdeaSwap</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              xl: 'block',
              lg: 'block',
            },
          }}
        >
          <Box
            component={'img'}
            sx={{ width: '15rem', height: '10rem', borderRadius: '0.4rem' }}
            src="/assets/images/banners/anh_bia.png"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DonateAbout;
