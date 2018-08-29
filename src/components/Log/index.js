import React from 'react';
// import { OpenSeaSDK } from 'opensea-js';

export default class Log extends React.Component {
  state = {
    assets: [],
  };

  componentDidMount() {
    this.getAssets();
  }

  getAssets() {
    // axios
    //   .get('https://api.opensea.io/api/v1/events/?event_type=successful&asset_contract_address=0x06012c8cf97bead5deae237070f9587f8e7a266d')
    //   .then((response) => {
    //     this.setState({ events: response.data.asset_events });
    //   })
    //   .catch(err => new Error(err));
  }

  render() {
    const { assets } = this.state;

    return (
      <div className="container py-3">
        {assets.length > 0
          ? assets.map((asset, i) => (
              <div key={i}>
                {asset.name}
              </div>
            ))
          : <div className="text-center">Loading...</div>
        }
      </div>
    );
  }
}
