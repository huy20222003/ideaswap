//react
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { styled, Box, Avatar, Stack, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//context
import { useUser, useRole } from '../../../hooks/context';
//utils
import { fDateTime } from '../../../utils/formatTime';
//-------------------------------------------------------

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

const VideoCommentItem = ({ comment }) => {
  const {
    userState: { user, users },
    handleGetAllUsers,
    handleGetUserById,
  } = useUser();

  const {
    roleState: { role },
    handleGetRoleById,
  } = useRole();

  const [roleLoaded, setRoleLoaded] = useState(false);

  useEffect(() => {
    comment?.userID && handleGetUserById(comment?.userID);
    user?.roleID && handleGetRoleById(user?.roleID);
  }, [comment?.userID, handleGetRoleById, handleGetRoleById]);

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  useEffect(() => {
    if (!roleLoaded && role) {
      setRoleLoaded(true);
    }
  }, [role, roleLoaded]);

  const userComment = users?.find((user) => user?._id === comment?.userID);

  return (
    <Box sx={{ p: '0.5rem', my: '0.5rem' }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Avatar alt="Avatar" src={userComment?.avatar} />
        </Box>
        <Box sx={{ flex: 1, ml: '1rem' }}>
          <Stack>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '0.25rem',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">
                {userComment?.firstName} {userComment?.lastName}
              </Typography>
              {roleLoaded && role?.name === 'creator' && (
                <CheckCircleIcon sx={{ color: '#3366FF', fontSize: '1rem' }} />
              )}
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {fDateTime(comment?.createdAt)}
              </Typography>
            </Stack>

            <Typography variant="body2">{comment.content}</Typography>
            <LightTooltip title="Report" placement="right">
              <FlagIcon color="primary" sx={{ cursor: 'pointer' }} />
            </LightTooltip>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

// Define PropTypes for props validation
VideoCommentItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCommentItem;
