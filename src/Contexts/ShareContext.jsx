import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initShareState,
  reducer,
} from '../Reducers/ShareReducer/reducer';
import {
  getAll,
} from '../Reducers/ShareReducer/action';
//api
import shareApi from '../Service/shareApi';

export const ShareContext = createContext();

export const ShareProvider = (prop) => {
    const [shareState, dispatch] = useReducer(reducer, initShareState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };
  
    const handleGetAllShares = useCallback(async () => {
      try {
        const response = await shareApi.getAll();
        if (response.data.success) {
          dispatch(getAll(response.data.shares));
        }
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const shareData = {
      shareState,
      handleGetAllShares,
    };
  
    return (
      <ShareContext.Provider value={shareData}>
        {prop.children}
      </ShareContext.Provider>
    );
  };
  