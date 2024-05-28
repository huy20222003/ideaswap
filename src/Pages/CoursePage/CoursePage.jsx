import { useEffect, useState, useCallback } from 'react';
import { Container, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CourseNew, CourseTop, Courses } from '../../section/course';
import { useCourse } from '../../hooks/context';

const CoursePage = () => {
  document.title = 'Course';
  const {
    courseState: { courses },
    handleSearchCourses,
  } = useCourse();

  const [searchTerm, setSearchTerm] = useState('');
  const [courseNew, setCourseNew] = useState([]);
  const [courseTop, setCourseTop] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      await handleSearchCourses(searchTerm);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, handleSearchCourses]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch]);

  useEffect(() => {
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const courseNewFilter = courses.filter((course) => {
      const createdAtDate = new Date(course.createdAt);
      return createdAtDate >= oneMonthAgo && createdAtDate <= now;
    });
    setCourseNew(courseNewFilter);

    const courseTopFilter = courses
      .filter((course) => !courseNewFilter.includes(course))
      .sort((a, b) => b.view - a.view);
    setCourseTop(courseTopFilter);
  }, [courses]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: '5rem' }}>
      <Box sx={{ width: '100%', mb: '2rem' }}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          sx={{ bgcolor: 'white', borderRadius: '0.5rem' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: "Search for courses"
          }}
          value={searchTerm}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <CourseNew courseNewFilter={courseNew} />
      </Box>
      <Box>
        <CourseTop courseTopFilter={courseTop} />
      </Box>
      <Box>
        <Courses
          courses={courses.filter(
            (course) =>
              !courseNew.includes(course) && !courseTop.includes(course)
          )}
        />
      </Box>
    </Container>
  );
};

export default CoursePage;
