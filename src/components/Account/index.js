import React from 'react'
import PropTypes from 'prop-types'
import { OPENSEA_URL } from '../../constants';
const MAX_ADDR_LEN = 6

export default class Account extends React.Component {

  static propTypes = {
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired
      })
    }).isRequired,
    showImage: PropTypes.bool
  }

  render() {
    const { account, showImage } = this.props;
    const _username = account.user
      ? account.user.username
      : null;
    const _address = account.address;
    const displayName = _username ? _username : _address.substring(2, MAX_ADDR_LEN + 2).toUpperCase();

    return (
      <a target="_blank" rel="noopener noreferrer" href={`${OPENSEA_URL}/accounts/${_address}`}>
        {showImage && account
          ? <div style={{backgroundImage:'url("'+account.image+'")'}} />
          : null
        }
        <span>{displayName}</span>
      </a>
    )
  }
}
