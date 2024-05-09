import {
  ADD_COURSE,
  DELETE_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
} from './constants';

export const initCourseState = {
  course: null,
  courses: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case GET_COURSE_BY_ID:
      return {
        ...state,
        course: payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case UPDATE_COURSE:
      const newCourses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );

      return {
        ...state,
        courses: newCourses,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
