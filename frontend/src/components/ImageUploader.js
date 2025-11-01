import React, { useState } from "react";
import api from "../api/api";

export default function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Show preview before upload
    }
  };

  const upload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("images/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload(res.data); // Pass uploaded image info to parent
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed. Check backend or API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            marginTop: "10px",
            maxWidth: "400px",
            maxHeight: "300px",
            border: "1px solid #ccc",
          }}
        />
      )}
      <br />
      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
