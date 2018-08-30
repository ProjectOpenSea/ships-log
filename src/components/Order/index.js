import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Account from '../Account'
import styled from 'styled-components';
import { web3Singleton } from '../../constants';
import { OrderSide } from 'opensea-js/lib/types';

const Card = styled.div.attrs({ className: "card mx-2 mb-4" })`
  min-width: 200px;
  img {
    display: block;
    height: 120px;
    max-width: 100%;
  }
`

export default class Order extends React.Component {

  state = {
    errorMessage: null
  }

  static propTypes = {
    currentAccount: PropTypes.object,
    order: PropTypes.shape({
      makerAccount: PropTypes.object.isRequired
    }).isRequired,
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
  }

  renderBuyButton() {
    const { accountAddress } = this.props
    const { currentPrice } = this.props.order
    const priceLabel = web3Singleton.fromWei(currentPrice).toFixed(3)
    const buyAsset = async () => {
      await this.props.seaport.fulfillOrder({ order: this.props.order, accountAddress })
    }
    return (
      <button
        onClick={buyAsset}
        className="btn btn-primary w-100">Buy for Ξ{priceLabel}
      </button>
    )
  }

  renderAcceptOfferButton(canAccept = true) {
    const { accountAddress } = this.props
    const { currentPrice } = this.props.order
    const priceLabel = web3Singleton.fromWei(currentPrice).toFixed(3)
    const btnClass = canAccept ? "btn-success" : "btn-warning"
    const sellAsset = async () => {
      if (!canAccept) {
        this.setState({
          errorMessage: "You do not own this asset!"
        })
        return
      }
      await this.props.seaport.fulfillOrder({ order: this.props.order, accountAddress })
    }
    return (
      <button
        onClick={sellAsset}
        className={`btn ${btnClass} w-100`}>Sell for Ξ{priceLabel}
      </button>
    )
  }

  renderExpirationBadge() {
    const expirationTime = parseFloat(this.props.order.expirationTime)

    if (expirationTime <= 0) {
      return null;
    }

    const timeLeft = moment.duration(moment.unix(expirationTime).diff(moment()))

    return (
      <span className="badge bid-expiry-badge red">
        <i className="tiny material-icons">timer</i>
        <span className="expire-label">Expires in </span>
        {timeLeft.humanize()}
      </span>
    )
  }

  render() {
    const { errorMessage } = this.state
    const { order, accountAddress } = this.props
    const { makerAccount, listingTime, asset } = order

    const ts = listingTime.toNumber() * 1000
    const timeLabel = moment(ts).local().fromNow()
    const isOwner = accountAddress && accountAddress.toLowerCase() === asset.owner.address.toLowerCase()

    return (
      <Card>
        <a target="_blank" className="d-inline-block m-100" href={asset.openseaLink}>
          <img
            className="mx-auto"
            alt="Asset artwork"
            src={asset.imageUrl} />
        </a>
          
        <div className="card-body h-25">
          <h5 className="card-title">{asset.name}</h5>
          <p className="card-text text-truncate">
            <a target="_blank" href={asset.openseaLink} className="card-link">{asset.assetContract.name} #{asset.tokenId}</a>
          </p>
        </div>
        
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Offered by <Account account={makerAccount} />
          </li>
          { errorMessage
            ? <div className="alert alert-warning mb-0" role="alert">
                {errorMessage}
              </div>
            : <li className="list-group-item">
                {order.side == OrderSide.Buy
                  ? isOwner
                    ? this.renderAcceptOfferButton()
                    : this.renderAcceptOfferButton(false)
                  : null
                }
                {!isOwner && order.side == OrderSide.Sell
                  ? this.renderBuyButton()
                  : null
                }
              </li>
          }
        </ul>
        <div className="card-footer">
          <small className="text-muted">Posted {timeLabel}</small>
        </div>
      </Card>
    )
  }
}
