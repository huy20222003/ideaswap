import { Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Navigation from './nav';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import AccountPopover from './AccountPopover';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        height: '4rem',
        position: 'fixed',
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.3s ease',
        opacity: scrollPosition > 200 ? 0.9 : 1,
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}>
          <Searchbar />
        </Grid>
        <Grid item xl={6} md={6} xs={12}>
          <Navigation />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '4rem',
            }}
          >
            {/* LanguagePopover sẽ không hiển thị trên màn hình nhỏ (xs) */}
            <Box sx={{ m: '0 1rem 0 1rem' }} display={{ xs: 'none', md: 'block' }}>
              <LanguagePopover />
            </Box>
            <Box sx={{ m: '0 1rem 0 1rem' }}>
              <NotificationsPopover />
            </Box>
            <Box sx={{ m: '0 1rem 0 1rem' }}>
              <AccountPopover />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
