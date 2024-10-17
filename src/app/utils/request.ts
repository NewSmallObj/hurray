import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export declare interface responseData<T> {
  code: number;
  msg: string;
  data: T;
}

export declare interface ErrorData<T = any> {
  code: number;
  msg: string;
  data: T;
}



// 生产环境用
// export const BASE_URL = 'https://test.lymatrix.com/school-partner-server'

const instance = axios.create({
  baseURL: typeof window == 'undefined' ? '/api' : window?.config?.baseUrl || '/api',
  withCredentials: true,
  timeout: 60 * 1000,
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  const res = response.data;
  // 返回200正常返回
  if (res.code === 200) return res;
},
  (error) => {
    if (error.message) return;
  }
);

function requset<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<responseData<T>> {
  if (!options) {
    return instance.request({
      ...config,
    });
  }

  return instance.request({
    ...config,
    cancelToken: options.cancelToken,
  });
}

export default requset;

export interface requestType<T> {
  (config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<
    responseData<T>
  >;
}