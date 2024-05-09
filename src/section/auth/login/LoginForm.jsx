//react
import { useState } from 'react';
//react-router-dom
import { Link, useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//components
import Iconify from '../../../Components/iconify';
//sweetalert
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//context
import { useAuth } from '../../../hooks/context';
//cookie
import Cookies from 'js-cookie';
//-------------------------------

const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 0.875rem;
  color: #229a16;
  margin-left: 0.2rem;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  document.title = 'Login';
  const { loginUser, loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Invalid username'),
      password: yup.string().required('Invalid password'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const loginData = await loginUser(values);
        if (!loginData.success) {
          Swal.fire('Failed', 'Login Failed', 'error');
          setLoading(false);
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 60 * 60 * 1000);
          Cookies.set('user', loginData.accessToken, { expires: expiration });
          Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
          await loadUser();
          Swal.fire('Success', 'Login Success!', 'success');
          navigate('/dashboard/app');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant="h4" sx={{ my: '0.5rem' }}>
        Login
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey' }}>
        Wellcome back, Enter your credenitials to access your account
      </Typography>
      <Box sx={{ mt: '0.5rem', my: '1rem' }}>
        <Stack sx={{ gap: '1.5rem' }}>
          <Box>
            <TextField
              label="Username"
              name='username'
              id='username'
              required
              variant="outlined"
              fullWidth
              autoComplete="username"
              error={!!(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              {...formik.getFieldProps('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (document.getElementById('username').value === '') {
                    return;
                  } else {
                    document.getElementById('password').focus();
                  }
                }
              }}
            />
          </Box>
          <Box>
            <TextField
              label="Password"
              name='password'
              id='password'
              required
              variant="outlined"
              fullWidth
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
            />
            <Typography
              sx={{
                textAlign: 'end',
                color: 'primary.main',
                fontSize: '0.75rem',
                mt: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Forget password?
            </Typography>
          </Box>
        </Stack>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          sx={{ mt: '0.5rem' }}
        />
        {loading ? (
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            sx={{color: 'white', py: '0.5rem', my: '1rem'}}
            loadingIndicator={<CircularProgress size={16} />}
            onClick={formik.handleSubmit}
          >
            Login
          </LoadingButton>
        )}
      </Box>
      <Divider sx={{ fontSize: '0.8rem' }}>OR</Divider>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1rem',
          mt: '1rem',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.5rem' }}
          startIcon={<GoogleIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.5rem', fontSize: '0.8rem' }}>
            Google
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.5rem' }}
          startIcon={<FacebookIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.5rem', fontSize: '0.8rem' }}>
            Facebook
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.5rem' }}
          startIcon={<TelegramIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.5rem', fontSize: '0.8rem' }}>
            Telegram
          </Typography>
        </Button>
      </Stack>
      <Stack
        sx={{ flexDirection: 'row', justifyContent: 'center', mt: '2rem' }}
      >
        <Typography variant="body2">Do not have an account?</Typography>
        <LinkStyled to="/auth/register">Register here</LinkStyled>
      </Stack>
    </Box>
  );
};

export default LoginForm;
