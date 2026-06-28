import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        {user ? (
          <h2>Welcome, {user.email} 👋</h2>
        ) : (
          <h2>Please log in.</h2>
        )}
      </div>

      <Feed />
    </>
  );
}

export default Home;