import { useEffect } from 'react';
//mui
import { Container, Box } from '@mui/material';
//component
import { CourseNew, CourseTop, Courses } from '../../section/course';
import { useCourse } from '../../hooks/context';
//------------------------------------------------------------

const CoursePage = () => {
  document.title = 'Course';
  const {
    courseState: { courses },
    handleGetAllCourses,
  } = useCourse();

  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  const courseNewFilter = courses.filter((course) => {
    const createdAtDate = new Date(course.createdAt);
    return createdAtDate >= oneMonthAgo && createdAtDate <= now;
  });

  const courseTopFilter = courses.sort((a, b) => b.view - a.view);

  return (
    <Container maxWidth="md" sx={{ mt: '5rem' }}>
      <Box>
        <CourseNew courseNewFilter={courseNewFilter} />
      </Box>
      <Box>
        <CourseTop courseTopFilter={courseTopFilter} />
      </Box>
      <Box>
        <Courses courses={courses} />
      </Box>
    </Container>
  );
};

export default CoursePage;
