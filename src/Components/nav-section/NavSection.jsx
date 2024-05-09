import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 8rem',
        }}
      >
        {data.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function NavItem({ item }) {
  const { path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        position: 'relative',
        textDecoration: 'none',
        color: 'text.secondary',
        display: 'flex',
        flexDirection: 'column',
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
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      {info && info}
    </StyledNavItem>
  );
}