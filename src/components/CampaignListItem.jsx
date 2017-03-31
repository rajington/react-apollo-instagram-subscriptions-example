import React from 'react'

const CampaignListItem = ({
  imageUrl,
  title,
}) => (
  <div className='pa3 bg-black-05 ma3'>
    <div
      className='w-100'
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        paddingBottom: '100%',
      }}
    />
    <div className='pt3'>
      {title}
    </div>
  </div>
)

export default CampaignListItem
