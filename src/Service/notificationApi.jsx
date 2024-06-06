import axiosConfig from './axiosConfig';

const notificationApi = {
  getAll: () => {
    const url = '/notification';
    return axiosConfig.get(url);
  },
  update: (data) => {
    const url = `/notification/update`;
    return axiosConfig.put(url, data);
  },
};

export default notificationApi;
