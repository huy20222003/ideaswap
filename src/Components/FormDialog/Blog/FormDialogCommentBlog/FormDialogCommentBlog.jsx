import { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// prop-type
import PropTypes from 'prop-types';
// mui
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
  styled,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
// context
import {
  useBlog,
  useComment,
  useUser,
  useAuth,
  useHeart,
  useShare,
} from '../../../../hooks/context';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// component
import FormDialogCommentList from './FormDialogCommentList';
// formik
import { useFormik } from 'formik';
// yup
import * as yup from 'yup';
// sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//------------------------------------------------------------

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));

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
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);
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
  const {
    heartState,
    handleGetAllHearts,
    handleCreateHeart,
    handleDeleteHeart,
  } = useHeart();
  const { shareState, handleCreateShare, handleGetAllShares } = useShare();
  const { hearts } = heartState;
  const { shares } = shareState;
  const [heartIcon, setHeartIcon] = useState(<FavoriteIcon />);

  const commentsFilter = comments
    .filter((comment) => comment?.bvID === blog?._id)
    .map((comment) => ({
      ...comment,
      bvID: blog?._id, // Thay đổi giá trị của trường bvID thành _id của blog
    }));

  useEffect(() => {
    handleGetAllHearts();
    handleGetAllShares();
  }, [handleGetAllHearts, handleGetAllShares]);

  useEffect(() => {
    handleGetAllComments();
    blog?.userID && handleGetUserById(blog?.userID);
  }, [blog?.userID, handleGetAllComments, handleGetUserById]);

  const handleClose = () => {
    setOpenFormDialogCommentBlog(false);
  };

  const handleShare = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    await handleCreateShare({
      userID: authState?.user?._id,
      bvID: blog?._id,
    });
    handleGetAllShares();
  };

  const handleCopyToClipboard = () => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.protocol}//${url.host}`;
    const fullUrl = `${baseUrl}/dashboard/blog/${blog?._id}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, 2000); // Show tooltip for 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
    handleShare();
  };

  const heartArrays = hearts.filter((heart) => heart?.bvID === blog?._id);
  const shareArrays = shares.filter((share) => share?.bvID === blog?._id);

  const [heartLength, setHeartLength] = useState(heartArrays.length);

  useEffect(() => {
    const updateHeartIcon = () => {
      const heartFind = heartArrays.find(
        (heart) =>
          heart?.userID === authState.user?._id && heart.bvID === blog?._id
      );
      setHeartIcon(
        heartFind ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon />
      );
    };
    updateHeartIcon();
  }, [blog?._id, authState.user, heartArrays]);

  const handleClickHeart = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    const data = { userID: authState.user._id, bvID: blog?._id };
    try {
      if (heartIcon.props.sx) {
        await handleDeleteHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength - 1);
        setHeartIcon(<FavoriteIcon />);
      } else {
        await handleCreateHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength + 1);
        setHeartIcon(<FavoriteIcon sx={{ color: 'red' }} />);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while processing your action. Please try again later.',
        icon: 'error',
      });
    }
  };

  const truncatedContent = expanded
    ? blog?.content
    : `${blog?.content.slice(0, 100)}...`;

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

  useEffect(() => {
    formik.setFieldValue('bvID', blog?._id);
  }, [blog?._id]);

  return (
    <Dialog
      open={openFormDialogCommentBlog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          width: { lg: '70%', xl: '60%', md: '60%', sm: '80%', xs: '90%' },
          maxWidth: 'none',
        },
      }}
      scroll="paper"
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
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: '70vh',
          p: '1rem',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.05)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.5)',
            outline: '1px solid slategrey',
            borderRadius: '0.5em',
          },
        }}
      >
        <Card sx={{ my: '1rem' }}>
          <CardHeader
            avatar={<Avatar src={user?.avatar} />}
            title={`${user?.firstName} ${user?.lastName}`}
            subheader={fDateTime(blog?.createdAt)}
            sx={{ py: 0 }}
          />
          <CardContent sx={{ pb: '0.2rem' }}>
            <Typography variant="body2" color="text.primary">
              {HTMLReactParser(truncatedContent)}
              {blog?.content.length > 100 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  onClick={toggleExpand}
                  sx={{ cursor: 'pointer', display: 'inline' }}
                >
                  {expanded ? ' Show less' : '... Show more'}
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
                {heartLength}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: 'row' }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mx: '0.4rem' }}
              >
                {commentsFilter?.length} comments
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mx: '0.4rem' }}
              >
                {shareArrays?.length} shares
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton
              aria-label="add to favorites"
              onClick={handleClickHeart}
            >
              {heartIcon}
            </IconButton>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
            <LightTooltip
              title="URL copied to clipboard!"
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton aria-label="share" onClick={handleCopyToClipboard}>
                <LinkIcon />
              </IconButton>
            </LightTooltip>
          </CardActions>
        </Card>
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
