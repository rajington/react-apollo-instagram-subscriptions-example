import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CommentForm extends React.Component {
  state = {
    author: '',
    content: '',
  }

  render () {
    const {
      author,
      content,
    } = this.state

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={author}
            placeholder='Author'
            onChange={(e) => this.setState({author: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={content}
            placeholder='Comment'
            onChange={(e) => this.setState({content: e.target.value})}
          />
          <button
            className='pa3 bg-black-10 bn dim ttu pointer'
            disabled={!author || !content}
            onClick={this.handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    )
  }

  handleSubmit = () => {
    const {
      author,
      content,
    } = this.state

    const {
      mutate,
      campaignId,
    } = this.props

    mutate({variables: {
      author,
      content,
      campaignId,
    }})
      .then(() => {
        this.setState({
          author: '',
          content: '',
        })
      })
  }
}

const createComment = gql`
  mutation createComment(
    $author: String!,
    $content: String!,
    $campaignId: ID!,
  ) {
    createComment(
      author: $author,
      content: $content,
      campaignId: $campaignId
    ) {
      id
      author
      content
    }
  }
`

const CommentFormWithMutation = graphql(createComment)(CommentForm)

export default CommentFormWithMutation
