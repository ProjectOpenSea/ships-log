import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';
import { OrderSide } from 'opensea-js/lib/types';
import { NO_WALLET_ALERT } from '../../constants';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
  };

  state = {
    orders: [],
    total: 0,
    side: undefined,
    onlyForMe: false,
    onlyByMe: false,
    page: 1
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { accountAddress } = this.props
    const { orders, count } = await this.props.seaport.api.getOrders({
      maker: this.state.onlyByMe ? accountAddress : undefined,
      owner: this.state.onlyForMe ? accountAddress : undefined,
      side: this.state.side
      // Possible query options:
      // 'asset_contract_address'
      // 'taker'
      // 'token_id'
      // 'token_ids'
      // 'sale_kind'
      
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

  toggleForMe() {
    const { accountAddress } = this.props
    if (!accountAddress) {
      return alert(NO_WALLET_ALERT)
    }
    const { onlyForMe } = this.state
    this.setState( {
      orders: [],
      onlyForMe: !onlyForMe,
      onlyByMe: false,
      // Doesn't make sense to show sell orders the user makes
      side: onlyForMe ? undefined : OrderSide.Buy,
    }, () => this.fetchData())
  }

  toggleByMe() {
    const { accountAddress } = this.props
    if (!accountAddress) {
      return alert(NO_WALLET_ALERT)
    }
    const { onlyByMe } = this.state
    this.setState( {
      orders: [],
      onlyByMe: !onlyByMe,
      onlyForMe: false
    }, () => this.fetchData())
  }

  renderPagination() {
    const { page, total } = this.state
    const ordersPerPage = this.props.seaport.api.pageSize
    const noMorePages = page*ordersPerPage >= total
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={"page-item " + (page === 1 ? "disabled" : "")}>
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(page - 1)} tabIndex="-1">
              Previous
            </a>
          </li>
          <li className={"page-item " + (noMorePages ? "disabled" : "")}>
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(page + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  renderFilters() {
    const { onlyByMe, onlyForMe } = this.state
    const sellSide = this.state.side === OrderSide.Sell
    const buySide = this.state.side === OrderSide.Buy

    return (
      <div className="row">
        <div className="mb-3 ml-4">
          Filter orderbook:
          <div className="btn-group ml-4" role="group">
            <button type="button" className={"btn btn-outline-primary " + (sellSide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Sell)}>
              Sales
            </button>
            <button type="button" className={"btn btn-outline-success " + (buySide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Buy)}>
              Bids
            </button>
          </div>
        </div>
        <div className="mb-3 ml-4">
          <div className="btn-group" role="group">
            <button type="button" className={"btn btn-outline-secondary " + (onlyForMe ? "active" : "")} data-toggle="button" onClick={() => this.toggleForMe()}>
              For Me
            </button>
            <button type="button" className={"btn btn-outline-secondary " + (onlyByMe ? "active" : "")} data-toggle="button" onClick={() => this.toggleByMe()}>
              By Me
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { orders } = this.state

    return (
      <div className="container py-3" id="Log">

        {this.renderFilters()}

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
