import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { slugify } from 'underscore.string'

class CampaignCreate extends React.Component {
  state = {
    title: '',
    description: '',
    imageUrl: '',
    goal: 200,
    duration: 30,
  }

  render () {
    const {
      title,
      description,
      imageUrl,
      goal,
      duration,
    } = this.state

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={title}
            placeholder='Title'
            onChange={(e) => this.setState({title: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={goal}
            placeholder='Goal (miles)'
            onChange={(e) => this.setState({goal: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={duration}
            placeholder='Duration (days)'
            onChange={(e) => this.setState({duration: e.target.value})}
          />
          {imageUrl &&
            <img src={imageUrl} role='presentation' className='w-100 mv3' />
          }
          <button
            className='pa3 bg-black-10 bn dim ttu pointer'
            onClick={this.handlePost}
            disabled={!(title && imageUrl && goal && duration)}
          >
            Create Campaign
          </button>
        </div>
      </div>
    )
  }

  handlePost = () => {
    this.props.mutate({variables: {
      slug: slugify(this.state.title),
      title: this.state.title,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      goal: this.state.goal,
      duration: this.state.duration,
      start: new Date(),
    }})
      .then(({data}) => {
        this.props.router.push(`/campaigns/${data.createCampaign.slug}`)
      })
  }
}

const createCampaign = gql`
  mutation createCampaign(
    $slug: String!,
    $title: String!,
    $description: String!,
    $imageUrl: String!
    $goal: Int!
    $duration: Int!
    $start: DateTime!
  ) {
    createCampaign(
      slug: $slug,
      title: $title,
      description: $description,
      imageUrl: $imageUrl,
      goal: $goal,
      duration: $duration,
      start: $start
    ) {
      slug
    }
  }
`

const CampaignCreateWithMutation = graphql(createCampaign)(withRouter(CampaignCreate))

export default CampaignCreateWithMutation
