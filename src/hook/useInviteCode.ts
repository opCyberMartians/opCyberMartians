import { useEffect, useState } from "react";
import { getAccountsInviteCodes, buyAccountsInviteCode } from "../api/user"

export default function useInviteCode() {
    const [inviteCodes, setInviteCodes] = useState<any[]>([])

    const updateInviteCodes = async () => {
        const list = await getAccountsInviteCodes()
        setInviteCodes(list)
        return list
    }
    const buyInviteCodes = async () => {
        await buyAccountsInviteCode()
        updateInviteCodes()
    }

    useEffect(() => {
        updateInviteCodes()
    }, [])


    return {
        inviteCodes,
        buyInviteCodes,
        updateInviteCodes
    }
}