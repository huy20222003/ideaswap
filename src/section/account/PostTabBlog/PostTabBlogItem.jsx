//react
import { useState, useEffect, useCallback } from 'react';
//react-router-dom
import { useNavigate } from 'react-router-dom';
//prop-type
import PropTypes from 'prop-types';
//@mui
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
//ultils
import { fDateTime } from '../../../utils/formatTime';
//context
import { useAuth, useCommon, useHeart, useBlog } from '../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//--------------------------------------------------------------------------------------

const PostTabBlogItem = ({ blog }) => {
  const { _id, content, url, createdAt, heartArrays, shareArrays, commentArrays, user } = blog;
  const [expanded, setExpanded] = useState(false);
  const { authState } = useAuth();
  const { setOpenFormDialogEditBlog } = useCommon();
  const { setOpenFormDialogDeleteBlog, handleGetOneBlog, setOpenFormDialogCommentBlog } = useBlog();
  const [heartIcon, setHeartIcon] = useState(<FavoriteIcon />);
  const { handleCreateHeart, handleDeleteHeart } = useHeart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [heartLength, setHeartLength] = useState(heartArrays.length);

  const toggleExpand = () => setExpanded(!expanded);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeartIcon = () => {
      const heartFind = heartArrays.find(heart => heart?.userID === authState.user?._id && heart.bvID == _id);
      setHeartIcon(heartFind ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon />);
    };
    updateHeartIcon();
  }, [_id, authState.user, heartArrays]);

  const handleEditBlogClick = useCallback(
    async (blogId) => {
      const response = await handleGetOneBlog(blogId);
      if (response.success) {
        setOpenFormDialogEditBlog(true);
        handleClose();
      }
    },
    [handleGetOneBlog, setOpenFormDialogEditBlog]
  );

  const handleDeleteBlog = useCallback(
    async (blogId) => {
      const response = await handleGetOneBlog(blogId);
      if (response.success) {
        setOpenFormDialogDeleteBlog(true);
        handleClose();
      }
    },
    [handleGetOneBlog, setOpenFormDialogDeleteBlog]
  );

  const handleOpenFormCommentBlog = useCallback(
    async (blogId) => {
      const response = await handleGetOneBlog(blogId);
      if (response.success) {
        setOpenFormDialogCommentBlog(true);
        handleClose();
      }
    },
    [handleGetOneBlog, setOpenFormDialogCommentBlog]
  );

  const handleClickHeart = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    const data = { userID: authState.user._id, bvID: _id };
    try {
      if (heartIcon.props.sx) {
        await handleDeleteHeart(data);
        setHeartLength(prevHeartLength => prevHeartLength - 1);
        setHeartIcon(<FavoriteIcon />);
      } else {
        await handleCreateHeart(data);
        setHeartLength(prevHeartLength => prevHeartLength + 1);
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

  const truncatedContent = expanded ? content : `${content.slice(0, 50)}...`;

  return (
    <Card sx={{ my: '1rem' }}>
      <CardHeader
        avatar={<Avatar src={user?.avatar} />}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${user?.firstName} ${user?.lastName}`}
        subheader={fDateTime(createdAt)}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {authState?.user?._id === user?._id && (
          <Box>
            <MenuItem onClick={() => handleEditBlogClick(blog)}>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Sửa bài viết" />
            </MenuItem>
            <MenuItem onClick={handleDeleteBlog}>
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <ListItemText primary="Xoá bài viết" />
            </MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleClose}>
          <ListItemIcon><FlagCircleIcon /></ListItemIcon>
          <ListItemText primary="Báo cáo bài viết" />
        </MenuItem>
      </Menu>
      <CardContent sx={{ pb: '0.2rem' }}>
        <Typography variant="body2" color="text.primary">
          {HTMLReactParser(truncatedContent)}
          {content.length > 50 && (
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
      <CardMedia component="img" height="350" sx={{ p: '0.5rem', borderRadius: '0.4rem', objectFit: 'contain' }} image={url} alt={`${user?.firstName} ${user?.lastName}`} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: '0.5rem' }}>
        <Stack sx={{ flexDirection: 'row' }}>
          <FavoriteIcon sx={{ color: 'red' }} />
          <Typography variant="body1" color="text.secondary" sx={{ mx: '0.2rem' }}>{heartLength}</Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mx: '0.4rem' }}>{commentArrays.length} comments</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mx: '0.4rem' }}>{shareArrays.length} shares</Typography>
        </Stack>
      </Box>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton aria-label="add to favorites" onClick={handleClickHeart}>
          {heartIcon}
        </IconButton>
        <IconButton aria-label="share" onClick={()=>handleOpenFormCommentBlog(blog?._id)}><CommentIcon /></IconButton>
        <IconButton aria-label="share"><ShareIcon /></IconButton>
      </CardActions>
    </Card>
  );
};

PostTabBlogItem.propTypes = {
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

export default PostTabBlogItem;