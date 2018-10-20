import React from 'react'
import styled from 'styled-components';

export default class BundleMetadata extends React.Component {
  render() {
    const { bundle } = this.props

    return (
      <React.Fragment>
        <a target="_blank" rel="noopener noreferrer" className="text-center d-inline-block m-100" href={bundle.permalink}>
          <DivImgWrapper>
            {bundle.assets.map((asset, i) =>
              <img
                className="small"
                alt="Asset Bundle artwork"
                key={i}
                src={asset.imageUrlThumbnail || asset.imageUrl} />
            )}
          </DivImgWrapper>
        </a>
          
        <div className="card-body h-25">
          <h5 className="card-title">{bundle.name}</h5>
          <p className="card-text text-truncate">
            <a target="_blank" rel="noopener noreferrer" href={bundle.permalink} className="card-link">
              {bundle.description}
              <br />
              {bundle.externalLink}
            </a>
          </p>
        </div>
      </React.Fragment>
    )
  }
}

const DivImgWrapper = styled.div`
  min-height: 120px;
  max-height: 240px;
  overflow-y: auto;
  padding: 5px 0;
`