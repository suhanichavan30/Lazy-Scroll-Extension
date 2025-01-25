let scrollInterval;
let scrollSpeed = 10; // Default speed

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        scrollSpeed = parseInt(request.speed)||10;
        startScrolling();
    } else if (request.action === "stop") {
        stopScrolling();
    } else if (request.action === "adjustSpeed") {
        scrollSpeed = parseInt(request.speed)||10;
        startScrolling();
    }
});

function startScrolling() {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); 
    }, 100 / scrollSpeed);
}

function stopScrolling() {
    if (scrollInterval) clearInterval(scrollInterval);
}
