import { NavLink, useLocation } from 'react-router-dom';
import { Tooltip, ListItemButton, ListItemText } from '@mui/material';
import styled from '@emotion/styled';

const NavLinkCustom = styled(NavLink)`
  && {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.5rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: block;
    text-decoration: none;
    color: ${(props) => (props.active ? '#54D62C' : 'black')};
  }
`;

const ListItemSetting = () => {
  const location = useLocation();

  return (
    <>
      <Tooltip title="Profile" placement="right">
        <NavLinkCustom to="/setting/profile" active={location.pathname === '/setting/profile'}>
          <ListItemButton>
            <ListItemText sx={{ fontSize: '0.5rem' }} primary="Profile" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Password" placement="right">
        <NavLinkCustom to="/setting/password" active={location.pathname === '/setting/password'}>
          <ListItemButton>
            <ListItemText sx={{ fontSize: '0.5rem' }} primary="Password" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title="Language" placement="right">
        <NavLinkCustom to="/setting/language" active={location.pathname === '/setting/language'}>
          <ListItemButton>
            <ListItemText sx={{ fontSize: '0.5rem' }} primary="Language" />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
    </>
  );
};

export default ListItemSetting;
