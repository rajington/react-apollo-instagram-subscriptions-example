import React from 'react'
import { Link } from 'react-router'
import CampaignListItem from '../components/CampaignListItem'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ListPage = ({
  data: {
    loading,
    allCampaigns,
  }
}) => {
  if (loading) {
    return (<div>Loading</div>)
  }
  return (
    <div className='w-100 flex justify-center'>
      <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
        + Start a Cause
      </Link>
      <div className='w-100' style={{ maxWidth: 400 }}>
        {allCampaigns.map((campaign) =>
          <Link
            key={campaign.id}
            to={`/causes/${campaign.slug}`}
          >
            <CampaignListItem campaign={campaign} />
          </Link>
        )}
      </div>
    </div>
  )
}

const FeedQuery = gql`
  query allCampaigns {
    allCampaigns(orderBy: createdAt_DESC) {
      id
      slug
      title
      imageUrl
    }
  }
`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    forceFetch: true
  }
})(ListPage)

export default ListPageWithData
