import React, { useRef, useState, useEffect } from "react";
import api from "../api/api";

export default function CanvasAnnotator({ image }) {
  const canvasRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const [start, setStart] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgObj, setImgObj] = useState(null);

  const handleMouseDown = (e) => {
    setStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = (e) => {
    const newBox = {
      x: start.x,
      y: start.y,
      w: e.nativeEvent.offsetX - start.x,
      h: e.nativeEvent.offsetY - start.y,
      label: "object",
    };
    setBoxes((prev) => [...prev, newBox]);
  };

  const saveAnnotations = async () => {
    try {
      console.log('Current boxes to save:', boxes);
      console.log('Current image:', image);
      
      if (boxes.length === 0) {
        alert("No annotations to save. Please draw some rectangles first.");
        return;
      }

      for (const box of boxes) {
        const annotationData = {
          image: image.id,
          label: box.label,
          x: box.x,
          y: box.y,
          width: box.w,
          height: box.h,
        };
        console.log('Saving annotation:', annotationData);
        const response = await api.post("annotations/", annotationData);
        console.log('Annotation saved successfully:', response.data);
      }

      // Verify annotations were saved by loading them again
      const verifyResponse = await api.get(`annotations/?image=${image.id}`);
      console.log('Verification - loaded annotations:', verifyResponse.data);
      
      // Reload annotations from server after save
      await loadAnnotations();
      alert("✅ Annotations saved to backend!");
    } catch (error) {
      console.error("Error saving annotations:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert("❌ Failed to save annotations. Check console for details.");
    }
  };

  // 🔹 Load the image only once
  // Load existing annotations
  const loadAnnotations = React.useCallback(async () => {
    try {
      const res = await api.get(`annotations/?image=${image.id}`);
      console.log('Loading existing annotations:', res.data);
      const loadedBoxes = res.data.map(ann => ({
        x: ann.x,
        y: ann.y,
        w: ann.width,
        h: ann.height,
        label: ann.label
      }));
      setBoxes(loadedBoxes);
    } catch (error) {
      console.error('Error loading annotations:', error);
    }
  }, [image.id]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    // Ensure correct full URL
    const imgUrl = image.file.startsWith("http")
      ? image.file
      : `http://127.0.0.1:8000${image.file}`;

    img.src = imgUrl;

    img.onload = () => {
      setImgObj(img);
      setImgLoaded(true);
      // Load annotations after image loads
      loadAnnotations();
    };

    img.onerror = (err) => {
      console.error("❌ Failed to load image:", err, imgUrl);
    };
  }, [image, loadAnnotations]);

  // 🔹 Draw image + boxes
  useEffect(() => {
    if (!imgLoaded || !imgObj) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);

    boxes.forEach((b) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    });
  }, [boxes, imgLoaded, imgObj]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          border: "1px solid black",
          backgroundColor: "#fafafa",
          cursor: "crosshair",
        }}
      />
      <br />
      <button onClick={saveAnnotations}>💾 Save Annotations</button>
    </div>
  );
}
