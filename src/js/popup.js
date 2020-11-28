import {switchNetwork} from './popup/networkHandler';

const networks = {
    '30':'RSK Mainnet', // Mainnet
    '31':'RSK Testnet' // Testnet
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('switchBtn').addEventListener('click', switchNetwork);
    chrome.storage.local.get(['network'], function(networkData) {
        console.log(networkData);
        if (Object.keys(networkData).includes('network') === false){
            switchNetwork();
        }
        document.getElementById('network').innerHTML =networks[networkData.network];
        if (networkData.network === '30'){
            document.getElementById('switchText').innerText = 'RSK Testnet'
        }
        else {
            if (networkData.network === '31'){
                document.getElementById('switchText').innerText = 'RSK Mainnet'
            }
        }
    });
})
