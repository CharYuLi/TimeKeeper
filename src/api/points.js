import { sendRequest } from '../axiosConfig.js';

// 获取用户积分
export const loadUserPoints = async (points) => {
  return await sendRequest('/points-system/points', 'get', points);
};

// 获取积分排行榜
export const loadPointsRank = async (rank) => {
  return await sendRequest('/points-system/rank', 'get', rank);
};

// 获取积分获取记录
export const loadPointsGainRecords = async (gainRecords) => {
  return await sendRequest('/points-system/gain-records', 'get', gainRecords);
};

// 获取商品列表
export const loadProductList = async (productList) => {
  return await sendRequest('/points-system/product-list', 'get', productList);
}

// 商品兑换接口（根据商品名）
export const exchangeProduct = async (token, productName) => {
  return await sendRequest('/points-system/exchange', 'get', { token, productName });
}

// 给小朋友加分
export const gainPointsForchild = async (gainPoints) => {
  return await sendRequest('/points-system/gain-points', 'post', gainPoints);
}