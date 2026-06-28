import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

function Profile() {
  const { user } = useContext(AuthContext);

  const [myPosts, setMyPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));

        const posts = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.username === user?.email);

        setMyPosts(posts);

        // Calculate total likes
        const likes = posts.reduce(
          (total, post) => total + (post.likes || 0),
          0
        );

        setTotalLikes(likes);
      } catch (error) {
        console.log(error);
      }
    }

    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>
            <h2>👤 My Profile</h2>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Total Posts:</strong> {myPosts.length}
            </p>

            <p>
              <strong>Total Likes:</strong> ❤️ {totalLikes}
            </p>
          </div>
        </div>

        <hr />

        <h3 style={{ marginTop: "20px" }}>📷 My Posts</h3>

        {myPosts.length === 0 ? (
          <p>You haven't created any posts yet.</p>
        ) : (
          myPosts.map((post) => (
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
    </>
  );
}

export default Profile;