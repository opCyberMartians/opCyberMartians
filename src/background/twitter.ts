
import { getChain, formatChainId } from "../utils/metaMask"


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { method, params } = request

    if (method === 'Cyber_Connect') {
        getActiveTab().then(tab => {
            chrome.scripting
                .executeScript({
                    target: { tabId: tab.id as number },
                    world: 'MAIN',
                    func: () => {
                        (window as any).ethereum.request({
                            method: "eth_requestAccounts",
                            params: [],
                        })
                            .then((accounts: string[]) => {
                                const address = accounts[0]
                                window.localStorage.setItem('Cyber_Connect_Address', address)
                            })
                            .catch(() => {
                                window.localStorage.setItem('Cyber_Connect_Cancel', '1')
                            })

                    },
                })
        })
    }
    else if (method === 'Cyber_SignMessage') {
        const { sign, address } = params
        getActiveTab().then(tab => {
            chrome.scripting
                .executeScript({
                    target: { tabId: tab.id as number },
                    world: 'MAIN',
                    func: ({ sign, address }) => {
                        (window as any).ethereum.request({
                            method: "personal_sign",
                            params: [sign, address, ""],
                        }).then((signature: string) => {
                            window.localStorage.setItem('Cyber_SignMessage_Signature', signature)
                        }).catch((err: any) => {
                            console.error(err)
                            window.localStorage.setItem('Cyber_SignMessage_Cancel', '1')
                        })

                    },
                    args: [{ sign, address }]
                })
        })
    }
    else if (method === 'Cyber_SwitchChain') {
        const { chainId } = params
        const chain = getChain(chainId)
        const formatId = formatChainId(chainId)

        getActiveTab().then(tab => {
            chrome.scripting
                .executeScript({
                    target: { tabId: tab.id as number },
                    world: 'MAIN',
                    func: (chainId: string, formatId, chain) => {
                        (window as any).ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: formatId }],
                        }).then((res: any) => {
                            window.localStorage.setItem('Cyber_SwitchChain_Id', chainId)
                        }).catch((switchError: any) => {
                            if (switchError.code === 4902) {
                                (window as any).ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [chain],
                                }).then(() => {
                                    window.localStorage.setItem('Cyber_SwitchChain_Id', chainId)
                                }).catch((err: any) => {
                                    console.error(err)
                                    window.localStorage.setItem('Cyber_SwitchChain_Cancel', '1')
                                })
                            } else {
                                console.log(switchError);
                                window.localStorage.setItem('Cyber_SwitchChain_Cancel', '1')
                            }

                        })
                    },
                    args: [chainId, formatId, chain]
                })
        })
    }
    else if (method === 'Cyber_Contract') {
        const { contractAddress, address, contractData, contractType, value } = params
        const transactionParameters: any = {
            to: contractAddress,
            from: address,
            value,
            data: contractData
        };
        console.log(transactionParameters)
        if (contractType === 'attendance') {
            getActiveTab().then(tab => {
                chrome.scripting
                    .executeScript({
                        target: { tabId: tab.id as number },
                        world: 'MAIN',
                        func: (transactionParameters) => {
                            (window as any).ethereum.request({
                                method: 'eth_sendTransaction',
                                params: [transactionParameters]
                            }).then(() => {
                                window.localStorage.setItem('Cyber_Contract_Attendance', '1')
                            }).catch((err: any) => {
                                console.error(err)
                                window.localStorage.setItem('Cyber_Contract_Cancel', '1')
                            })
                        },
                        args: [transactionParameters]
                    })
            })
        }
    }



    return true

})
async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    return tab
}
