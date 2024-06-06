import { GET_ALL_NOTIFICATIONS, UPDATE_NOTIFICATION } from './constants';

export const initNotificationState = {
  notification: null,
  notifications: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
