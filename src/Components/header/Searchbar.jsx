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
          sx={{
            color: 'white',
            fontStyle: 'oblique',
            m: '0 0.5rem',
            fontSize: '1rem',
          }}
        >
          Idea Swap
        </Box>
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
            }}
            sx={{ bgcolor: 'white', borderRadius: '0.5rem', width: '18rem' }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Searchbar;
