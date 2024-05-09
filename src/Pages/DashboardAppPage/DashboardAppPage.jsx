// @mui
import { Container, Box } from '@mui/material';
//component
import Slider from '../../section/dashboard/Slider';
import PostBlog from '../../section/dashboard/PostBlog';
import Blog from '../../section/dashboard/Blog';
// ----------------------------------------------------------------------

const DashboardAppPage = () => {
  document.title = 'Dashboard';
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Slider />
        </Box>
        <Box>
          <PostBlog />
        </Box>
        <Box>
          <Blog />
        </Box>
      </Container>
    </>
  );
};

export default DashboardAppPage;
