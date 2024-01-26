import { message } from "antd"
import { getToken } from "../hook/useUser"

type Options = RequestInit & {
    data?: any,
    baseURL?: string,
    headers?: HeadersInit & { token?: string, "Content-Type"?: string }
}

export default async function fetchApi(url: string, options?: Options) {
    const { data, baseURL = '' } = options || {}
    const obj = {
        ...options
    }
    const token = await getToken()
    if (token) {
        !obj.headers && (obj.headers = {});
        obj.headers['token'] = token;
    }
    if (data) {
        obj['body'] = JSON.stringify(data)
    }
    try {
        const response = await fetch(`${baseURL || process.env.REACT_APP_BASE_API}${url}`, obj);
        if (!response.ok) {
            // throw new Error(response.statusText);
            return Promise.reject(response.statusText)
        }
        const res = await response.json();
        if (res.code === 0) {
            return res.data;
        }
        // token失效
        else if (res.code === -2) {
            return Promise.reject(res)
        }
        else {
            const msg = res.data || res.msg
            message.error(msg)
            return Promise.reject(res)
        }
    } catch (error) {
        console.error('Fetch请求错误:', error);
        throw error;
    }
}   