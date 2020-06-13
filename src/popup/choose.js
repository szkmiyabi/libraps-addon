document.getElementById("csscut").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "csscut"
        });
    })
    .catch(console.error("error"));
});