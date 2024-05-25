import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../Components/iconify';
import Scrollbar from '../../../Components/scrollbar';
//context
import { useNotification, useAuth } from '../../../hooks/context';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const {
    notificationState: { notifications },
    handleGetAllNotifications,
  } = useNotification();

  const {
    authState: { user, isAuthenticated }
  } = useAuth();

  useEffect(() => {
    isAuthenticated && handleGetAllNotifications();
  }, [handleGetAllNotifications, isAuthenticated]);

  const notificationByUserId = notifications.filter(
    (item) => item?.userID === user?._id
  );

  const totalUnRead = notificationByUserId.filter(
    (item) => item.isUnRead === true
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    // setNotifications(
    //   notifications.map((notification) => ({
    //     ...notification,
    //     isUnRead: false,
    //   }))
    // );
  };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" sx={{ color: 'white' }} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                New
              </ListSubheader>
            }
          >
            {notificationByUserId.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notificationByUserId
              .slice(2, notificationByUserId.length)
              .map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    imageUrl: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { imageUrl, description } = renderContent(notification);
  const { handleUpdateNotifications } = useNotification();

  const handleUpdateRead = async () => {
    await handleUpdateNotifications(notification?._id, { isUnRead: false });
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={handleUpdateRead}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{imageUrl}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={description}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const description = (
    <Typography
      component="span"
      variant="body2"
      sx={{ color: 'text.secondary' }}
    >
      {notification.description}
    </Typography>
  );
  return {
    imageUrl: notification.imageUrl ? (
      <img alt={notification.description} src={notification.imageUrl} />
    ) : null,
    description,
  };
}
