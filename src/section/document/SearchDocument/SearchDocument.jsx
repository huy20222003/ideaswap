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
import { useDocument } from '../../../hooks/context';

const SearchDocument = () => {
  const { handleSearchDocuments } = useDocument();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(()=>{
    async () => {
      try {
        await handleSearchDocuments(searchTerm);
      } catch (error) {
        console.log(error);
      }
    };
  }, [handleSearchDocuments, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 1); 

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch, searchTerm]);

  handleSearch();

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
            <Avatar alt="Avatar" src="/assets/images/avatars/avatar_2.jpg" />
          </Box>
          <Box sx={{ width: '38rem' }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{ bgcolor: 'white', borderRadius: '0.5rem' }}
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
