import React from 'react';
import * as Web3 from 'web3';
import styled from 'styled-components';
import Log from '../Log'
import { OpenSeaPort, Network } from 'opensea-js';

const Header = styled.header`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
  text-align: center;
  background-color: #f4f9fd;
`

export default class App extends React.Component {

  constructor(props) {
    super(props)
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
    this.seaport = new OpenSeaPort(provider, {
      network: Network.Main
    })
  }

  render() {
    return (
      <div>
        <Header>
          <h1>The Ship's Log</h1>
          <h6>OpenSea.js example dapp</h6>
        </Header>
        <main>
          <Log seaport={this.seaport} />
        </main>
      </div>
    )
  }
}
