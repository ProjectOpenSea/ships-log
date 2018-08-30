import React from 'react';
import styled from 'styled-components';
import Log from '../Log'
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider } from '../../constants';

const Header = styled.header`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
  text-align: center;
  background-color: #f4f9fd;
`

export default class App extends React.Component {

  state = {
    accountAddress: null
  }

  constructor(props) {
    super(props)
    this.seaport = new OpenSeaPort(web3Provider, {
      network: Network.Main
    })
    this.web3 = this.seaport.web3
  }

  componentDidMount() {
    this.accountAddress = this.web3.eth.getAccounts((err, res) => {
      this.setState({
        accountAddress: res[0]
      })
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
          <Log
            seaport={this.seaport}
            accountAddress={this.state.accountAddress} />
        </main>
      </div>
    )
  }
}
