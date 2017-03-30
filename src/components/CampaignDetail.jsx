import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

class CampaignDetail extends React.Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newProps.data.Campaign !== this.props.data.Campaign) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription()
        } else {
          // we already have an active subscription with the right params
          return
        }
      }
      this.subscription = newProps.data.subscribeToMore({
        document: gql`
          subscription newComments($slug:String){
            Comment(
              filter:{
                mutation_in:[CREATED]
                node:{
                  campaign:{
                    slug: $slug
                  }
                }
              }
            ) {
              node{
                id
                author
                content
              }
            }
          }
        `,
        variables: {
          slug: newProps.params.campaignSlug,
        },
        updateQuery: (previousState, {subscriptionData}) => {
          const newEntry = subscriptionData.data.Comment.node

          return {
            Campaign: {
              ...previousState.Campaign,
              comments: [
                ...previousState.Campaign.comments,
                newEntry,
              ],
            },
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

    const {
      data: {
        Campaign: {
          id,
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
              <CommentForm
                campaignId={id}
              />
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
      id
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
      slug: ownProps.params.campaignSlug,
    },
  }),
})(withRouter(CampaignDetail))

export default CampaignDetailWithData
