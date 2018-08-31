import * as Web3 from 'web3';

export const OPENSEA_URL = "https://opensea.io"
export const OPENSEA_JS_URL = "https://github.com/ProjectOpenSea/opensea-js"
export const GITHUB_URL = "https://github.com/ProjectOpenSea/ships-log"
export const web3Provider = typeof web3 !== 'undefined'
  ? window.web3.currentProvider
  : new Web3.providers.HttpProvider('https://mainnet.infura.io')
export const web3Singleton = new Web3(web3Provider)

export function fromWei(wei) {
  return +(web3Singleton.fromWei(wei))
}

export async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  )
}
