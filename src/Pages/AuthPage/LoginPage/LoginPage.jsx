//mui
import { Container, Grid } from '@mui/material';
import { keyframes } from '@emotion/react';
//compoment
import {LoginForm, LoginBanner} from '../../../section/auth/login';
//---------------------------------------------

// Define animations
const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const LoginPage = () => {
  return (
    <Container maxWidth='xl'>
      <Grid container sx={{ my: '2rem' }}>
        <Grid item xl={6} md={6} sm={12} sx={{animation: `${slideInFromLeft} 0.5s linear forwards`}}>
          <LoginForm />
        </Grid>
        <Grid item xl={6} md={6} sm={12} sx={{animation: `${slideInFromRight} 0.5s linear forwards`}}>
            <LoginBanner />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
