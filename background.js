chrome.webRequest.onBeforeRequest.addListener((requestDetails)=>{
    console.log(requestDetails);
    let url = new URL(requestDetails.url);
    fetch(`https://rskresolver.herokuapp.com/contenthash?domain=${url.hostname}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.statusCode == '200'){
            console.log('redirecting');
            chrome.tabs.update(requestDetails.tabId, {url: data.response});
        }
    });

},{urls: ["*://*.rsk/*"], types: ['main_frame'], }, ['blocking']);
