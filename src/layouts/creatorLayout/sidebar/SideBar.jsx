//mui
import { Box, Card, Avatar, Typography, List, Divider } from '@mui/material';
//context
import { useAuth } from '../../../hooks/context';
//component
import {
  MainListItems,
  SecondaryListItems,
} from '../../../Components/ListItem/ListItem';
//----------------------------------------------------------------

const SideBar = () => {
  const {
    authState: { user },
  } = useAuth();
  return (
    <Card
      sx={{
        my: '4rem',
        height: '50rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '10rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={user?.firstName + user?.lastName}
          src={user?.avatar}
          sx={{ width: 100, height: 100, mb: '1rem' }}
        />
        <Typography variant="body1">
          {user?.firstName + ' ' + user?.lastName}
        </Typography>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          <SecondaryListItems />
        </List>
      </Box>
    </Card>
  );
};

export default SideBar;
