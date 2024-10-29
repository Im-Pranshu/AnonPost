import { React, useEffect, useRef, useTransition } from "react";
import {
  useParams,
  useOutletContext,
  useFetcher,
  redirect,
} from "react-router-dom";
// Importing useParams from react-router-dom to extract parameters (like postId) from the URL.

import {
  getDoc,
  query,
  where,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Make sure to import your Firestore configuration

export default function PostDescription() {
  const { postId } = useParams();
  // Extracting the postId from the URL using useParams. This will allow us to identify which post to display.

  const posts = useOutletContext(); // Access posts data from Outlet context

  const post = posts.find((p) => p.id === postId); // Find the post by ID

  // If the post is not found or still loading, show a loader
  if (!post) return <div className="loader">Loading...</div>;

  // Destructuring the 'post' object
  const { title, description, commentReply, comments } = post;

  // Logic to clear the form after submitting.
  const fetcher = useFetcher();
  const commentFormRef = useRef(null);
  const replyFormRefs = useRef([]); // Array to manage multiple reply forms

  // Clear input fields after submission
  useEffect(() => {
    if (fetcher.state === "idle") {
      commentFormRef.current?.reset();
      replyFormRefs.current.forEach((form) => form?.reset());
    }
  }, [fetcher.state]);

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
              <fetcher.Form
                ref={(el) => (replyFormRefs.current[index] = el)}
                className="replyForm"
                method="post"
              >
                {/* Pass commentIndex */}
                <input type="hidden" name="commentIndex" value={index} />
                {/* Hidden input for index of comment*/}
                <input type="hidden" name="postId" value={postId} />

                <input
                  name="replyOnComment"
                  placeholder="Reply to this comment"
                  className="replyOfReply"
                  autoComplete="off" // Disable autocomplete for comment input
                  required
                />
                <button className="allBtn" type="submit">
                  Reply
                </button>
              </fetcher.Form>
            </div>
          ))}

          <fetcher.Form
            ref={commentFormRef}
            className="commentForm"
            method="post"
          >
            {/* Hidden input for index */}
            <input type="hidden" name="postId" value={postId} />

            <input
              name="addComment"
              placeholder="Comment on this post."
              autoComplete="off" // Disable autocomplete for comment input
              required
            />

            <button className="allBtn" type="submit">
              Add New Comment
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

// Action function for handling comment and reply submissions
export async function action({ request }) {
  const formData = await request.formData();

  const postId = formData.get("postId"); // Assuming you pass postId in the forms
  const comment = formData.get("addComment");
  const reply = formData.get("replyOnComment");

  // Query the collection for the document with the "id" field matching postId (like post5)
  const postsCollectionRef = collection(db, "posts");
  const q = query(postsCollectionRef, where("id", "==", postId));
  const querySnapshot = await getDocs(q);

  let postDocRef;
  if (!querySnapshot.empty) {
    // Get the first document that matches the query
    postDocRef = querySnapshot.docs[0].ref;
  } else {
    throw new Error("No document found with the specified postId : ", postId);
  }

  // access the name of current user to store in comment or reply
  const userName = localStorage.getItem("userName");

  if (comment) {
    // Handle adding a new comment

    await updateDoc(postDocRef, {
      comments: arrayUnion({
        commenter: userName,
        comment,
        replies: [], // Start with no replies
      }), // Replace "Your Name" with actual commenter
      "commentReply.commentsCount": increment(1), // Update comments count
    });
  } else if (reply) {
    // Add a reply to an existing comment
    const commentIndex = formData.get("commentIndex"); // Get the index of the comment to reply to

    // Fetch the post document to get the current comments array
    const postSnapshot = await getDoc(postDocRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data();
      const comments = post.comments || [];

      // Make sure the comment exists
      if (comments[commentIndex]) {
        comments[commentIndex].replies = comments[commentIndex].replies || [];
        comments[commentIndex].replies.push({
          replier: userName, // Use actual replier dynamically
          reply,
        });

        // Use Firestore's update method to add the new reply
        await updateDoc(postDocRef, {
          comments: comments, // Update the entire comments array
          "commentReply.repliesCount": increment(1),
        });
      }
    }
  }

  // Redirect back to the post description after updating
  return redirect(`/dashboard/${postId}`);
}
