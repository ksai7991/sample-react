import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { S3 } from "@aws-sdk/client-s3";

export default function App() {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    try {
      const s3Client = new S3({
        // Configure your S3 client options here
        region: "YOUR_REGION",
        credentials: {
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET,
        },
      });

      const response = await s3Client.putObject({
        Bucket: "YOUR_BUCKET_NAME",
        Key: `images/${file.name}`,
        Body: file,
        ACL: "public-read",
      });
      
      console.log("Image uploaded successfully:", response);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="app min-h-screen text-blue-200 flex items-center flex-col p-20">
      {/* Existing UI code */}
      <div className="mb-10 grid grid-cols-4 grid-rows-2 w-1/2 mx-auto">
        {/* Existing logo images */}
      </div>
      {/* Existing welcome message and buttons */}
      
      {/* New image upload button */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
