import { message } from "antd";

// 格式化钱包
export const formatAddress = (address: string) => {
    // 判断是否为钱包地址
    const isAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(address!);
    // 判断是否邮箱
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
    if (!address) {
        return "";
    }
    if (isAddress) {
        return address.slice(0, 4) + "..." + address.slice(-4);
    }
    if (isEmail) {
        return formatEmail(address);
    }
    return address;
};

export const formatEmail = (email: string) => {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, 4);
    const domain = email.substring(atIndex);

    return username + "..." + domain;
};

// 获取、格式化url参数
export const getUrlParams = (url: string) => {
    const params: Record<any, any> = {};
    const regex = /[?&]+([^=&]+)=([^&]*)/g;

    url.replace(regex, (match, key, value) => {
        // 如果需要将值解码，可以使用 decodeURIComponent 函数
        // value = decodeURIComponent(value);

        params[key] = value;
        return ''
    });

    return params;
}

// 毫秒 转化为'00:00'
export const formatMillisecondsToTime = (milliseconds: number) => {
    if (milliseconds < 0) { milliseconds = 0 }
    // 计算分钟和秒钟
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    // 格式化为两位数的字符串
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // 返回格式化后的时间字符串
    return `${formattedMinutes}:${formattedSeconds}`;
}

// 毫秒 转化为 '00::00:00' 
export const formatMillisecondsToTime2 = (milliseconds: number) => {
    if (milliseconds < 0) { milliseconds = 0 }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const padZero = (num: number) => (num < 10 ? '0' + num : num);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// 复制
export const copy = (text: string, callback?: () => void) => {
    try {
        navigator.clipboard.writeText(text);
        if (callback) {
            callback()
        } else {
            message.success("Copied");
        }
    } catch (error) {
        // message.error("Error");
        console.error(error)
    }
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

