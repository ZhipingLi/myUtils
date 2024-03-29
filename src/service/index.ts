import CustomedRequest from './request'
import { BASE_URL, TIME_OUT } from './config/index'

const requestInstance = new CustomedRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 针对该实例的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

// export default requestInstance
export { requestInstance as default, CustomedRequest }
