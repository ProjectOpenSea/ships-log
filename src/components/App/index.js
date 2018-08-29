import React from 'react';
import styled from 'styled-components';
import Log from '../Log'

const Header = styled.header`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
  text-align: center;
  background-color: #f4f9fd;
`

const App = () => <div>
  <Header>
    <h1>The Ship's Log</h1>
    <h6>OpenSea.js example dapp</h6>
  </Header>
  <main>
    <Log />
  </main>
</div>

export default App;
