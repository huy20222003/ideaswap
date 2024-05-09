import { GET_ALL_SHARES } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_SHARES,
        payload
    }
}