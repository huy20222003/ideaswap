import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initNotificationState,
  reducer,
} from '../Reducers/NotificationReducer/reducer';
import {
  getAll,
  updateNotification,
} from '../Reducers/NotificationReducer/action';
//api
import notificationApi from '../Service/notificationApi';

export const NotificationContext = createContext();

export const NotificationProvider = (prop) => {
  const [notificationState, dispatch] = useReducer(
    reducer,
    initNotificationState
  );

  const handleError = useCallback((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }, []);

  const handleGetAllNotifications = useCallback(async () => {
    try {
      const response = await notificationApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.notifications));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const handleUpdateNotifications = useCallback(
    async (data) => {
      try {
        const response = await notificationApi.update(data);
        if (response.data.success) {
          dispatch(updateNotification(response.data.notifications));
        }
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const notificationData = {
    notificationState,
    handleGetAllNotifications,
    handleUpdateNotifications,
  };

  return (
    <NotificationContext.Provider value={notificationData}>
      {prop.children}
    </NotificationContext.Provider>
  );
};
