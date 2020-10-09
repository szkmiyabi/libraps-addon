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

document.getElementById("open").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "open"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("svok").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "svok"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("svfail").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "svfail"
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

document.getElementById("bookmarklet").addEventListener("click", (e) => {
    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "bookmarklet"
        });
    })
    .catch(console.error("error"));
});

document.getElementById("status").addEventListener("click", (e) => {
    browser.windows.create({
        url: "https://jis2.infocreate.co.jp/libraplus/status/list/",
        width: 1000,
        height: 600,
        type: "normal"
    });
});