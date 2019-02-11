import React, { Fragment } from "react";
import styled from "styled-components";
import Portis from "@portis/web3";

const Providers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Provider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  transition: box-shadow 0.3s;

  img {
    margin-bottom: 10px;
    width: 120px;
    height: 120px;
  }

  p {
    font-weight: bold;
    margin-bottom: 0;
  }

  :hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

const Instructions = styled.div`
  text-align: center;
  margin-top: 2em;

  p:first-child {
    font-size: 2em;
  }
`;

export default class ProviderChooser extends React.Component {
  async initProvider(providerName) {
    let provider;
    if (providerName === "portis") {
      const portis = new Portis(
        "9d2d981f-d311-4a5d-97e4-d6ea8a7422c8",
        "mainnet"
      );
      provider = portis.provider;
    } else {
      provider = window.ethereum;
    }

    await provider.enable();
    this.props.providerDecided(provider);
  }

  render() {
    return (
      <Fragment>
        <Instructions>
          <p>Connect a Wallet</p>
          <p>Your choice will serve as your login</p>
        </Instructions>
        <Providers>
          <Provider onClick={() => this.initProvider("portis")}>
            <img src="https://assets.portis.io/portis-logo/logo_120_120.png" />
            <p>Portis</p>
          </Provider>
          {window.ethereum && (
            <Provider onClick={() => this.initProvider("metamask")}>
              <img src="https://cdn-images-1.medium.com/max/1200/1*Ajditq7CoiSbj9-2OPAO8w.png" />
              <p>MetaMask</p>
            </Provider>
          )}
        </Providers>
      </Fragment>
    );
  }
}
