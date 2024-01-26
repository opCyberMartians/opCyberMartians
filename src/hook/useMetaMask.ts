import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccountsSign } from "../api/user";
import { getStoreAddress, getStoreSignature, delay, getStoreChainId, getStoreContract } from "../utils"

let _Address = ''
let _Signature = ''

export default function useMetaMask() {
    const [address, setAddress] = useState('')
    const [signature, setSignature] = useState('');


    const connect = async () => {
        // 通知--连接钱包
        chrome.runtime.sendMessage({
            method: 'Cyber_Connect',
        })
        // 等待--连接完成 保存到store
        const address = await getStoreAddress()
        setAddress(address)
        _Address = address

        return address
    }
    const signMessage = async () => {
        const _address = _Address
        // 阻塞500ms ， 太快调起签名会报错
        await delay(500)
        // 接口--获取签名
        const sign = await getAccountsSign(_address)
        // 通知--连接签名
        chrome.runtime.sendMessage({
            method: 'Cyber_SignMessage',
            params: { sign, address: _address }
        })
        // 等待--签名完成 保存到store
        const signature = await getStoreSignature()
        setSignature(signature)
        _Signature = signature


        return {
            signature,
            address: _address,
            sign
        }
    }

    const switchChain = async (chainId?: string | Number) => {
        chrome.runtime.sendMessage({
            method: 'Cyber_SwitchChain',
            params: {
                chainId: chainId || process.env.REACT_APP_OPBNB_USE_NETWORK
            }
        })
        await getStoreChainId()
        await delay(500)
    }

    // 出勤签到
    const contractAttendance = async () => {
        if (!address) {
            await connect();
        }
        await switchChain();
        chrome.runtime.sendMessage({
            method: "Cyber_Contract",
            params: {
                contractType: "attendance",
                address: _Address,
                contractData: "d4c355cd",
                contractAddress: process.env.REACT_APP_ATTENDANCE_CONTRACT_ADD,
            },
        });
        await getStoreContract("attendance");
    }

    useEffect(() => {
        if (_Address && !address) {
            setAddress(_Address)
        }
    }, [address])

    return {
        address,
        signature,
        connect,
        signMessage,
        switchChain,
        contractAttendance
    }
}