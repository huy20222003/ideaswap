import axiosConfig from './axiosConfig';

const notificationApi = {
  getAll: () => {
    const url = '/notification';
    return axiosConfig.get(url);
  },
  update: (notificationId, data) => {
    const url = `/notification/update/${notificationId}`;
    return axiosConfig.put(url, data);
  },
};

export default notificationApi;
