
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