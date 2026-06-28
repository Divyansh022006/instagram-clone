import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password.";

      default:
        return "Something went wrong. Please try again.";
    }
  }

  async function handleRegister() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      alert(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "30px auto",
        }}
      >
        <h1>🔐 Register / Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Create Account"}
        </button>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            marginLeft: "10px",
          }}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </div>
    </>
  );
}

export default Login;