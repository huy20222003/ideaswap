//react
import { useEffect, useState } from 'react';
//mui
import {
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
//component
import VideoCommentList from '../VideoCommentList';
//context
import { useComment, useAuth } from '../../../hooks/context';
//react-router-dom
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert2
import Swal from 'sweetalert2';
//-------------------------------------------------------------------------

const VideoComment = () => {
  const { commentState: { comments }, handleGetAllComments, handleCreateComment } = useComment();
  const { authState: { user } } = useAuth();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [id, setId] = useState('');

  const videoId = queryParams.videoId;

  useEffect(() => {
    const fetchComments = async () => {
      await handleGetAllComments();
      setId(videoId);
      formik.setFieldValue('bvID', id);
    };
    fetchComments();
  }, [handleGetAllComments, id, videoId]);

  const commentsFilter = comments.filter((comment) => comment?.bvID === videoId);

  const validationSchema = yup.object({
    content: yup.string().required('Content is required'),
    userID: yup.string().required('User ID is required'),
    bvID: yup.string().required('Bv ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      bvID: id,
      userID: user?._id,
      parentCommentID: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await handleCreateComment(values);
        if (response.success) {
          handleGetAllComments();
          formik.setFieldValue('content', '');
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
      <Typography variant="subtitle2">
        {commentsFilter && commentsFilter.length}
        {commentsFilter.length > 1 ? ' comments' : ' comment'}
      </Typography>
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
      <Box sx={{ mt: '1rem', mb: '2rem' }}>
        <VideoCommentList comments={commentsFilter} />
      </Box>
    </Box>
  );
};

export default VideoComment;