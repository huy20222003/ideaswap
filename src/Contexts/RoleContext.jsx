import { createContext, useCallback, useReducer } from 'react';
//reducer
import {
  initRoleState,
  reducer,
} from '../Reducers/RoleReducer/reducer';
import {
  getById,
} from '../Reducers/RoleReducer/action';
//api
import roleApi from '../Service/roleApi';

export const RoleContext = createContext();

export const RoleProvider = (prop) => {
    const [roleState, dispatch] = useReducer(reducer, initRoleState);
  
    const handleError = (error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    };

    const handleGetRoleById = useCallback(async (roleId) => {
      try {
        const response = await roleApi.getById(roleId);
        if (response.data.success) {
          dispatch(getById(response.data.role));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);
  
    const roleData = {
      roleState,
      handleGetRoleById,
    };
  
    return (
      <RoleContext.Provider value={roleData}>
        {prop.children}
      </RoleContext.Provider>
    );
  };
  