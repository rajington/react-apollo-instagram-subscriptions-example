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
  }

  render () {
    const {
      title,
      description,
      imageUrl,
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
          {imageUrl &&
            <img src={imageUrl} role='presentation' className='w-100 mv3' />
          }
          {title && imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
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
    }})
      .then(() => {
        this.props.router.push('/')
      })
  }
}

const createCampaign = gql`
  mutation createCampaign(
    $slug: String!,
    $title: String!,
    $description: String!,
    $imageUrl: String!
  ) {
    createCampaign(
      slug: $slug,
      title: $title,
      description: $description,
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`

const CampaignCreateWithMutation = graphql(createCampaign)(withRouter(CampaignCreate))

export default CampaignCreateWithMutation
