import { PrimeSdk, ArkaPaymaster } from '@etherspot/prime-sdk';
import { Contract, JsonRpcProvider } from 'ethers';

let isInitialised = false;
let sdk = null;
let address = '';
let score = 0;
let arkaSdk = null;
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"type":"error","name":"EnforcedPause"},{"inputs":[],"type":"error","name":"ExpectedPause"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"type":"error","name":"OwnableInvalidOwner"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"type":"error","name":"OwnableUnauthorizedAccount"},{"inputs":[{"internalType":"address","name":"previousOwner","type":"address","indexed":true},{"internalType":"address","name":"newOwner","type":"address","indexed":true}],"type":"event","name":"OwnershipTransferred","anonymous":false},{"inputs":[{"internalType":"address","name":"account","type":"address","indexed":false}],"type":"event","name":"Paused","anonymous":false},{"inputs":[{"internalType":"address","name":"account","type":"address","indexed":false}],"type":"event","name":"Unpaused","anonymous":false},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"addAdmin"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","name":"admins","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[{"internalType":"address","name":"other","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"claim","outputs":[{"internalType":"bool","name":"","type":"bool"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"getThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}]},{"inputs":[{"internalType":"address","name":"other","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"handshake"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","name":"handshakes","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}]},{"inputs":[],"stateMutability":"nonpayable","type":"function","name":"renounceOwnership"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","name":"scores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}]},{"inputs":[{"internalType":"uint256","name":"newThreshold","type":"uint256"}],"stateMutability":"nonpayable","type":"function","name":"setThreshold"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"transferOwnership"}];

const initialiseSdk = async (provider) => {
  if (!sdk) {
    console.log('Not authenticated anonymously, starting...')

    sdk = new PrimeSdk(provider, {
      chainId: 80002
    });
    address = await sdk.getCounterFactualAddress();
    console.log('address: ', address);
    isInitialised = true;
    arkaSdk = new ArkaPaymaster('80002', process.env.REACT_APP_ARKA_KEY, 'https://arka.etherspot.io');
    const isWhitelisted = await arkaSdk.checkWhitelist(address);
    console.log(isWhitelisted);
    if (isWhitelisted !== 'Already added') {
      await arkaSdk.addWhitelist([address]);
    }
  }

  return Promise.resolve();
}

const checkWhitelist = async () => {
  const isWhitelisted = await arkaSdk.checkWhitelist(address);
  if (isWhitelisted !== 'Already added') {
    await arkaSdk.addWhitelist([address]);
  }
  return true;
}

const getAddress = async () => {
  return sdk.getCounterFactualAddress();
}

const getScore = async (address) => {
  const provider = new JsonRpcProvider('https://testnet-rpc.etherspot.io/v1/80002', {chainId: 80002, name: 'Connected Bundler'});
  const contract = new Contract('0xF34fEBDCc36D7246498C56bEfc10bE5dC694C494', abi, provider);
  score = await contract.scores(address);
  return score;
}

export function useSdk() {
    return {
        initialiseSdk,
        sdk,
        address,
        getScore,
        score,
        isInitialised,
        checkWhitelist,
        getAddress
    };
}
