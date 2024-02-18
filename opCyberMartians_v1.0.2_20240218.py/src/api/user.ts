import fetchApi from "../utils/request"

// 推个授权跳转
export const twitterAuth = () => {
    const callBackUrl = window.location.href
    return fetchApi(`/twitter/auth?callback=${callBackUrl}`)
}

// 获取用户信息
export const getAccounts = () => {
    return fetchApi(`/accounts/account`)
}

// 绑定邀请码
export const bindCode = (inviteCode: string) => {
    return fetchApi(`/accounts/bind-code`, {
        method: 'put',
        data: { inviteCode },
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 获取用户资产
export const getUserAssets = async () => {
    const list = await fetchApi(`/user-assets`)
    const obj = {
        mineralNum: 0, //矿石
        integral: 0 //积分
    }
    list.forEach((item: any) => {
        if (item.assetsId === 0) {
            obj.mineralNum += item.quantity
        } else if (item.assetsId === 1) {
            obj.integral += item.quantity
        }
    });
    return obj
}

// 获取邀请码列表
export const getAccountsInviteCodes = () => {
    return fetchApi(`/accounts/invite-codes`)
}

// 购买邀请码（使用矿石）
export const buyAccountsInviteCode = () => {
    return fetchApi(`/accounts/invite-code/buy`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 钱包签名
export const getAccountsSign = (address: string) => {
    return fetchApi(`/accounts/sign?address=${address}`)
}

// 绑定钱包
export const bindWallet = ({ address, sign, signature }: {
    address: string,
    sign: string,
    signature: string
}) => {
    return fetchApi(`/accounts/bind-wallet`, {
        method: 'put',
        data: { address, signContent: sign, signature },
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 签到记录
export const getSignInWeeks = () => {
    // 返回['周一', '周二',..., '周日'] 是否已签到
    return fetchApi(`/sign-in/weeks`)
}
