//mui
import { Box, Stack, Typography } from '@mui/material';
//----------------------------------------

const DonateInfo = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.main', borderRadius: '0.4rem' }}>
        <Typography variant="subtitle1" sx={{ color: 'white', p: '0.5rem' }}>
          Donate for IdeaSwap
        </Typography>
      </Box>
      <Box sx={{ my: '1rem' }}>
        <Typography variant="body2" sx={{ my: '0.5rem' }}>
          Please Support Us! Contribute So That The Website Can Continue To
          Operate And Develop!
        </Typography>
        <Typography variant="body2" sx={{ my: '0.5rem' }}>
          Hello,
        </Typography>
        <Typography variant="body2" sx={{ my: '0.5rem' }}>
          IdeaSwap need your help to maintain and develop the website. Every
          contribution matters and helps us continue to provide quality content.
          Please support us today!
        </Typography>
      </Box>
      <Stack sx={{mb: '1rem', flexDirection: 'row', gap: '0.4rem', alignItems: 'center'}}>
        <Typography variant="subtitle1">
          Donate:
        </Typography>
        <Typography variant="subtitle2" sx={{textTransform: 'uppercase'}}>
          Tiền có thể không mua được hạnh phúc, nhưng có tiền thì mới hạnh phúc.
        </Typography>
      </Stack>
    </Box>
  );
};

export default DonateInfo;
