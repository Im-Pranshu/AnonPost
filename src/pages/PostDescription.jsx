import { React } from "react";
import { useParams, useOutletContext } from "react-router-dom";
// Importing useParams from react-router-dom to extract parameters (like postId) from the URL.

export default function PostDescription() {
  const { postId } = useParams();
  // Extracting the postId from the URL using useParams. This will allow us to identify which post to display.

  const posts = useOutletContext(); // Access posts data from Outlet context

  const post = posts.find((p) => p.id === postId); // Find the post by ID

  // If the post is not found or still loading, show a loader
  if (!post) return <div className="loader">Loading...</div>;

  // Destructuring the 'post' object
  const { title, description, commentReply, comments } = post;

  return (
    <div className="dashboardIndex">
      {/* Main container for the post display, styled with the 'dashboardIndex' class */}

      <div className="postData">
        {/* Container for the post details, styled with the 'postData' class */}

        <h3>{title}</h3>
        {/* Displaying the post title */}

        <p>{description}</p>
        {/* Displaying the post description */}

        <div className="commentReply">
          {/* Container for the comment and reply count */}

          <p>{commentReply.commentsCount} Comments</p>
          {/* Displaying the number of comments */}

          <p>{commentReply.repliesCount} Replies</p>
          {/* Displaying the number of replies */}
        </div>

        <div className="comments">
          {/* Container for displaying all comments */}

          <h3>Comments</h3>
          {/* Heading for the comments section */}

          {comments.map((comment, index) => (
            // Mapping over each comment in the 'comments' array to display them.
            // 'index' is used as a key for each comment to uniquely identify each element in the list.

            <div key={index}>
              {/* Key is assigned to each comment for React's list rendering */}

              <p className="reply">
                {/* Each comment is displayed here */}
                {comment.commenter}: {comment.comment}
                {/* Displaying the commenter name and the comment itself */}
              </p>

              {comment.replies.map((reply, idx) => (
                // Mapping over each reply within the comment to display the replies.

                <p key={idx} className="replyOfReply">
                  {/* Each reply is displayed with a key and styled with 'replyOfReply' */}
                  {reply.replier}: {reply.reply}
                  {/* Displaying the replier's name and the reply itself */}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
