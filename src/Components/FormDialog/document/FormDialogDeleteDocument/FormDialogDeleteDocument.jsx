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
import { useDocument } from '../../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//proptype
import PropTypes from 'prop-types';
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogDeleteCourse = ({ documentId }) => {
  const {
    openFormDialogDeleteDocument,
    setOpenFormDialogDeleteDocument,
    handleDeleteDocument,
    handleGetAllDocuments,
  } = useDocument();
  const handleClose = () => {
    setOpenFormDialogDeleteDocument(false);
  };

  const handleDeleteVideoById = async () => {
    try {
      const response = await handleDeleteDocument(documentId);
      if (response.success) {
        handleGetAllDocuments();
        setOpenFormDialogDeleteDocument(false);
        Swal.fire('', 'Delete Successful!', 'success');
      } else {
        setOpenFormDialogDeleteDocument(false);
        Swal.fire('', 'Delete failed!', 'error');
      }
    } catch (error) {
      Swal.fire('', 'Server error!', 'error');
    }
  };

  return (
    <Dialog
      open={openFormDialogDeleteDocument}
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
        <DialogTitle>Delete Document</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this document?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text">Cancel</Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleDeleteVideoById}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogDeleteCourse.propTypes = {
    documentId: PropTypes.string.isRequired, 
  };

export default FormDialogDeleteCourse;
