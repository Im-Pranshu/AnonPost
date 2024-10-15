import React from 'react'
import {Form,} from 'react-router-dom'

export default function CreatePost() {
  return (
    <div className="createPostRoute">   
        <Form>
            <input type="text" name="post-title" id="post-title" placeholder='Post Title..' />
            <textarea name="post-description" id="post-description" placeholder='Describe your post...'></textarea>
            <button className='submitPost'>Post Submit</button>
        </Form>
    </div>
  )
}
