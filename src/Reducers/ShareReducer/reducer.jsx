import { GET_ALL_SHARES } from "./constants";

export const initShareState = {
    share: null,
    shares: [],
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_SHARES:
        return {
          ...state,
          shares: payload,
        };
      default:
        return {
          ...state,
        };
    }
  };