import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CampaignDetail extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    const {
      data: {
        Campaign: {
          title,
          description,
          imageUrl,
        },
      },
    } = this.props

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {title}
        </div>
      </div>
    )
  }
}

const CampaignQuery = gql`
  query Campaign($slug: String!) {
    Campaign(slug: $slug) {
      title
      description
      imageUrl
    }
  }
`

const CampaignDetailWithData = graphql(CampaignQuery, {
  options: (ownProps) => ({
    forceFetch: true,
    variables: {
      slug: ownProps.params.campaignSlug
    },
  })
})(withRouter(CampaignDetail))

export default CampaignDetailWithData
