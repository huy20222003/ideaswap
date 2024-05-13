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
//---------------------------------------------

const VideoDescription = ({ video }) => {
  const {
    userState: { user },
    handleGetUserById,
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

  useEffect(() => {
    const timer = setInterval(async () => {
      // Tăng số lượng lượt xem sau mỗi khoảng thời gian
      await handleUpdateView(video?._id, { view: video?.view + 1 });
    }, 60000); // Thời gian cập nhật là 1 giây (1000ms)

    // Xóa bộ đếm khi component unmount
    return () => clearInterval(timer);
  }, [handleUpdateView, video?._id, video?.view]); // useEffect sẽ chạy lại mỗi khi viewCount thay đổi

  useEffect(() => {
    video?.userID && handleGetUserById(video?.userID);
    handleGetAllFollows();
    handleGetAllHearts();
  }, [
    handleGetUserById,
    video?.userID,
    handleGetAllFollows,
    handleGetAllHearts,
  ]);

  const followFind = follows.find(
    (follow) =>
      follow?.userID === video?.userID &&
      follow?.followerID === authState?.user?._id
  );

  const followsFilter = follows.filter(
    (follow) => follow?.userID === video?.userID
  );

  const heartsFilter = hearts.filter((heart) => heart?.bvID === video?._id);

  const truncatedDescription =
    video?.description && video?.description.length > 200
      ? `${video?.description.slice(0, 200)}...`
      : video?.description;

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
          flexDirection: 'row',
          mt: '1rem',
        }}
      >
        <Stack sx={{ flexDirection: 'row' }}>
          <Avatar alt={user?.firstName + user?.lastName} src={user?.avatar} />
          <Stack
            sx={{ ml: '0.5rem', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate(user?._id)}
          >
            <Typography variant="subtitle1">
              {user?.firstName + user?.lastName}
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
        <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
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
      <Typography variant="body2">
        {expanded ? video?.description : truncatedDescription}
        {video?.description.length > 200 && (
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
