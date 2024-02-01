
export const formatChainId = (chainId: number | string) => {
    return `0x${Number(chainId).toString(16)}`
}

export const chainList = [
    {
        chainId: formatChainId('0xCC'),
        chainName: "opBNB Mainnet",
        rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    },
    {
        chainId: formatChainId('0x15eb'),
        chainName: "opBNB Testnet",
        rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
        nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    }
]

export const getChain = (chainId: number | string) => {
    return chainList.find((item) => Number(item.chainId) === Number(chainId))
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