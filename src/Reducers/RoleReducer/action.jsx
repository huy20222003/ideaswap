import { GET_ROLE_BY_ID } from "./constants"



export const getById = (payload)=> {
    return {
        type: GET_ROLE_BY_ID,
        payload
    }
}

