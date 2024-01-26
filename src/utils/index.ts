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
    // 计算分钟和秒钟
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    // 格式化为两位数的字符串
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // 返回格式化后的时间字符串
    return `${formattedMinutes}:${formattedSeconds}`;
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
        message.error("Error");
    }
}

export const injectScript = (url: string) => {
    const scriptExists = !!document.querySelector('script[cybermartins-script]');
    if (!scriptExists) {
        const container = document.head || document.documentElement
        const scriptTag = document.createElement('script')
        scriptTag.setAttribute('async', 'false')
        scriptTag.setAttribute('cybermartins-script', '')
        scriptTag.setAttribute('src', chrome.runtime.getURL(url))
        container.appendChild(scriptTag)
    }
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let connectTimer: NodeJS.Timer;
export const getStoreAddress = () => {
    return new Promise<string>((resolve, reject) => {
        connectTimer = setInterval(() => {
            const address = window.localStorage.getItem("Cyber_Connect_Address");
            const connectCancel = window.localStorage.getItem("Cyber_Connect_Cancel");
            if (address) {
                resolve(address);
                clearInterval(connectTimer);
                window.localStorage.removeItem('Cyber_Connect_Address')
            }
            else if (connectCancel) {
                reject('cancel')
                clearInterval(connectTimer);
                window.localStorage.removeItem('Cyber_Connect_Cancel')
            }
        }, 500);
    });
};

let signMessageTimer: NodeJS.Timer;
export const getStoreSignature = () => {
    return new Promise<string>((resolve, reject) => {
        signMessageTimer = setInterval(() => {
            const signature = window.localStorage.getItem("Cyber_SignMessage_Signature");
            const signCancel = window.localStorage.getItem("Cyber_SignMessage_Cancel");
            if (signature) {
                resolve(signature);
                clearInterval(signMessageTimer);
                window.localStorage.removeItem('Cyber_SignMessage_Signature')
            }
            else if (signCancel) {
                reject('cancel')
                clearInterval(signMessageTimer);
                window.localStorage.removeItem('Cyber_SignMessage_Cancel')
            }
        }, 500);
    });
};

let switchChainTimer: NodeJS.Timer;
export const getStoreChainId = () => {
    return new Promise<string>((resolve, reject) => {
        switchChainTimer = setInterval(() => {
            const chainId = window.localStorage.getItem("Cyber_SwitchChain_Id");
            const switchCancel = window.localStorage.getItem("Cyber_SwitchChain_Cancel");
            if (chainId) {
                resolve(chainId);
                clearInterval(switchChainTimer);
                window.localStorage.removeItem('Cyber_SwitchChain_Id')
            }
            else if (switchCancel) {
                reject('cancel')
                clearInterval(switchChainTimer);
                window.localStorage.removeItem('Cyber_SwitchChain_Cancel')
            }
        }, 500);
    });
};

let contractAttendanceTimer: NodeJS.Timer;
export const getStoreContract = (type: string) => {
    if (type === 'attendance') {
        return new Promise<string>((resolve, reject) => {
            contractAttendanceTimer = setInterval(() => {
                const res = window.localStorage.getItem("Cyber_Contract_Attendance");
                const switchCancel = window.localStorage.getItem("Cyber_Contract_Cancel");
                if (res) {
                    resolve(res);
                    clearInterval(contractAttendanceTimer);
                    window.localStorage.removeItem('Cyber_Contract_Attendance')
                }
                else if (switchCancel) {
                    reject('cancel')
                    clearInterval(contractAttendanceTimer);
                    window.localStorage.removeItem('Cyber_Contract_Cancel')
                }
            }, 500);
        });
    }

};