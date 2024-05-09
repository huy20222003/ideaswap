//mui
import { Box, Card, Typography, Grid } from '@mui/material';
//component
import CourseItem from './CourseItem';
//propType
import PropTypes from 'prop-types';
//--------------------------------------------------------

const CourseNew = ({courseNewFilter}) => {
  return (
    <Box sx={{mb: '1rem'}}>
      <Card sx={{ bgcolor: 'primary.main', p: '0.5rem 1rem', borderRadius: '0.4rem' }}>
        <Typography variant="subtitle1" sx={{color: 'white'}}>Course New</Typography>
      </Card>
      <Grid container>
        {courseNewFilter.map((course) => (
          <Grid key={course._id} item xl={4} md={6} sm={12} xs={12}>
            <CourseItem
              _id={course._id}
              imageUrl={course.imageUrl}
              title={course.title}
              description={course.description}
              view={course.view}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

CourseNew.propTypes = {
  courseNewFilter: PropTypes.array.isRequired
};

export default CourseNew;
