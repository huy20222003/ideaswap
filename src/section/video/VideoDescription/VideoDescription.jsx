import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import { Box, Typography, Stack, Avatar, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagIcon from '@mui/icons-material/Flag';
//context
import {
  useUser,
  useFollow,
  useVideo,
  useAuth,
  useHeart,
} from '../../../hooks/context';
//utils
import { fDateTime } from '../../../utils/formatTime';
//prop-types
import PropTypes from 'prop-types';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
//sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//---------------------------------------------

const VideoDescription = ({ video }) => {
  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const {
    heartState: { hearts },
    handleGetAllHearts,
  } = useHeart();

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const {
    followState: { follows },
    handleGetAllFollows,
    handleCreateFollow,
    handleDeleteFollow,
  } = useFollow();

  const { authState } = useAuth();

  const { handleUpdateView } = useVideo();
  const navigate = useNavigate();

  // State to track the view count
  const [viewCount, setViewCount] = useState(video?.view || 0);

  useEffect(() => {
    const timer = setInterval(async () => {
      // Check if viewCount is not null before updating
      if (viewCount !== null) {
        const response = await handleUpdateView(video?._id, {
          view: viewCount + 1,
        });
        if (response.success) {
          setViewCount((prevViewCount) => prevViewCount + 1); // Update state
        }
      }
    }, 180000); // Thời gian cập nhật là 5 giây (5000ms)

    // Xóa bộ đếm khi component unmount
    return () => clearInterval(timer);
  }, [handleUpdateView, video?._id, viewCount]); // useEffect sẽ chạy lại mỗi khi viewCount thay đổi

  useEffect(() => {
    handleGetAllUsers();
    handleGetAllFollows();
    handleGetAllHearts();
  }, [handleGetAllFollows, handleGetAllHearts, handleGetAllUsers]);

  const followFind = follows.find(
    (follow) =>
      follow?.userID === video?.userID &&
      follow?.followerID === authState?.user?._id
  );

  const followsFilter = follows.filter(
    (follow) => follow?.userID === video?.userID
  );

  const heartsFilter = hearts.filter((heart) => heart?.bvID === video?._id);

  const truncatedDescription = expanded
    ? video?.description
    : `${video?.description.slice(0, 200)}...`;

  const newVideo = {
    ...video,
    user: users.find((user) => user?._id === video?.userID),
  };

  const handleAddFollow = async () => {
    try {
      const response = await handleCreateFollow({
        followerID: authState?.user?._id,
        userID: video?.userID,
      });
      if (response.success) {
        handleGetAllFollows();
      }
    } catch (error) {
      Swal.fire({
        title: 'Server Error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDeleteFollowById = async () => {
    try {
      const response = await handleDeleteFollow({
        followerID: authState?.user?._id,
        userID: video?.userID,
      });
      if (response.success) {
        handleGetAllFollows();
      }
    } catch (error) {
      Swal.fire({
        title: 'Server Error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  const handleNavigate = (userID) => {
    navigate(`/account/${userID}`);
  };

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <Typography variant="h6">{video?.title}</Typography>
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'column', md: 'row', xl: 'row' },
          mt: '1rem',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: { xs: 'space-between', sm: 'space-between' },
          }}
        >
          <Avatar
            alt={newVideo?.user?.firstName + newVideo?.user?.lastName}
            src={newVideo?.user?.avatar}
          />
          <Stack
            sx={{ ml: '0.5rem', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate(newVideo?.user?._id)}
          >
            <Typography variant="subtitle1">
              {newVideo?.user?.firstName + newVideo?.user?.lastName}
            </Typography>
            <Typography variant="body2">
              {fShortenNumber(followsFilter?.length)}
              {followsFilter?.length > 1 ? ' Followers' : ' Follower'}
            </Typography>
          </Stack>
          {followFind ? (
            <Button
              size="small"
              variant="outlined"
              sx={{
                px: '3rem',
                color: 'primary.main',
                ml: '2rem',
                borderRadius: '2rem',
              }}
              onClick={handleDeleteFollowById}
            >
              Followed
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              sx={{
                px: '3rem',
                color: 'white',
                ml: '2rem',
                borderRadius: '2rem',
              }}
              onClick={handleAddFollow}
            >
              Follow
            </Button>
          )}
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: '0.5rem',
            justifyContent: { xs: 'space-between', sm: 'space-between' },
            mt: { xs: '1rem', sm: '1rem' },
          }}
        >
          <Button
            sx={{
              borderRadius: '2rem',
              px: '2rem',
              py: '0.5rem',
            }}
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
          >
            {fShortenNumber(heartsFilter?.length)}
          </Button>
          <Button
            sx={{
              borderRadius: '2rem',
              px: '2rem',
              py: '0.5rem',
            }}
            variant="outlined"
            startIcon={<FlagIcon />}
          >
            Report
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '1rem', my: '1rem' }}>
        <Typography variant="subtitle2">
          {fShortenNumber(video?.view)} views
        </Typography>
        <Typography variant="subtitle2">
          {fDateTime(video?.createdAt)}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.primary">
        {HTMLReactParser(truncatedDescription)}
        {video?.description.length > 50 && (
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
    </Box>
  );
};

// Define PropTypes
VideoDescription.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
};

export default VideoDescription;
