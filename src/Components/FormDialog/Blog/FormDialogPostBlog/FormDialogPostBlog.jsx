///react
import { forwardRef, useState } from 'react';
//mui
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Stack,
  Divider,
  Typography,
  TextField,
  Avatar,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
//context
import { useCommon, useAuth, useBlog } from '../../../../hooks/context';
//component
import BlogFormImage from './BlogFormImage';
//fomik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert
import Swal from 'sweetalert2';
import { fDateTime } from '../../../../utils/formatTime';
//------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FormDialogPostBlog = () => {
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const {
    authState: { user },
  } = useAuth();
  const { handleCreateBlog } = useBlog();

  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      url: '',
      userID: user?._id,
    },
    validationSchema: yup.object({
      content: yup
        .string()
        .required('Content is required')
        .max(5000, 'The maximum number of characters is 5000'),
      userID: yup.string().required('UserID is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const response = await handleCreateBlog(values, setProgressValue);
        if (response.success) {
          setOpenFormDialog(false);
          Swal.fire({
            title: 'Create Blog successful!',
            text: ' Your blog is awaiting approval.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Create Blog failed!',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setOpenFormDialog(false);
        Swal.fire({
          title: 'Server Error',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>Post Blog</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: '1rem' }}>
          <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
            <Avatar alt="Remy Sharp" src={user?.avatar} />
            <Stack>
              <Typography variant="subtitle2">
                {user?.firstName + user?.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                {fDateTime(Date.now())}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mb: '1.5rem' }}>
          <TextField
            variant="outlined"
            label="Content"
            id="content"
            name="content"
            fullWidth
            multiline
            rows={5}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {formik.values.description?.length}/5000
          </Stack>
        </Box>
        <BlogFormImage formik={formik} />
        {showProgress && ( // Hiển thị thanh tiến trình và label phần trăm khi showProgress là true
          <Box sx={{ my: '0.5rem' }}>
            <LinearProgress variant="determinate" value={progressValue} />
            <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary">
                {progressValue}%
              </Typography>
            </Stack>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ px: '1rem', mx: '0.5rem' }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ color: 'white', px: '1rem', mx: '0.5rem' }}
          onClick={formik.handleSubmit}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogPostBlog;
