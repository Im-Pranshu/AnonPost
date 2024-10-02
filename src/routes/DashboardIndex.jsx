import React from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function DashboardIndex() {
  return (
    <div className='dashboardIndex'>
        <h2>All Posts (10)</h2>
        <div className='dashboardIndex'>
            <Link to={"/dashboard/post-description"} className="post">
                <p>This is Post Title</p>
                <div className='postDetails'>
                    <p>12 Comment</p>
                    <p>10 Reply</p>
                </div>
            </Link>
            <Link to={"/post-description"} className="post">
                <p>This is Post 2 Title</p>
                <div className='postDetails'>
                    <p>1 Comment</p>
                    <p>5 Reply</p>
                </div>
            </Link>
            <Link to={"/post-description"} className="post">
                <p>This is Post 3 Title</p>
                <div className='postDetails'>
                    <p>2 Comment</p>
                    <p>30 Reply</p>
                </div>
            </Link>
            <Link to={"/post-description"} className="post">
                <p>This is Post 4 Title</p>
                <div className='postDetails'>
                    <p>1 Comment</p>
                    <p>10 Reply</p>
                </div>
            </Link>
        </div>     

        <div className="dashboardOutlet">
            <Outlet/>
        </div>   
    </div>
  )
}
