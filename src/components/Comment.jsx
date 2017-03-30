import React from 'react'

export const Comment = ({
  author,
  content,
}) => (
  <div className='pt5'>
    {author} says {content}
  </div>
)

export default Comment
