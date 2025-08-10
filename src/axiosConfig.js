import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
  (config) => {
    const token = uni.getStorageSync('jwt')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sendRequest = async (url, method = "post", data = null) => {
  try {
    let response;
    if (method.toLowerCase() === "get") {
      response = api.get(url, { params: data });
    } else {
      response = api[method](url, data);
    }
    if (response.status === 200) {
      if (response.data.code === 100000) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.msg }
      }
    } else if (response.status === 401) {
      return { success: false, message: '未授权, 请先登录' };
    } else if (response.status === 403) {
      return { success: false, message: '无权限, 您没有此权限' };
    } else if (response.status === 404) {
      return { success: false, message: '请求的资源未找到' };
    } else {
      return { success: false, message: '发生未知错误' };
    }
  } catch (error) {
    console.error('请求失败：', error)
    return {
      success: false,
      message: error.response?.data?.message || '网络请求失败，请稍后再试'
    };
  }
};

export { api, sendRequest };