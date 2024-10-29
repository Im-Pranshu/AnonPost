import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";
import Button from "../components/Button";

export default function CreatePost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; // Check if the form is being submitted

  return (
    <div className="createPostRoute">
      <Form method="post">
        <input
          type="text"
          name="post-title"
          id="post-title"
          placeholder="Post Title.."
          autoComplete="off" // Disable autocomplete for comment input
          required
        />
        <textarea
          name="post-description"
          id="post-description"
          placeholder="Describe your post..."
          autoComplete="off" // Disable autocomplete for comment input
          required
        ></textarea>
        <Button
          content={"Submit Post"}
          clickStatus={isSubmitting}
          customClasses={"submitPost"}
        />
        ;
      </Form>
    </div>
  );
}

// Action function for handling post submission
export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("post-title");
  const description = formData.get("post-description");

  // Get the current user's ID
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated"); // Make sure the user is logged in
  }
  const userId = user.uid;

  // Reference to the counter document (could be in a separate collection for metadata)
  const counterDocRef = doc(db, "metadata", "postCounter");

  // Fetch the current post counter
  const counterSnapshot = await getDoc(counterDocRef);

  let newPostId;

  if (counterSnapshot.exists()) {
    const currentCounter = counterSnapshot.data().count;

    // Use the current counter to generate the new post ID
    newPostId = "post" + (currentCounter + 1);

    // Increment the counter in Firestore for future posts
    await updateDoc(counterDocRef, {
      count: increment(1),
    });
  } else {
    // If no counter exists, start from 1
    newPostId = "post1";

    // Initialize the counter document with count 1
    await setDoc(counterDocRef, {
      count: 1,
    });
  }

  const postCollection = collection(db, "posts");

  // Create the new post in the 'posts' collection
  await addDoc(postCollection, {
    createdAt: serverTimestamp(), // Add a timestamp to track when the post was created
    id: newPostId, // Use the calculated ID
    createdBy: userId, // Store the user ID with the post
    title,
    description,
    commentReply: { commentsCount: 0, repliesCount: 0 },
    comments: [],
  });

  // Redirect to the dashboard after creating the post
  return redirect("/dashboard");
}
