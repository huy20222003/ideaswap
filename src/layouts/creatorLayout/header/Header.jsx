import { Box } from '@mui/material';
import { useState, useEffect } from 'react'; // Import useState và useEffect
//component
import Searchbar from './Searchbar';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import AccountPopover from './AccountPopover';

//--------------------------------------------------------------------

const Header = () => {
  // State để lưu trạng thái của cuộn trang
  const [scrollPosition, setScrollPosition] = useState(0);

  // Lắng nghe sự kiện cuộn trang và cập nhật scrollPosition
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Xoá sự kiện lắng nghe khi component unmount
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
        width: '100%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
        transition: 'opacity 0.3s ease', // Thêm transition
        opacity: scrollPosition > 200 ? 0.9 : 1, // Thay đổi opacity dựa trên scrollPosition
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
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
          <Searchbar />
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '4rem',
            }}
          >
            <Box sx={{ m: '0 1rem 0 1rem' }}>
              <LanguagePopover />
            </Box>
            <Box sx={{ m: '0 1rem 0 1rem' }}>
              <NotificationsPopover />
            </Box>
            <Box sx={{ m: '0 1rem 0 1rem' }}>
              <AccountPopover />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
