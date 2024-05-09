//react
import { useState } from 'react';
//mui
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

//------------------------------------------------------

const Language = () => {
  const [language, setLanguage] = useState('en-US');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.lighter',
        p: '1rem',
        borderRadius: '0.4rem',
      }}
    >
      <Typography variant="h6" sx={{color: 'primary.main'}}>Language</Typography>
      <FormControl sx={{ minWidth: '10rem' }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={'en-US'}>English</MenuItem>
          <MenuItem value={'vn-VN'}>Vietnamese</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Language;
