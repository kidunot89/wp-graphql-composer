import React from 'react'

const Page = ({ id, title, content }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  )
}

export default Page;
