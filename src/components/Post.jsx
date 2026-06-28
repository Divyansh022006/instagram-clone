import { useState, useContext } from "react";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import Comments from "./Comments";
import { AuthContext } from "../context/AuthContext";

function Post({
  id,
  username,
  image,
  caption,
  likes,
  createdAt,
}) {
  const { user } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const [editing, setEditing] = useState(false);
  const [newCaption, setNewCaption] = useState(caption);

  // Format timestamp
  const formattedDate = createdAt
    ? new Date(createdAt.seconds * 1000).toLocaleString()
    : "Just now";

  async function handleLike() {
    try {
      const newLikes = liked ? likeCount - 1 : likeCount + 1;

      setLikeCount(newLikes);
      setLiked(!liked);

      await updateDoc(doc(db, "posts", id), {
        likes: newLikes,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleUpdate() {
    try {
      await updateDoc(doc(db, "posts", id), {
        caption: newCaption,
      });

      setEditing(false);
      alert("Caption updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      alert("Post deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div
      className="post"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "20px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <div className="post-header">
        <h3>{username}</h3>
        <small style={{ color: "gray" }}>
          🕒 {formattedDate}
        </small>
      </div>

      <img
        src={image}
        alt="Post"
        style={{
          width: "100%",
          borderRadius: "10px",
        }}
      />

      <div className="post-content">
        <button onClick={handleLike}>
          {liked ? "❤️ Unlike" : "🤍 Like"}
        </button>

        <p>{likeCount} Likes</p>

        {editing ? (
          <>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
            />

            <button
              onClick={handleUpdate}
              style={{
                background: "green",
                marginTop: "10px",
              }}
            >
              💾 Save
            </button>
          </>
        ) : (
          <p>{caption}</p>
        )}

        {user?.email === username && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => setEditing(true)}
              style={{ background: "orange" }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={handleDelete}
              style={{ background: "red" }}
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <Comments postId={id} />
      </div>
    </div>
  );
}

export default Post;