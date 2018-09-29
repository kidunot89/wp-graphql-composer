import React from 'react'

const Post = ({ id, title, content }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  )
}

export default Post;