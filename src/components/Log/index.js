import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
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
      'asset_contract_address': '0xf766b3e7073f5a6483e27de20ea6f59b30b28f87'
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

  paginateTo(page) {
    this.setState({ orders: [], page }, () => this.fetchData())
  }

  renderPagination() {
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={"page-item " + (this.state.page == 1 ? "disabled" : "")}>
            <a className="page-link" href="#"
              onClick={() => this.paginateTo(this.state.page - 1)} tabindex="-1">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#"
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

    return (
      <div className="container py-3">
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
