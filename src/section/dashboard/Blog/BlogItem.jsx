import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  styled,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';
import { fDateTime } from '../../../utils/formatTime';
import {
  useAuth,
  useCommon,
  useHeart,
  useBlog,
  useRole,
  useShare,
} from '../../../hooks/context';
import HTMLReactParser from 'html-react-parser';
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

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

const BlogItem = ({ blog }) => {
  const {
    _id,
    content,
    url,
    createdAt,
    heartArrays,
    shareArrays,
    commentArrays,
    user,
  } = blog;
  const { handleCreateShare, handleGetAllShares } = useShare();
  const { t } = useTranslation('blogs');

  const [expanded, setExpanded] = useState(false);
  const { authState } = useAuth();
  const { setOpenFormDialogEditBlog } = useCommon();
  const {
    setOpenFormDialogDeleteBlog,
    setOpenFormDialogCommentBlog,
    handleGetOneBlog,
  } = useBlog();
  const navigate = useNavigate();
  const [heartIcon, setHeartIcon] = useState(<FavoriteIcon />);
  const { handleCreateHeart, handleDeleteHeart, handleGetAllHearts } =
    useHeart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [heartLength, setHeartLength] = useState(heartArrays.length);

  const toggleExpand = () => setExpanded(!expanded);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {
    roleState: { roles },
    handleGetAllRoles,
  } = useRole();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    authState?.isAuthenticated && handleGetAllRoles();
  }, [authState?.isAuthenticated, handleGetAllRoles]);

  const newUser = {
    ...user,
    roleName: roles.find((role) => role?._id === user?.roleID),
  };

  useEffect(() => {
    handleGetAllShares();
  }, [handleGetAllShares]);

  useEffect(() => {
    const updateHeartIcon = () => {
      const heartFind = heartArrays.find(
        (heart) => heart?.userID === authState.user?._id && heart.bvID === _id
      );
      setHeartIcon(
        heartFind ? <FavoriteIcon sx={{ color: '#54D62C' }} /> : <FavoriteIcon />
      );
    };
    updateHeartIcon();
  }, [_id, authState.user, heartArrays]);

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

  const handleNavigate = (userID) => {
    navigate(`/account/${userID}`);
  };

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
        setHeartLength((prevHeartLength) => prevHeartLength - 1);
        setHeartIcon(<FavoriteIcon />);
        handleGetAllHearts();
      } else {
        await handleCreateHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength + 1);
        setHeartIcon(<FavoriteIcon sx={{ color: 'red' }} />);
        handleGetAllHearts();
      }
    } catch (error) {
      Swal.fire({
        title: t('Error'),
        text: t(
          'An error occurred while processing your action. Please try again later.'
        ),
        icon: 'error',
      });
    }
  };

  const handleNavigateBlogDetail = (blogId) => {
    navigate(`/dashboard/blog/${blogId}`);
  };

  const handleCopyToClipboard = () => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.protocol}//${url.host}`;
    const fullUrl = `${baseUrl}/dashboard/blog/${_id}`;
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

  const truncatedContent = expanded ? content : `${content.slice(0, 100)}...`;

  return (
    <Card sx={{ my: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar
            src={user?.avatar}
            onClick={() => handleNavigate(user?._id)}
            style={{ cursor: 'pointer' }}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              onClick={() => handleNavigate(user?._id)}
              style={{ cursor: 'pointer', marginRight: '0.25rem' }}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
            {newUser?.roleName?.name == 'creator' && (
              <LightTooltip title={t('Creator')} placement="right">
                <CheckCircleIcon sx={{ color: '#3366FF', fontSize: '1rem' }} />
              </LightTooltip>
            )}
          </div>
        }
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
            <MenuItem onClick={() => handleEditBlogClick(_id)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary={t('Edit Blog')} />
            </MenuItem>
            <MenuItem onClick={() => handleDeleteBlog(_id)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary={t('Delete Blog')} />
            </MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FlagCircleIcon />
          </ListItemIcon>
          <ListItemText primary={t('Report Blog')} />
        </MenuItem>
      </Menu>
      <CardContent sx={{ pb: '0.2rem' }}>
        <Typography variant="body2" color="text.primary">
          {HTMLReactParser(truncatedContent)}
          {content.length > 100 && (
            <Typography
              variant="body2"
              color="text.secondary"
              onClick={toggleExpand}
              sx={{ cursor: 'pointer', display: 'inline' }}
            >
              {expanded ? t('Show less') : '...' + t('Show more')}
            </Typography>
          )}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="350"
        sx={{
          p: '0.5rem',
          borderRadius: '0.4rem',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
        image={url}
        alt={`${user?.firstName} ${user?.lastName}`}
        onClick={() => handleNavigateBlogDetail(_id)}
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
          <FavoriteIcon sx={{ color: '#54D62C' }} />
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
            {commentArrays.length}{' '}
            {commentArrays.length > 1 ? t('comments') : t('comment')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mx: '0.4rem' }}
          >
            {shareArrays.length}{' '}
            {shareArrays.length > 1 ? t('shares') : t('share')}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton aria-label="add to favorites" onClick={handleClickHeart}>
          {heartIcon}
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => handleOpenFormCommentBlog(blog?._id)}
        >
          <CommentIcon />
        </IconButton>
        <LightTooltip
          title={t('URL copied to clipboard!')}
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
  );
};

BlogItem.propTypes = {
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

export default memo(BlogItem);
