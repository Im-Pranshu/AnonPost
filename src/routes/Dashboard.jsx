import React from 'react'
import {Link,Outlet} from 'react-router-dom'
import addPost from '../assets/add-post.png'

export default function Dashboard() {
  return (
    <div className='dashboard'>
        <div>
            <div className='tabs'>
                <Link to={"/dashboard"} className='active tabLink'>All Post</Link>
                <Link className='tabLink'>Commented Post</Link>
                <Link className='tabLink'>Replied Post</Link>
                <Link to={"/dashboard/create-post"} className='createPost'><img src={addPost} alt="add post logo" /> Create Post</Link>
            </div>
        </div>
        <div className='details'>
            <Outlet/>
        </div>
    </div>
  )
}
