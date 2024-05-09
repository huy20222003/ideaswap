import { GET_ALL_USERS, GET_USER_BY_ID, UPDATE_USER } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_USERS,
        payload
    }
}

export const getById = (payload)=> {
    return {
        type: GET_USER_BY_ID,
        payload
    }
}

export const update = (payload)=> {
    return {
        type: UPDATE_USER,
        payload
    }
}