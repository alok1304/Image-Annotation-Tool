import React, { useState } from "react";
import api from "../api/api";
import { saveAs } from "file-saver";

export default function ExportAnnotations({ image }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      if (!image) {
        alert("Please select an image first to export its annotations.");
        return;
      }
      
      setLoading(true);
      console.log('Starting export for image:', image);
      
      // Get annotations only for current image
      const endpoint = `annotations/?image=${image.id}`;
      console.log('Fetching annotations from endpoint:', endpoint);
      
      const res = await api.get(endpoint);
      console.log('API Response:', res);
      console.log('Received annotations data:', res.data);
      console.log('Number of annotations found:', res.data.length);
      
      if (res.data.length === 0) {
        console.log('No annotations found in response');
        alert("No annotations found for this image. Please draw and save annotations first.");
        setLoading(false);
        return;
      }

      // Filter and format annotations data
      const currentImageAnnotations = {
        imageId: image.id,
        annotations: res.data
      };

      // ✅ Create and download JSON file
      const blob = new Blob([JSON.stringify(currentImageAnnotations, null, 2)], {
        type: "application/json",
      });
      const fileName = `annotations_image_${image.id}.json`;

      saveAs(blob, fileName);
    } catch (err) {
      alert("❌ Failed to export annotations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={loading}>
      {loading ? "⏳ Exporting..." : "📤 Export Annotations (JSON)"}
    </button>
  );
}
