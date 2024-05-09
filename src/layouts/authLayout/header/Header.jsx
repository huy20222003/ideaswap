//react-router-dom
import { NavLink } from 'react-router-dom';
//mui
import { Stack, Box, Button, Grid, Divider } from '@mui/material';
import styled from '@emotion/styled';
//Components
import HeaderLogo from './HeaderLogo';
//----------------------------------------------

const NavLinkStyled = styled(NavLink)`
  text-decoration: none; 
  color: black; 
  padding: 8px 16px;
  font-size: 0.8rem;
  &:hover {
    color: #229A16; 
  }
  &.active {
    color: #229A16; 
  }
`;

const Header = () => {
  return (
    <Box>
      <Grid container sx={{alignItems: 'center', height: '4rem'}}>
        <Grid item xl={6} md={6}>
          <HeaderLogo />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <NavLinkStyled to="/dashboard/app">Home</NavLinkStyled>
            <NavLinkStyled to="/dashboard/course">Course</NavLinkStyled>
            <NavLinkStyled to="/dashboard/document">Document</NavLinkStyled>
            <NavLinkStyled to="/dashboard/contact">Contact</NavLinkStyled>

            <Stack sx={{flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
              <Button variant="text" href='/auth/login'>Login</Button>
              <Button variant="outlined" href='/auth/register' sx={{px: '2rem'}}>Register</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Header;
