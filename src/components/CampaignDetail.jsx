import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Comment from '../components/Comment'


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
          comments,
        },
      },
    } = this.props

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          <div className='pa3 bg-black-05 ma3'>
            <div
              className='w-100'
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                paddingBottom: '100%',
              }}
            />
            <div className='pt3 f3'>
              {title}
            </div>
            <div className='pt3 f6'>
              {description}
            </div>
            <div>
              {comments.map((comment) =>
                <Comment
                  key={comment.id}
                  {...comment}
                />
              )}
            </div>
          </div>
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
      comments {
        id
        author
        content
      }
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
