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

document.getElementById("single-cp").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "single-cp"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("single-ps").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "single-ps"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("all-cp").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "all-cp"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("all-ps").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "all-ps"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("browse").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "browse"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("tab-cp").addEventListener("click", (e) => {
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

document.getElementById("do-ok").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "do-ok"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("do-na").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "do-na"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("rep-color-util").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "rep-color-util"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("sv-color-util").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "sv-color-util"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("w3c-repo-util").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "w3c-repo-util"
        });
    })
    .catch(console.error("error"));
});