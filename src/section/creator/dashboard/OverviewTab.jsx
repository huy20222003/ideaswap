import { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import Chart from 'react-apexcharts';
import { fShortenNumber } from '../../../utils/formatNumber';
import { useVideo, useFollow, useAuth } from '../../../hooks/context';
import VideoHot from '../dashboard/VideoHot';

const OverviewTab = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();
  const {
    authState: { user },
  } = useAuth();

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const [series, setSeries] = useState([]);

  const getDaysFromStartOfMonth = useCallback(() => {
    const daysArray = [];
    for (let i = 1; i <= currentDay; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [currentDay]);

  const followData = follows.filter((follow) => follow?.userID === user?._id);

  const getFollowDataByDay = useCallback(() => {
    const followDataByDay = new Array(currentDay).fill(0);
    followData.forEach((follow) => {
      const followDate = new Date(follow.createdAt);
      const followDay = followDate.getDate();
      followDataByDay[followDay - 1]++;
    });
    return followDataByDay;
  }, [currentDay, followData]);

  useEffect(() => {
    const downloadDataFake = [];
    const viewDataFake = [];

    for (let i = 1; i <= currentDay; i++) {
      const downloadValue = Math.sin((i / currentDay) * Math.PI * 2) * 50 + 50;
      const viewValue = Math.cos((i / currentDay) * Math.PI * 2) * 50 + 50;

      downloadDataFake.push(Math.round(downloadValue));
      viewDataFake.push(Math.round(viewValue));
    }

    const followDataByDay = getFollowDataByDay();
    setSeries([
      {
        name: 'Count Downloads',
        data: downloadDataFake,
      },
      {
        name: 'View',
        data: viewDataFake,
      },
      {
        name: 'Follower',
        data: followDataByDay,
      },
    ]);
  }, [currentDay, getFollowDataByDay]);

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllVideo();
  }, [handleGetAllFollows, handleGetAllVideo]);

  const videosFilterByUserID = videos.filter(
    (video) => video?.userID === user?._id
  );

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: getDaysFromStartOfMonth(),
    },
  };

  const totalViews = videosFilterByUserID?.reduce(
    (accumulator, currentValue) => {
      if (currentValue.view) {
        return accumulator + currentValue.view;
      } else {
        return accumulator;
      }
    },
    0
  );

  return (
    <Box>
      <Grid container>
        <Grid item md={8}>
          <Card sx={{ mx: '0.5rem' }}>
            <CardContent>
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card sx={{ mx: '0.5rem' }}>
            <CardContent>
              <Box>
                <Typography variant="subtitle1">Real Time</Typography>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      my: '0.5rem',
                      mr: '0.5rem',
                    }}
                  ></Box>
                  <Typography variant="body2">Real Time</Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Stack gap="0.5rem">
                  <Typography variant="subtitle1">
                    {fShortenNumber(followData?.length)}
                  </Typography>
                  <Typography variant="body2">Followers</Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Stack gap="0.5rem">
                  <Typography variant="subtitle1">
                    {fShortenNumber(totalViews)}
                  </Typography>
                  <Typography variant="body2">Views</Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Box sx={{ mt: '-5rem' }}>
                  <VideoHot />
                </Box>
              </Box>
              <Divider />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewTab;
