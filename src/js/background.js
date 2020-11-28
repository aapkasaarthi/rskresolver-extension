import RNS  from '@rsksmart/rns';
import Web3 from 'web3';

async function redirectToIpfs(url, tabId){

    const networks = {
        '30':'https://public-node.rsk.co', // Mainnet
        '31':'https://public-node.testnet.rsk.co' // Testnet
    }

    chrome.storage.local.get(['network'], function(networkData) {

        const web3 = new Web3(networks[networkData.network]);
        const rns = new RNS(web3);

        rns.contenthash(url.hostname)
        .then(contenthash =>{
            console.log(contenthash, tabId);
            if (contenthash.protocolType === 'ipfs' || contenthash.protocolType === 'ipns'){
                chrome.tabs.update(tabId,
                    {
                        url: `https://ipfs.io/${contenthash.protocolType}/${contenthash.decoded}`
                    }
                );
            }
            else if(contenthash.protocolType === 'onion' || contenthash.protocolType === 'onion3'){
                chrome.tabs.update(tabId,
                    {
                        url: `https://${contenthash.decoded}.onion.to`
                    }
                );
            }
        })
        .catch(e=>{
            console.log('err');
            chrome.tabs.update(tabId,
                {
                    url: `invalid.html?dn=${url.hostname}`
                }
            );
        })

    });

}

chrome.webRequest.onBeforeRequest.addListener((requestDetails)=>{
    console.log(requestDetails);
    let url = new URL(requestDetails.url);
    chrome.tabs.update(
        { url: `loading.html?dn=${url.hostname}` },
        async (tab) => {
            await redirectToIpfs(url, tab.id)
          return { cancel: true }
        },
    )
},{urls: ["*://*.rsk/*"], types: ['main_frame'], }, ['blocking']);

