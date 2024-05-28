//mui
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//--------------------------------------------------------------------------

const Searchbar = () => {
  return (
    <Box>
      <Stack
        sx={{ flexDirection: 'row', alignItems: 'center', height: '4rem' }}
      >
        <Box
          component='img'
          src='/assets/logos/logo_IdeaSwap_White_v2.png'
          width='5rem'
          height='5rem'
          sx={{mx: '1rem'}}
        />
        <Box>
          <TextField
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              placeholder: "Search on ideaswap"
            }}
            sx={{ bgcolor: 'white', borderRadius: '0.5rem', width: '18rem' }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Searchbar;
