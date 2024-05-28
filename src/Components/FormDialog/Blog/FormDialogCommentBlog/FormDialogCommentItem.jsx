//react
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { styled, Box, Avatar, Stack, Typography, Card } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
//context
import {
  useUser,
  useRole,
  useAuth,
  useComment,
} from '../../../../hooks/context';
//utils
import { fToNow } from '../../../../utils/formatTime';
//component
import FormDialogReplyComment from './FormDialogReplyComment';
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

const FormDialogCommentItem = ({ comment }) => {
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

  const { handleGetAllComments } = useComment();

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const [showReplyComment, setShowReplyComment] = useState(false); // Trạng thái để kiểm soát hiển thị VideoReplyComment
  const [selectedCommentId, setSelectedCommentId] = useState(null); // Trạng thái lưu trữ _id của comment được chọn

  const handleToggleReplyComment = (commentId) => {
    if (selectedCommentId === commentId) {
      setSelectedCommentId(null); // Nếu comment đã được chọn trước đó, xoá _id
    } else {
      setSelectedCommentId(commentId); // Nếu comment chưa được chọn hoặc là một comment khác, cập nhật _id
    }
    setShowReplyComment((prev) => !prev); // Đảo ngược trạng thái hiển thị
  };

  const userComment = users?.find((user) => user?._id === comment?.userID);
  useEffect(() => {
    isAuthenticated && handleGetAllRoles();
  }, [isAuthenticated, handleGetAllRoles]);

  const newUser = {
    ...userComment,
    roleName: roles.find((role) => role?._id === userComment?.roleID),
  };

  useEffect(() => {
    // Listen for changes in comments and update the UI when new comments are added
    handleGetAllComments();
  }, [handleGetAllComments]);

  const truncatedContent =
    comment.content.length > 30
      ? expanded
        ? comment.content
        : `${comment.content.slice(0, 300)}...`
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
              sx={{
                flexDirection: 'row',
                gap: '0.25rem',
                alignItems: 'center',
              }}
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
            <Stack sx={{ flexDirection: 'row', gap: '2rem' }}>
              <LightTooltip title="Report" placement="right">
                <FlagIcon color="primary" sx={{ cursor: 'pointer' }} />
              </LightTooltip>
              <LightTooltip title="Reply" placement="right">
                <CommentIcon
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleToggleReplyComment(comment._id)} // Khi click vào icon "Reply", truyền _id của comment
                />
              </LightTooltip>
            </Stack>
            {showReplyComment && selectedCommentId === comment._id && (
              <FormDialogReplyComment
                commentId={comment._id}
                bvID={comment?.bvID}
                handleToggleReplyComment={handleToggleReplyComment}
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

// Define PropTypes for props validation
FormDialogCommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    bvID: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormDialogCommentItem;
