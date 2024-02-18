import { setupTwitterSidePanel } from "./setup/twitter/my-side-panel"
import { getExtensionConfig } from "./hook/useExtensionConfig";
import { getTwitterId } from "./hook/useUser"

async function initialize() {
    const extensionConfig = await getExtensionConfig()
    const twitterId = await getTwitterId()  //推特已登录

    if (extensionConfig.enabled) {
        if (extensionConfig.twitterEnabled && twitterId) {
            setupTwitterSidePanel()
        }
    }
}


initialize()