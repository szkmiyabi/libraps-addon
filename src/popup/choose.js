document.getElementById("next").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "next"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("prev").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "prev"
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

document.getElementById("all-copy").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "all-copy"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("all-paste").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "all-paste"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("tabcopy").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.duplicate(tabs[0].id);
    })
    .catch(console.error("error"));
});

document.getElementById("run-js").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "run-js"
        });
    })
    .catch(console.error("error"));
});
