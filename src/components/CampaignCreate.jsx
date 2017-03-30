import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { slugify } from 'underscore.string'

class CampaignCreate extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    addPost: React.PropTypes.func,
  }

  state = {
    title: '',
    description: '',
    imageUrl: '',
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.title}
            placeholder='Title'
            onChange={(e) => this.setState({title: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.title && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  handlePost = () => {
    const {
      title,
      slug = slugify(title),
      description,
      imageUrl,
    } = this.state
    
    this.props.addCampaign({
      slug,
      title,
      description,
      imageUrl,
    })
      .then(() => {
        this.props.router.push('/')
      })
  }
}

const addMutation = gql`
  mutation addCampaign(
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
      slug
      title
      description
      imageUrl
    }
  }
`

const CampaignCreateWithMutation = graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addCampaign: ({ slug, title, description, imageUrl }) =>
      mutate({
        variables: { slug, title, description, imageUrl },
        updateQueries: {
          allCampaigns: (state, { mutationResult }) => {
            const newCampaign = mutationResult.data.createCampaign
            return {
              allCampaigns: [...state.allCampaigns, newCampaign]
            }
          },
        },
      })
  })
})(withRouter(CampaignCreate))

export default CampaignCreateWithMutation
