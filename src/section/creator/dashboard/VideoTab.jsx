//react
import { useState, useCallback, useEffect } from 'react';
//mui
import { Grid, Box, Card, CardContent, Divider } from '@mui/material';
//chart
import Chart from 'react-apexcharts';
//component
import VideoHot from '../../dashboard/VideoHot';
//--------------------------------------------------------

const VideoTab = () => {
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

  useEffect(() => {
    const downloadDataFake = [];
    const viewDataFake = [];
    const commentDataFake = [];

    for (let i = 1; i <= currentDay; i++) {
      const downloadValue = Math.sin((i / currentDay) * Math.PI * 2) * 50 + 50;
      const viewValue = Math.cos((i / currentDay) * Math.PI * 2) * 50 + 25;
      const commentValue = Math.cos((i / currentDay) * Math.PI * 2) * 50 + 50;

      downloadDataFake.push(Math.round(downloadValue));
      viewDataFake.push(Math.round(viewValue));
      commentDataFake.push(Math.round(commentValue));
    }
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
        name: 'Comment',
        data: commentDataFake,
      },
    ]);
  }, [currentDay]);

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: getDaysFromStartOfMonth(),
    },
  };


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
                height="350"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card sx={{ mx: '0.5rem' }}>
            <CardContent>
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

export default VideoTab;
