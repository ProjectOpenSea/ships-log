import React, { Fragment } from "react";
import styled from "styled-components";
import { getPortis } from "../../constants";

const Dropdown = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  cursor: pointer;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  :hover {
    background-color: aliceblue;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 75px;
  left: 25px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
  z-index: 1;
  text-align: left;

  div {
    padding: 10px;
    :hover {
      background-color: aliceblue;
    }
  }
`;

export default class Wallet extends React.Component {
  state = { visible: false };

  componentDidMount() {
    getPortis().onLogin((address, email) => {
      this.setState({ address, email });
    });
  }

  openWallet = () => {
    getPortis().showPortis();
    this.setState({ visible: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.address && (
          <Fragment>
            <Dropdown
              onClick={() => this.setState({ visible: !this.state.visible })}
            >
              {this.state.address.substring(0, 5)}...
              {this.state.address.substring(this.state.address.length - 3)}
            </Dropdown>
            {this.state.visible && (
              <DropdownList>
                <div>{this.state.address}</div>
                {this.state.email && (
                  <div>Logged in as: {this.state.email}</div>
                )}
                {this.state.email && (
                  <div onClick={this.openWallet}>Open Wallet</div>
                )}
              </DropdownList>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
