import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toUnitAmount } from '../../constants';

export default class SalePrice extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  }

  render() {
    const { order } = this.props
    const { currentPrice, paymentTokenContract } = order
    const price = toUnitAmount(currentPrice, paymentTokenContract)
    const priceLabel = parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
    const isETH = paymentTokenContract.symbol === "ETH"

    return (
      <SpanSalePrice>
        {isETH
          ? "Ξ"
          : null
        }
        {priceLabel} {isETH ? null : paymentTokenContract.symbol}
      </SpanSalePrice>
    )
  }
}

const SpanSalePrice = styled.span`
  img {
    height: 15px !important;
  }
`