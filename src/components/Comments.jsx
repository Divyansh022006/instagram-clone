import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

function Comments({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  async function handleComment() {
    if (comment.trim() === "") return;

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        user: auth.currentUser.email,
        text: comment,
      });

      setComment("");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ marginTop: "15px" }}>
      <h4>💬 Comments</h4>

      {comments.map((c) => (
        <p key={c.id}>
          <strong>{c.user}:</strong> {c.text}
        </p>
      ))}

      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "10px",
        }}
      />

      <button
        onClick={handleComment}
        style={{ marginTop: "10px" }}
      >
        Add Comment
      </button>
    </div>
  );
}

export default Comments;