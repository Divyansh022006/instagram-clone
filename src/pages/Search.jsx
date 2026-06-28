import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

function Search() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));

        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <h2>🔍 Search Users</h2>

        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              image={post.image}
              caption={post.caption}
              likes={post.likes}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Search;