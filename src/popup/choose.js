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

document.getElementById("rs-util").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "rs-util"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("fail-line").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "fail-line"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("srch-line").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "srch-line"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("chk-line").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "chk-line"
        });
    })
    .catch(console.error("error"));
});