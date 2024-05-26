import { useState, useEffect, useCallback } from 'react';
import {
  Avatar,
  Box,
  Stack,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDocument, useAuth } from '../../../hooks/context';

const SearchDocument = () => {
  const { handleSearchDocuments } = useDocument();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    authState: { user },
  } = useAuth();

  const handleSearch = useCallback(async () => {
    try {
      await handleSearchDocuments(searchTerm);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, handleSearchDocuments]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // Thường thì chúng ta để debounce time khoảng 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Card sx={{ m: '5rem 0 1rem 0', bgcolor: 'primary.main' }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Avatar alt="Avatar" src={user?.avatar} />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                bgcolor: 'white',
                borderRadius: '0.5rem',
                width: {xs: '15rem', sm: '16rem', md: '25rem', xl: '38rem', lg: '40rem'}
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchDocument;
