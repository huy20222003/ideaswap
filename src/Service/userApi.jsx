import axiosConfig from "./axiosConfig";

const userApi = {
    getAll: ()=> {
        const url = '/user';
        return axiosConfig.get(url);
    },
    getById: (userId)=> {
        const url = `/user/${userId}`;
        return axiosConfig.get(url);
    },
    update: (userId, data)=> {
        const url = `/user/update/${userId}`;
        return axiosConfig.put(url, data);
    },
}

export default userApi;