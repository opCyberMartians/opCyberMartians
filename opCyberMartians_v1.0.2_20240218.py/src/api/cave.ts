import fetchApi from "../utils/request"

// 获取矿洞列表
export const getMintCaves = () => {
    return fetchApi(`/mint-caves`)
}

// 领取矿洞奖励
export const claimMintCaves = (id: string) => {
    return fetchApi(`/mint-caves/claim`, {
        method: "put",
        data: { id },
        headers: {
            "Content-Type": "application/json"
        }
    })
}
