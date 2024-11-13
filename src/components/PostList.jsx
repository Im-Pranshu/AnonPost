import React from "react";
import { Link } from "react-router-dom";

const PostList = ({
  posts,
  isMyPosts,
  isCommentedPosts,
  isRepliedPosts,
  userUID,
}) => {
  const filteredPosts = posts.filter((post) => {
    // Ensure comments and replies are arrays, even if not defined
    const comments = post.comments || [];

    if (isMyPosts) {
      return post.createdBy === userUID; // Filter for posts created by the user
    }

    if (isCommentedPosts) {
      // Check if the user has commented on any comment in the post
      const hasCommented = comments.some(
        (comment) => comment.createdBy === userUID // Check if the user commented on the post
      );
      //   console.log(hasCommented, " USer ID : ", userUID);

      return post.commentReply.commentsCount > 0 && hasCommented;
    }

    if (isRepliedPosts) {
      // Check if the user has replied to any comment in the post
      const hasReplied = comments.some((comment) =>
        comment.replies?.some((reply) => reply.replierUID === userUID)
      );
      return post.commentReply.repliesCount > 0 && hasReplied;
    }

    return true; // Default case: show all posts
  });

  return (
    <div className="dashboardIndex">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Link to={`/dashboard/${post.id}`} className="post" key={post.id}>
            <p>{post.title}</p>
            <div className="postDetails">
              {/* Display comments and replies count */}
              <p>{post.commentReply.commentsCount} Comment</p>
              <p>{post.commentReply.repliesCount} Reply</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
