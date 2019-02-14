import React from "react";
import styled from "styled-components";
import Log from "../Log";
import { OpenSeaPort, Network } from "opensea-js";
import { OPENSEA_JS_URL, GITHUB_URL } from "../../constants";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderChooser from "../ProviderChooser";
import Wallet from '../Wallet'

const Header = styled.header`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
  text-align: center;
  background-color: #f4f9fd;

  h6 img {
    width: 24px;
  }
`;

const ImgRibbon = styled.img`
  width: 150px;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;

  @media (max-width: 600px) {
    width: 80px;
  }
`;

export default class App extends React.Component {
  state = {
    accountAddress: null
  };

  onProviderDecided(provider) {
    this.seaport = new OpenSeaPort(provider, {
      networkName: Network.Main
    });
    this.web3 = this.seaport.web3;
    this.accountAddress = this.web3.eth.getAccounts((err, res) => {
      this.setState({
        accountAddress: res[0]
      });
    });
  }

  render() {
    return (
      <div>
        <a href={GITHUB_URL}>
          <ImgRibbon
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            alt="Fork me on GitHub"
          />
        </a>
        <Header>
          <Wallet></Wallet>
          <h1>The Ship's Log</h1>
          <h6>
            <a target="_blank" rel="noopener noreferrer" href={OPENSEA_JS_URL}>
              <img
                alt="OpenSea logo"
                className="mr-2"
                src="/opensea-logo.png"
              />
              OpenSea.js
            </a>{" "}
            example dapp
          </h6>
        </Header>
        <main>
          {this.state.accountAddress && (
            <Log
              seaport={this.seaport}
              accountAddress={this.state.accountAddress}
            />
          )}

          {!this.state.accountAddress && (
            <ProviderChooser providerDecided={provider => this.onProviderDecided(provider)} />
          )}
        </main>
        <ToastContainer />
      </div>
    );
  }
}
