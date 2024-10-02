import React from 'react'

export default function PostDescription() {
  return (
    <div className="dashboardIndex">
        <h2>All Posts (10)</h2>
        <div className="postData">
            <h3>This is Post Title</h3>
            <p>This is the post description for this topic,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <div className='commentReply'>
                <p>12 Comment</p>
                <p>10 Reply</p>
            </div>
            <div className="comments">
                <h3>Comments</h3>
                <p>Jimmy: This is the First Comment for this post</p>
                <p>Dhruv : This is the Second Comment for this post</p>
                <div className="replyToCmt">
                    <p>Ravi : This is the reply for this comment</p>
                    <p>Ravi : Another Reply for this comment</p>
                    <p>Ravi : One More Reply for this comment</p>
                </div>
            </div>
        </div>
    </div>
  )
}
