//react
import { useState, useEffect } from 'react';
//mui
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Dayjs
import dayjs from 'dayjs';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//context
import { useAuth, useUser } from '../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//--------------------------------------

const ProfileInfo = () => {
  const [datimeValue, setDateTimeValue] = useState(dayjs(Date.now()));
  const [gender, setGender] = useState('Male');
  const {
    authState: { user },
  } = useAuth();

  const { handleUpdateUser } = useUser();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      _id: user?._id,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      gender: user?.gender || gender,
      address: user?.address || '',
      birthday: datimeValue,
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required('FirstName is required')
        .max(200, 'FirstName maximum 200 characters'),
      lastName: yup
        .string()
        .required('LastName is required')
        .max(200, 'LastName maximum 200 characters'),
      username: yup
        .string()
        .required('Username is required')
        .max(100, 'Username maximum 100 characters'),
      gender: yup.string(),
      email: yup
        .string()
        .required('Email is required')
        .matches(/^\S+@\S+\.\S+$/, 'Invalid email'),
      phoneNumber: yup.string().max(10, 'PhoneNuber maximum 10 characters'),
      address: yup.string().max(500, 'Address maximum 500 characters'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await handleUpdateUser(values._id, values);
        if (response.success) {
          Swal.fire('Success', 'Successfully updated', 'success');
        } else {
          Swal.fire('Failed', 'Update information failed', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
  });

  useEffect(() => {
    if (user?.birthday) {
      const birthdayDate = dayjs(user.birthday); // Chuyển đổi định dạng
      setDateTimeValue(birthdayDate); // Gán vào state datimeValue
    }
  }, [user.birthday]);

  useEffect(()=>{
    formik.setFieldValue('birthday', datimeValue);
  }, [datimeValue]);

  return (
    <Box sx={{ mt: '1rem' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '0.5rem',
          justifyContent: 'space-between',
          mb: '1rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            label="FirstName"
            name="firstName"
            id="firstName"
            required
            variant="outlined"
            fullWidth
            autoComplete="FirstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={!!(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="LastName"
            name="lastName"
            id="lastName"
            required
            variant="outlined"
            fullWidth
            autoComplete="LastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={!!(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '1rem',
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DateTimePicker', 'DateTimePicker']}
              sx={{ alignItems: 'flex-end' }}
            >
              <DatePicker
                label="BirthDay"
                value={datimeValue}
                sx={{ maxWidth: '5rem' }}
                slotProps={{
                  // Targets the `IconButton` component.
                  openPickerButton: {
                    color: 'primary',
                  },
                  // Targets the `InputAdornment` component.
                  inputAdornment: {
                    position: 'end',
                  },
                }}
                onChange={(newValue) => setDateTimeValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value={'Male'}>Nam</MenuItem>
              <MenuItem value={'Female'}>Nữ</MenuItem>
              <MenuItem value={'Unknow'}>Unknow</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack gap="1rem">
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Username"
            name="username"
            id="username"
            required
            variant="outlined"
            fullWidth
            autoComplete="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={!!(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Email"
            name="email"
            id="email"
            required
            variant="outlined"
            fullWidth
            autoComplete="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="PhoneNumber"
            name="phoneNumber"
            id="phoneNumber"
            required
            variant="outlined"
            fullWidth
            autoComplete="PhoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Address"
            name="address"
            id="address"
            required
            variant="outlined"
            fullWidth
            autoComplete="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.address && formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Box>
          <Button
            variant="contained"
            size="medium"
            sx={{ px: '1.5rem', color: '#fff' }}
            onClick={formik.handleSubmit}
          >
            Change
          </Button>
        </Box>
      </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileInfo;