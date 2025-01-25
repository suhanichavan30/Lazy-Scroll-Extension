document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start").addEventListener("click", () => {
        const speed = document.getElementById("speed").value;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.url.startsWith("http")) {  // Ensure it's a valid webpage
                // Execute content script dynamically if not already injected
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
                }, () => {
                    chrome.tabs.sendMessage(tab.id, { action: "start", speed: speed });
                });
            } else {
                alert("This extension can only be used on regular webpages.");
            }
        });
    });

    document.getElementById("stop").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.url.startsWith("http")) {
                chrome.tabs.sendMessage(tab.id, { action: "stop" });
            } else {
                alert("This extension can only be used on regular webpages.");
            }
        });
    });

    document.getElementById("speed").addEventListener("input", (event) => {
        const speed = event.target.value;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.url.startsWith("http")) {
                chrome.tabs.sendMessage(tab.id, { action: "adjustSpeed", speed: speed });
            } else {
                alert("This extension can only be used on regular webpages.");
            }
        });
    });
});
