import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CustomedRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CustomedRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CustomedRequestInterceptors<T>
  showLoading?: boolean
}
