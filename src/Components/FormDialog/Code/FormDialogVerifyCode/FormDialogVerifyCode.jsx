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
//i18n
import { useTranslation } from 'react-i18next';
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
  const {t} = useTranslation('setting');

  const handleClose = () => {
    setOpenFormDialogVerifyCode(false);
  };

  const formik = useFormik({
    initialValues: {
      code: '',
      email: user?.email,
    },
    validationSchema: yup.object({
      code: yup.string().required(t("Code is required")),
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
            Swal.fire(t("Success"), t("Updated password successfully!"), 'success');
            formik.setFieldValue('code', '');
            handleClose();
          } else {
            Swal.fire(t("Failed"), t("Password update failed!"), 'error');
          }
        } else {
          Swal.fire(t("Failed"), t("Verification code is incorrect!"), 'error');
        }
      } catch (error) {
        Swal.fire(t("Error"), t("Server Error"), 'error');
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
        <DialogTitle>{t("Verify Code")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '20rem' }}>
        <DialogContentText>
          <TextField
            label={t("Code")}
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
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={formik.handleSubmit}
        >
          {t("Verify")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogVerifyCode.propTypes = {
  newPassword: PropTypes.string.isRequired,
};

export default FormDialogVerifyCode;
