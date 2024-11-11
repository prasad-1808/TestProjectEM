// src/Pages/Event/EventAlbum.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust based on your api service

function EventAlbum() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch files from the backend API
  const fetchFiles = async () => {
    try {
      const response = await api.get("/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Pass the access token in the header
        },
      });
      setFiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };

  // Use useEffect to load files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Event Album</h2>
      <div>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <h3>{file.name}</h3>
                {file.mimeType.startsWith("image/") && (
                  <img
                    src={`https://drive.google.com/uc?id=${file.id}`}
                    alt={file.name}
                    style={{ width: "200px", height: "auto" }}
                  />
                )}
                {file.mimeType === "application/pdf" && (
                  <a
                    href={`https://drive.google.com/file/d/${file.id}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No files found in Google Drive.</p>
        )}
      </div>
    </div>
  );
}

export default EventAlbum;
