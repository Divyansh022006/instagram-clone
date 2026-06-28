import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/firebase";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <h3>No posts yet.</h3>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            image={post.image}
            caption={post.caption}
            likes={post.likes}
            createdAt={post.createdAt}
          />
        ))
      )}
    </div>
  );
}

export default Feed;