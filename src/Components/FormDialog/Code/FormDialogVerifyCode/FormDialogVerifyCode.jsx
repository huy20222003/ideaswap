//react
import { forwardRef } from 'react';
//mui
import {
  Dialog,
  DialogTitle,
  Stack,
  Divider,
  DialogContent,
  DialogContentText,
  Slide,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//context
import { useUser, useCode, useAuth } from '../../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//proptype
import PropTypes from 'prop-types';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogVerifyCode = ({ newPassword }) => {
  const {
    openFormDialogVerifyCode,
    setOpenFormDialogVerifyCode,
    handleVerifyCode,
  } = useCode();

  const { handleUpdateUser } = useUser();
  const {
    authState: { user },
  } = useAuth();

  const handleClose = () => {
    setOpenFormDialogVerifyCode(false);
  };

  const formik = useFormik({
    initialValues: {
      code: '',
      email: user?.email,
    },
    validationSchema: yup.object({
      code: yup.string().required('Code is required'),
      email: yup.string().required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await handleVerifyCode({
          code: values.code,
          email: values?.email,
        });
        if (res.success) {
          const response = await handleUpdateUser(user?._id, {
            password: newPassword,
          });
          if (response.success) {
            Swal.fire('Success', 'Updated password successfully!', 'success');
            formik.setFieldValue('code', '');
            handleClose();
          } else {
            Swal.fire('Failed', 'Password update failed!', 'error');
          }
        } else {
          Swal.fire('Failed', 'Verification code is incorrect!', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    },
  });

  return (
    <Dialog
      open={openFormDialogVerifyCode}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{ width: 'auto', maxWidth: 'xl' }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>Verify Code</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '20rem' }}>
        <DialogContentText>
          <TextField
            label="Code"
            name="code"
            id="code"
            required
            variant="outlined"
            fullWidth
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.code && formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={formik.handleSubmit}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogVerifyCode.propTypes = {
  newPassword: PropTypes.string.isRequired,
};

export default FormDialogVerifyCode;
