//mui
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
//--------------------------------------------------------------------------

const Searchbar = () => {
  const navigate = useNavigate();
  const handleNavigate = async () => {
    navigate(`/dashboard/app`);
  };
  return (
    <Box>
      <Stack
        sx={{ flexDirection: 'row', alignItems: 'center', height: '4rem' }}
      >
        <Box
          component="img"
          src="/assets/logos/logo_IdeaSwap_nbg.png"
          width="3rem"
          height="3rem"
          sx={{ mx: '1rem', cursor: 'pointer' }}
          onClick={handleNavigate}
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
              placeholder: 'Search on ideaswap',
            }}
            sx={{ bgcolor: 'white', borderRadius: '0.5rem', width: '18rem' }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Searchbar;
