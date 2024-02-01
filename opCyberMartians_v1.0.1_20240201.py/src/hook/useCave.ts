import { useEffect, useState } from "react";
import { getMintCaves, claimMintCaves } from "../api/cave"

export default function useCave() {
    const [caveList, setCaveList] = useState<any[]>([])
    const updateCaves = async () => {
        const list = await getMintCaves()
        setCaveList(list)
        return list
    }
    const claimCave = async (id: string) => {
        await claimMintCaves(id)
        updateCaves()
    }

    useEffect(() => {
        updateCaves()
    }, [])


    return {
        caveList,
        updateCaves,
        claimCave
    }
}