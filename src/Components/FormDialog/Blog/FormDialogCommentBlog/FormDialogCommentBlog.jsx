///react
import { forwardRef, useEffect, useState } from 'react';
//prop-type
import PropTypes from 'prop-types';
//mui
import {
  Box,
  Dialog,
  DialogTitle,
  Slide,
  Stack,
  Divider,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
//context
import {
  useBlog,
  useComment,
  useUser,
  useAuth,
} from '../../../../hooks/context';
//ultils
import { fDateTime } from '../../../../utils/formatTime';
//component
import FormDialogCommentList from './FormDialogCommentList';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert2
import Swal from 'sweetalert2';
//------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FormDialogCommentBlog = () => {
  const {
    blogState: { blog },
    openFormDialogCommentBlog,
    setOpenFormDialogCommentBlog,
  } = useBlog();
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const {
    commentState: { comments },
    handleGetAllComments,
    handleCreateComment,
  } = useComment();
  const {
    userState: { user },
    handleGetUserById,
  } = useUser();
  const { authState } = useAuth();

  const commentsFilter = comments.filter(
    (comment) => comment?.bvID === blog?._id
  );

  useEffect(() => {
    handleGetAllComments();
    blog?.userID && handleGetUserById(blog?.userID);
  }, [blog?.userID, handleGetAllComments, handleGetUserById]);

  const handleClose = () => {
    setOpenFormDialogCommentBlog(false);
  };
  console.log(blog);
  const truncatedContent =
    blog?.content?.length > 30
      ? expanded
        ? blog?.content
        : `${blog?.content.slice(0, 30)}...`
      : blog?.content;

  const validationSchema = yup.object({
    userID: yup.string().required('User ID is required'),
    bvID: yup.string().required('Bv ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      bvID: blog?._id,
      userID: authState?.user?._id,
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
    <Dialog
      open={openFormDialogCommentBlog}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      scroll="paper"
      sx={{ p: '1rem', maxWidth: 'xl' }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>
          Blog of {user?.firstName + ' ' + user?.lastName}
        </DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <Card sx={{ my: '1rem' }}>
        <CardHeader
          avatar={<Avatar src={user?.avatar} />}
          title={`${user?.firstName} ${user?.lastName}`}
          subheader={fDateTime(blog?.createdAt)}
        />
        <CardContent sx={{ pb: '0.2rem' }}>
          <Typography variant="body2" color="text.primary">
            {truncatedContent}
            {blog?.content?.length > 30 && (
              <Typography
                variant="body2"
                color="text.secondary"
                onClick={toggleExpand}
                sx={{ cursor: 'pointer' }}
              >
                {expanded ? 'Short' : 'Show more'}
              </Typography>
            )}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            p: '0.5rem',
            borderRadius: '0.4rem',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          image={blog?.url}
          alt={`${user?.firstName} ${user?.lastName}`}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '0.5rem',
          }}
        >
          <Stack sx={{ flexDirection: 'row' }}>
            <FavoriteIcon sx={{ color: 'red' }} />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mx: '0.2rem' }}
            >
              {/* {heartArrays?.length} */}
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mx: '0.4rem' }}
            >
              {/* {commentArrays?.length} comments */}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mx: '0.4rem' }}
            >
              {/* {shareArrays?.length} shares */}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Box sx={{ my: '1rem' }}>
        <Typography variant="subtitle1" sx={{ ml: '1rem' }}>
          Comments
        </Typography>
        {commentsFilter.length > 0 ? (
          <Box>
            <FormDialogCommentList comments={commentsFilter} />
          </Box>
        ) : (
          'Chưa có bình luận nào'
        )}
      </Box>
      <Box sx={{ m: '1rem' }}>
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
    </Dialog>
  );
};

FormDialogCommentBlog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    heartArrays: PropTypes.array.isRequired,
    commentArrays: PropTypes.array.isRequired,
    shareArrays: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormDialogCommentBlog;
