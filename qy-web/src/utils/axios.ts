
import {notification} from "ant-design-vue";
import axios, {AxiosError} from "axios";
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_BASE_API,
    withCredentials: true,
    timeout: 6000, // 请求超时时间

});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            });
        }else  if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            });
        } else {
            notification.error({
                message: '请求异常',
                description: data.message
            });
        }
        return Promise.reject(data);
    } else {
        return Promise.reject(error);
    }

}

// request interceptor
request.interceptors.request.use(config => {
    return config;
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    if(response.data.pageInfo) {
        response.data.pageInfo.current = parseInt(response.data.pageInfo.current);
        response.data.pageInfo.pageSize = parseInt(response.data.pageInfo.pageSize);
        response.data.pageInfo.total = parseInt(response.data.pageInfo.total);
        response.data.pageInfo.pages = parseInt(response.data.pageInfo.pages);
    }
    return response.data
}, errorHandler)

export default request