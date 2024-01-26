import { useEffect, useState } from 'react'

export type ExtensionConfig = {
    enabled: boolean,
    twitterEnabled: boolean,
    twitterSidePanelExpanded: boolean
}

const DEFAULTS: ExtensionConfig = {
    enabled: true,
    twitterEnabled: true,
    twitterSidePanelExpanded: false
}

let configPromise: null | Promise<Record<string, any>> = null
export const getExtensionConfig = async (): Promise<ExtensionConfig> => {
    if (!configPromise) {
        configPromise = new Promise((resolve) => {
            chrome.storage.local.get(['extensionConfig'], resolve)
        })
    }
    const val = await configPromise
    return val?.extensionConfig || DEFAULTS
}

export const saveExtensionConfig = (config: ExtensionConfig) => {
    chrome.storage.local.set({ extensionConfig: config })
}

export default function useExtensionConfig() {
    const [config, setConfig] = useState<ExtensionConfig>(DEFAULTS)
    useEffect(() => {
        (async () => {
            const res = await getExtensionConfig()
            setConfig(val => ({ ...val, ...res }))
        })()
    }, [])

    return [
        config,
        (updatedConfig: ExtensionConfig) => {
            setConfig(updatedConfig)
            saveExtensionConfig(updatedConfig)
        },
    ] as const
}