function action_handler() {

    document.addEventListener("click", (e) => {

        const tabs = browser.tabs;
        let tid = e.target.id;

        switch(tid) {
            case "csscut":
                browser.tabs.query({active: true, currentWindow: true})
                    .then((tabs) => {
                        browser.tabs.sendMessage(tabs[0].id, {
                            command: "csscut"
                        });
                    })
                    .catch(console.error("error"));
                break;
        }
    });

}

browser.tabs.executeScript({file: "/action.js"})
    .then(action_handler)
    .catch(console.error("error!"));