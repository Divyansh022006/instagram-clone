import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#fff",
        borderBottom: "1px solid #dbdbdb",
        position: "sticky",
        top: 0,
        zIndex: 100,
        flexWrap: "wrap",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "cursive",
          fontSize: "30px",
          color: "#E1306C",
        }}
      >
        📸 Instagram Clone
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <NavLink to="/">🏠</NavLink>

        <NavLink to="/search">🔍</NavLink>

        <NavLink to="/create">➕</NavLink>

        <NavLink to="/profile">👤</NavLink>

        {user && (
          <span
            style={{
              fontSize: "14px",
              color: "#555",
              fontWeight: "bold",
            }}
          >
            {user.email}
          </span>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;