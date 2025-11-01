import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import CanvasAnnotator from "./components/CanvasAnnotator";
import ExportAnnotations from "./components/ExportAnnotations";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🖼️ Image Annotation Tool</h2>

      {!uploadedImage ? (
        <ImageUploader onUpload={setUploadedImage} />
      ) : (
        <div>
          <CanvasAnnotator image={uploadedImage} />
          <br />
          <ExportAnnotations image={uploadedImage} />
          <br />
          <button
            onClick={() => setUploadedImage(null)}
            style={{ marginTop: "10px" }}
          >
            🔁 Upload New Image
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
