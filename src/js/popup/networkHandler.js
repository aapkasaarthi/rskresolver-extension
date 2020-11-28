export function switchNetwork(e) {
    chrome.storage.local.get(['network'], function(networkData) {
        if (networkData.network === '30'){
            chrome.storage.local.set({'network': '31'}, function() {
                console.log({'network': '31'});
            });
            this.close()
        }
        else if(networkData.network === '31'){
            chrome.storage.local.set({'network': '30'}, function() {
                console.log({'network': '30'});
            });
            this.close()
        }
        else{
            chrome.storage.local.set({'network': '31'}, function() {
                console.log({'network': '31'});
            });
            this.close()
        }
    });
}
