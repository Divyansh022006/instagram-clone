import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { uploadImage } from "../services/imageUpload";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const { user } = useContext(AuthContext);

  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handlePost() {
    if (!imageFile || !caption) {
      alert("Please choose an image and enter a caption.");
      return;
    }

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const imageUrl = await uploadImage(imageFile);

      // Save post to Firestore
      await addDoc(collection(db, "posts"), {
        username: user.email,
        image: imageUrl,
        caption,
        likes: 0,
        createdAt: new Date(), // ✅ Timestamp added
      });

      alert("Post created successfully!");

      setCaption("");
      setImageFile(null);

      navigate("/");
    } catch (error) {
      alert("Failed to create post. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "500px", margin: "30px auto" }}>
        <h2>Create Post</h2>

        <p>
          <strong>Posting as:</strong> {user?.email}
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <br />
        <br />

        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            height: "100px",
          }}
        />

        <br />
        <br />

        <button onClick={handlePost} disabled={loading}>
          {loading ? "Uploading..." : "Post"}
        </button>
      </div>
    </>
  );
}

export default CreatePost;