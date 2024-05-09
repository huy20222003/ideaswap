import {
  GET_ROLE_BY_ID
} from './constants';

export const initRoleState = {
  role: null,
  roles: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ROLE_BY_ID:
      return {
        ...state,
        role: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
