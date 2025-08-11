// utils/request.js   （原 axiosConfig.js 改名）
const BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.191:8080'

const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    // 默认配置
    const defaultOpt = {
      url: '',
      method: 'POST',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    }

    // 合并用户配置
    const opt = Object.assign({}, defaultOpt, options)

    // 统一注入 token
    const token = uni.getStorageSync('jwt')
    if (token) {
      opt.header.Authorization = `Bearer ${token}`
    }

    // 发送请求
    uni.request({
      ...opt,
      url: BASE_URL + opt.url,
      success: ({ statusCode, data }) => {
        // 统一业务错误码处理
        if (statusCode === 200) {
          if (data.code === 100000) {
            resolve({ success: true, data: data.data })
          } else {
            resolve({ success: false, message: data.msg || '业务异常' })
          }
        } else if (statusCode === 401) {
          resolve({ success: false, message: '未授权，请先登录' })
        } else if (statusCode === 403) {
          resolve({ success: false, message: '无权限，您没有此权限' })
        } else if (statusCode === 404) {
          resolve({ success: false, message: '请求的资源未找到' })
        } else {
          resolve({ success: false, message: '发生未知错误' })
        }
      },
      fail: (err) => {
        console.error('请求失败：', err)
        reject({ success: false, message: '网络请求失败，请稍后再试' })
      }
    })
  })
}

// 保持原来的 sendRequest 签名，方便全局替换
export const sendRequest = (url, method = 'post', data = null) =>
  request({ url, method, data })

export default request