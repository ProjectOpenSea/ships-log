import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired
  };

  state = {
    orders: [],
    total: 0,
    page: 1
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { orders, count } = await this.props.seaport.api.getOrders({
      // Possible query options:
      // 'asset_contract_address
      // 'maker'
      // 'taker'
      // 'owner'
      // 'token_id'
      // 'token_ids'
      // 'side'
    }, this.state.page)

    // const tokenIdsWithDups = orders.map(o => o.asset.id)

    // const { assets, count } = await this.props.seaport.api.getAssets({
    //   token_ids: tokenIdsWithDups
    // })

    this.setState({ orders, total: count })
  }

  render() {
    const { orders } = this.state;

    return (
      <div className="container py-3">
        {orders.length > 0
          ? orders.map((order, i) => <Order key={i} order={order} />)
          : <div className="text-center">Loading...</div>
        }
      </div>
    );
  }
}
