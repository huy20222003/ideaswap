//react
import { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { styled, Box, Avatar, Stack, Typography, Card } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
//context
import { useUser } from '../../../../hooks/context';
//utils
import { fDateTime } from '../../../../utils/formatTime';
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

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  const userComment = users?.find((user) => user?._id === comment?.userID);

  return (
    <Card sx={{ p: '0.5rem', my: '0.5rem' }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Avatar alt="Avatar" src={userComment?.avatar} />
        </Box>
        <Box sx={{ flex: 1, ml: '1rem' }}>
          <Stack>
            <Stack sx={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                {userComment?.firstName + userComment?.lastName}
              </Typography>
              <Typography variant="body2" sx={{fontSize: '0.8rem'}}>
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
    </Card>
  );
};

// Define PropTypes for props validation
FormDialogCommentItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormDialogCommentItem;
