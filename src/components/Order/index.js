import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Account from '../Account'

export default class Order extends React.Component {

  static propTypes = {
    currentAccount: PropTypes.object,
    order: PropTypes.shape({
      makerAccount: PropTypes.object.isRequired
    }).isRequired
  }

  renderBuyButton() {
    return <button />
  }

  renderAcceptOfferButton() {
    return <button />
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
    const { makerAccount, currentPrice, listingTime, asset } = this.props.order

    const priceLabel = currentPrice.toPrecision(3)
    const ts = parseInt(listingTime) * 1000
    const timeLabel = moment(ts).local().fromNow()
    const isOwner = false // address && address, makerAccount.address)

    const previewStyle = {maxHeight: 25, maxWidth: 25, marginRight: 10, verticalAlign: "middle"}

    return (
      <div>
          <div className={"Bid table_row padded"}>
            <span className="table_cell truncate">
              <Account account={makerAccount} showImage={true} />
            </span>
            <span className="table_cell">
              Ξ {priceLabel}
            </span>
            <span className="table_cell time_content">
              <span>{timeLabel}</span>
            </span>
            <span className="table_cell">
              <span className="expire-wrapper">{ this.renderExpirationBadge() }</span>
            </span>
            <span className="table_cell truncate">
              <a className="truncate" style={{width:'90%'}}>
                <img src={asset.imageUrlThumbnail} style={previewStyle} />
                {asset.tokenAddress} #{asset.tokenId}
              </a>
            </span>
            {isOwner
              ? this.renderAcceptOfferButton()
              : this.renderBuyButton()
            }
          </div>
        }
      </div>
    )
  }
}
