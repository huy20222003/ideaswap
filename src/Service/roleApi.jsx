import axiosConfig from "./axiosConfig";

const roleApi = {
    getById: (roleId)=> {
        const url = `/role/${roleId}`;
        return axiosConfig.get(url);
    },
}

export default roleApi;