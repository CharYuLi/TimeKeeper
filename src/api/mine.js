import { sendRequest } from '../axiosConfig.js';

// 注册用户
export const registerWX = async (loginRequest) => {
  return await sendRequest('/register/wx', 'post', loginRequest);
};