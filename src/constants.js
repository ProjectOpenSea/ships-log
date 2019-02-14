import BigNumber from "bignumber.js";
import Portis from "@portis/web3";

export const GOOGLE_ANALYTICS_ID = "UA-111688253-4";
export const OPENSEA_URL = "https://opensea.io";
export const OPENSEA_JS_URL = "https://github.com/ProjectOpenSea/opensea-js";
export const GITHUB_URL = "https://github.com/ProjectOpenSea/ships-log";
export const DEFAULT_DECIMALS = 18;
let portis;

export function getPortis() {
  if (!portis) {
    portis = new Portis("9d612e80-7d39-43dc-a772-7c7daf75d2ed", "mainnet", {
      scope: ["email"]
    });
  }
  return portis;
}

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(baseAmount.toString());
  return amountBN.div(new BigNumber(10).pow(decimals));
}

export function toBaseUnitAmount(unitAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(unitAmount.toString());
  return amountBN.times(new BigNumber(10).pow(decimals));
}

export const NO_WALLET_ALERT =
  "You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io on desktop, or get Trust Wallet or Coinbase Wallet on mobile.";

export async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  );
}
