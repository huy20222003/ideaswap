import { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
//mui
import { Box, Stack, Avatar, TextField, Button } from '@mui/material';
//context
import { useComment, useAuth } from '../../../../hooks/context';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert2
import Swal from 'sweetalert2';
//-------------------------------------------------------------------------

const VideoReplyComment = (props) => {
  const {
    handleGetAllComments,
    handleCreateComment,
  } = useComment();
  const {
    authState: { user },
  } = useAuth();
  const { commentId, bvID, handleToggleReplyComment } = props; // Fix typo here


  useEffect(() => {
    const fetchComments = async () => {
      await handleGetAllComments();
      formik.setFieldValue('bvID', bvID);
    };
    fetchComments();
  }, [handleGetAllComments, bvID]);

  const validationSchema = yup.object({
    content: yup.string().required('Content is required'),
    userID: yup.string(),
    bvID: yup.string().required('Bv ID is required'),
    parentCommentID: yup.string().required('ParentCommentID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      bvID: bvID,
      userID: user?._id,
      parentCommentID: commentId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await handleCreateComment(values);
        if (response.success) {
          handleGetAllComments();
          formik.setFieldValue('content', '');
          handleToggleReplyComment(); // Call handleToggleReplyComment to close the reply comment box after submitting
        }
      } catch (error) {
        Swal.fire({
          title: 'Server Error',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
    },
  });

  return (
    <Box sx={{ mt: '1rem', mb: '0.5rem' }}>
      <Stack sx={{ flexDirection: 'row', gap: '0.5rem', my: '0.5rem' }}>
        <Avatar alt={user?.firstName + user?.lastName} src={user?.avatar} />
        <TextField
          fullWidth
          label="Comment"
          variant="outlined"
          size="medium"
          id="content"
          name="content"
          multiline
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="small"
          sx={{ color: '#fff', my: '1rem' }}
          onClick={formik.handleSubmit}
        >
          Comment
        </Button>
      </Stack>
    </Box>
  );
};

// Define PropTypes for props validation
VideoReplyComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  bvID: PropTypes.string.isRequired, // Add PropTypes for commentId
  handleToggleReplyComment: PropTypes.func,
};

export default VideoReplyComment;
