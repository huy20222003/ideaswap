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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//context
import { useBlog } from '../../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//proptype
import PropTypes from 'prop-types';
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogDeleteCourse = () => {
  const {
    blogState: {blog},
    openFormDialogDeleteBlog,
    setOpenFormDialogDeleteBlog,
    handleDeleteBlog,
    handleGetAllBlog,
  } = useBlog();
  const handleClose = () => {
    setOpenFormDialogDeleteBlog(false);
  };

  const handleDeleteBlogById = async () => {
    try {
      const response = await handleDeleteBlog(blog?._id);
      if (response.success) {
        handleGetAllBlog();
        setOpenFormDialogDeleteBlog(false);
        Swal.fire('', 'Delete Successful!', 'success');
      } else {
        setOpenFormDialogDeleteBlog(false);
        Swal.fire('', 'Delete failed!', 'error');
      }
    } catch (error) {
      Swal.fire('', 'Server error!', 'error');
    }
  };

  return (
    <Dialog
      open={openFormDialogDeleteBlog}
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
        <DialogTitle>Delete Blog</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this blog?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text">Cancel</Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleDeleteBlogById}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogDeleteCourse.propTypes = {
    blogId: PropTypes.string.isRequired, 
  };

export default FormDialogDeleteCourse;
