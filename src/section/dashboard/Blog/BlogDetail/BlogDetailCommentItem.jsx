//react
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { styled, Box, Avatar, Stack, Typography, Card } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//context
import { useUser, useRole, useAuth } from '../../../../hooks/context';
//utils
import { fToNow } from '../../../../utils/formatTime';
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

const BlogDetailCommentItem = ({ comment }) => {
  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const {
    roleState: { roles },
    handleGetAllRoles,
  } = useRole();
  const {
    authState: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const userComment = users?.find((user) => user?._id === comment?.userID);
  useEffect(() => {
    isAuthenticated && handleGetAllRoles();
  }, [isAuthenticated, handleGetAllRoles]);

  const newUser = {
    ...userComment,
    roleName: roles.find((role) => role?._id === userComment?.roleID),
  };

  const truncatedContent =
    comment.content.length > 30
      ? expanded
        ? comment.content
        : `${comment.content.slice(0, 30)}...`
      : comment.content;

  return (
    <Card sx={{ p: '0.5rem', my: '0.5rem' }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Avatar alt="Avatar" src={userComment?.avatar} />
        </Box>
        <Box sx={{ flex: 1, ml: '1rem' }}>
          <Stack>
            <Stack
              sx={{ flexDirection: 'row', gap: '0.25rem', alignItems: 'center' }}
            >
              <Typography variant="subtitle1">
                {userComment?.firstName + userComment?.lastName}
              </Typography>
              {newUser?.roleName?.name === 'creator' && (
                <LightTooltip title="Creator" placement="right">
                  <CheckCircleIcon
                    sx={{ color: '#3366FF', fontSize: '1rem' }}
                  />
                </LightTooltip>
              )}
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {fToNow(comment?.createdAt)}
              </Typography>
            </Stack>
            <Typography variant="body2">
              {truncatedContent}
              {comment.content.length > 300 && (
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
            <LightTooltip title="Report" placement="right">
              <FlagIcon color="primary" sx={{ cursor: 'pointer' }} />
            </LightTooltip>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

// Define PropTypes for props validation
BlogDetailCommentItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogDetailCommentItem;
