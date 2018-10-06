import * as Web3 from 'web3';

export const GOOGLE_ANALYTICS_ID = 'UA-111688253-4'
export const OPENSEA_URL = "https://opensea.io"
export const OPENSEA_JS_URL = "https://github.com/ProjectOpenSea/opensea-js"
export const GITHUB_URL = "https://github.com/ProjectOpenSea/ships-log"
export const web3Provider = typeof web3 !== 'undefined'
  ? window.web3.currentProvider
  : new Web3.providers.HttpProvider('https://mainnet.infura.io')
export const web3Singleton = new Web3(web3Provider)

export function fromWei(wei) {
  return +(web3Singleton.utils.fromWei(wei.toString()))
}

export const NO_WALLET_ALERT = 'You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io on desktop, or get Trust Wallet or Coinbase Wallet on mobile.'

export async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  )
}
