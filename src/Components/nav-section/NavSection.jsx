import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool,
};

export default function NavSection({ data = [], isOpen, ...other }) {
  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          m: { md: '0 8rem' },
          flexDirection: 'row',
        }}
      >
        {data.map((item, index) => (
          <NavItem key={index} item={item} isOpen={isOpen} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isOpen: PropTypes.bool,
};

function NavItem({ item, isOpen }) {
  const { path, icon, info, title } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        position: 'relative',
        textDecoration: 'none',
        color: 'text.secondary',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&.active': {
          color: 'text.primary',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0%',
          height: 3,
          backgroundColor: 'white',
          borderRadius: '10%',
          transition: 'width 0.3s ease',
        },
        '&.active::after': {
          width: '80%',
        },
        mx: { xs: 1, md: 2 },
        my: { xs: 0.5, md: 0 },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      {isOpen && (
        <ListItemText
          primary={title}
          sx={{ ml: 2, display: { md: 'none', xl: 'none', lg: 'none' } }}
        />
      )}{' '}
      {/* Display title if menu is open */}
      {info && info}
    </StyledNavItem>
  );
}
