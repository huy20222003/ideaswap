import axiosConfig from "./axiosConfig";

const shareApi = {
    getAll: ()=> {
        const url = '/share';
        return axiosConfig.get(url);
    },
}

export default shareApi;