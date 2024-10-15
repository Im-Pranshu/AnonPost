import React from 'react'
import {Link} from 'react-router-dom'

export const Post = () => {
  return (
        <div className='dashboardIndex'>
            <Link to={"/dashboard/post1"} className="post">
                <p>This is Post Title</p>
                <div className='postDetails'>
                    <p>12 Comment</p>
                    <p>10 Reply</p>
                </div>
            </Link>
            <Link to={"/dashboard/post2"} className="post">
                <p>This is Post 2 Title</p>
                <div className='postDetails'>
                    <p>1 Comment</p>
                    <p>5 Reply</p>
                </div>
            </Link>
            <Link to={"/dashboard/post3"} className="post">
                <p>This is Post 3 Title</p>
                <div className='postDetails'>
                    <p>2 Comment</p>
                    <p>30 Reply</p>
                </div>
            </Link>
            <Link to={"/dashboard/post4"} className="post">
                <p>This is Post 4 Title</p>
                <div className='postDetails'>
                    <p>1 Comment</p>
                    <p>10 Reply</p>
                </div>
            </Link>
        </div>
  )
}
