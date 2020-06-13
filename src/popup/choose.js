document.getElementById("svok").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "svok"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("svna").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "svna"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("copy").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "copy"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("paste").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "paste"
        });
    })
    .catch(console.error("error"));
});
