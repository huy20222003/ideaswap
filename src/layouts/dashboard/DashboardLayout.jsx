//mui
import { Box, Grid } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Header from './header';
import Banner from './banner';
import VideoHot from '../../section/dashboard/VideoHot';
import Footer from './footer';
//-------------------------------------------------

const DashboardLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box>
        <Grid container>
          <Grid item xl={3}>
            <Banner />
          </Grid>
          <Grid item xl={6} md={6} xs={12} sm={12}>
            <Outlet />
          </Grid>
          <Grid item xl={3}>
            <VideoHot />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
