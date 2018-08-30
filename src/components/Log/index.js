import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';
import { OrderSide } from 'opensea-js/lib/types';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
  };

  state = {
    orders: [],
    total: 0,
    side: undefined,
    page: 1
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { orders, count } = await this.props.seaport.api.getOrders({
      // Possible query options:
      // 'asset_contract_address'
      // 'maker'
      // 'taker'
      // 'owner'
      // 'token_id'
      // 'token_ids'
      // 'sale_kind'
      side: this.state.side
    }, this.state.page)

    this.setState({ orders, total: count })
  }

  paginateTo(page) {
    this.setState({ orders: [], page }, () => this.fetchData())
  }

  toggleSide(side) {
    if (this.state.side === side) {
      side = undefined
    }
    this.setState({ orders: [], side }, () => this.fetchData())
  }

  renderPagination() {
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={"page-item " + (this.state.page === 1 ? "disabled" : "")}>
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(this.state.page - 1)} tabIndex="-1">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(this.state.page + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  render() {
    const { orders } = this.state;

    const sellSide = this.state.side === OrderSide.Sell
    const buySide = this.state.side === OrderSide.Buy

    return (
      <div className="container py-3" id="Log">
        <div className="mb-3">
          Filter by type:
          <div className="btn-group ml-4" role="group">
            <button type="button" className={"btn btn-outline-primary " + (sellSide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Sell)}>
              Sales
            </button>
            <button type="button" className={"btn btn-outline-success " + (buySide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Buy)}>
              Bids
            </button>
          </div>
        </div>
        {orders.length > 0
          ? <React.Fragment>
              <div className="card-deck">
                {orders.map((order, i) => {
                  return <Order {...this.props} key={i} order={order}  />
                })}
              </div>
              {this.renderPagination()}
            </React.Fragment>
          : <div className="text-center">Loading...</div>
        }
      </div>
    );
  }
}
