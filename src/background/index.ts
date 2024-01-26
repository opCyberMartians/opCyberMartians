
import "./twitter"

// const getCurrentTab = async function () {
//     const queryOptions = { active: true, lastFocusedWindow: true }
//     const [tab] = await chrome.tabs.query(queryOptions)
//     return tab
// }

// async function sendMessageToActiveTab(message: string) {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
//   const response = await chrome.tabs.sendMessage(tab.id, message)
//   // TODO: Do something with the response.
// }

// Browser.runtime.onConnect.addListener((remotePort: Browser.Runtime.Port) => {
//   console.log({ remotePort })
// });

// // 插件安装
// chrome.runtime.onInstalled.addListener(({ reason }) => {
//     if (reason === 'install' || reason === "update") {
//     }
// })

// // 页面切换
// chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
//     // console.log({ tabId, windowId })
// })

// // 页面刷新
// // changeInfo:{status: 'complete'|'loading'}
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // console.log({ tabId, changeInfo, tab })
//     // if (changeInfo.status == 'complete') {
//     // }
// })

// // 点击扩展程序工具栏图标
// chrome.action.onClicked.addListener(async (tab) => {
//     // chrome.scripting.insertCSS({
//     //     files: ["focus-mode.css"],
//     //     target: { tabId: tab.id! },
//     // });
// })

// chrome.cookies.get({ url: "https://*.twitter.com/*", name: "twid" }, function (cookies) {
//     if (cookies) {
//         const value = cookies.value
//         const twid = decodeURIComponent(value).split('=')?.[0] || ''
//     }
// });