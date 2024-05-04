// Listen for selection change events in active tab
chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.executeScript(tab.tabId, { file: "content.js" });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.tabs.executeScript(tabId, { file: "content.js" });
    }
});