import React from 'react'

class CampaignListItem extends React.Component {

  static propTypes = {
    campaign: React.PropTypes.object,
  }

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.campaign.imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
        <div className='pt3'>
          {this.props.campaign.title}
        </div>
      </div>
    )
  }
}

export default CampaignListItem
