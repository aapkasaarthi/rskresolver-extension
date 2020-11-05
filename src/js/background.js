import RNS  from '@rsksmart/rns';
import Web3 from 'web3';

const web3 = new Web3('https://public-node.testnet.rsk.co');
const rns = new RNS(web3);
console.log(web3.version);

async function redirectToIpfs(url, tabId){
    rns.contenthash(url.hostname)
        .then(contenthash =>{
            console.log(contenthash, tabId);
            chrome.tabs.update(tabId,
                {
                    url: `https://ipfs.io/${contenthash.protocolType}/${contenthash.decoded}`
                }
            );
        })
        .catch(e=>{
            console.log(e);
        })
}

chrome.webRequest.onBeforeRequest.addListener((requestDetails)=>{
    console.log(requestDetails);
    let url = new URL(requestDetails.url);
    chrome.tabs.update(
        { url: 'loading.html' },
        async (tab) => {
            await redirectToIpfs(url, tab.id)
          return { cancel: true }
        },
    )
},{urls: ["*://*.rsk/*"], types: ['main_frame'], }, ['blocking']);
