import React from 'react'
import { Link } from 'react-router'
import CampaignListItem from '../components/CampaignListItem'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newProps.data.allCampaigns !== this.props.data.allCampaigns) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription()
        } else {
          // we already have an active subscription with the right params
          return
        }
      }
      this.subscription = newProps.data.subscribeToMore({
        document: gql`
          subscription {
            Campaign(filter: {
              mutation_in: [CREATED]
            }) {
              node {
                id
                imageUrl
                title
              }
            }
          }
        `,
        variables: null,

        // this is where the magic happens.
        updateQuery: (previousState, {subscriptionData}) => {
          const newEntry = subscriptionData.data.Campaign.node

          return {
            allCampaigns: [
              {
                ...newEntry
              },
              ...previousState.allCampaigns
            ]
          }
        },
        onError: (err) => console.error(err),
      })
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allCampaigns.map((campaign) =>
            <CampaignListItem key={campaign.id} campaign={campaign} />
          )}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`
  query allCampaigns {
    allCampaigns(orderBy: createdAt_DESC) {
      id
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
