import { GET_ALL_NOTIFICATIONS, UPDATE_NOTIFICATION } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_NOTIFICATIONS,
        payload
    }
}


export const updateNotification = (payload)=> {
    return {
        type: UPDATE_NOTIFICATION,
        payload
    }
}