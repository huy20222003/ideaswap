//react
import { useState, useEffect } from 'react';
//react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Card,
  Stack,
  Avatar,
  Tab,
  Typography,
  Button,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//component
import PostTab from './PostTab';
import FollowingTab from './FollowingTab';
import VideoTab from './VideoTab';
//context
import { useUser, useAuth } from '../../hooks/context';
//---------------------------------------------------

const AccountActionTabs = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { authState } = useAuth();

  const { _id } = useParams();
  const navigate = useNavigate();

  const {
    userState: { user },
    handleGetUserById,
  } = useUser();

  useEffect(() => {
    _id && handleGetUserById(_id);
  }, [_id, handleGetUserById]);

  const handleNavigate = () => {
    navigate('/setting/profile');
  };

  return (
    <Card>
      <Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            bgcolor: 'primary.main',
          }}
        >
          <Stack sx={{ gap: '2rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                p: '1rem',
              }}
            >
              <Avatar
                alt={user?.firstName + user?.lastName}
                src={user?.avatar}
                sx={{ width: '8rem', height: '8rem' }}
              />
              <Stack>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#fff' }}>
                    {user?.firstName + user?.lastName}
                  </Typography>
                  <CheckCircleIcon sx={{ color: '#3366FF' }} />
                </Stack>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                  {fShortenNumber(200000)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {authState?.user?._id === _id ? (
            <Stack
              sx={{
                justifyContent: 'flex-start',
                display: { xs: 'none', sm: 'none' },
              }}
            >
              <Button
                variant="contained"
                size="medium"
                startIcon={<EditIcon sx={{ color: '#fff' }} />}
                sx={{ color: '#fff', mt: '2rem', mr: '2rem' }}
                onClick={handleNavigate}
              >
                Update Profile
              </Button>
            </Stack>
          ) : (
            ''
          )}
        </Stack>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Following" value="2" />
                <Tab label="Video" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PostTab />
            </TabPanel>
            <TabPanel value="2">
              <FollowingTab />
            </TabPanel>
            <TabPanel value="3">
              <VideoTab />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Card>
  );
};

export default AccountActionTabs;
