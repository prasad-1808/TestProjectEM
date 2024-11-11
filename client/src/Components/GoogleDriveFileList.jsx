// GoogleDriveFileList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function GoogleDriveFileList() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Access token is missing. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://www.googleapis.com/drive/v3/files",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { fields: "files(id, name, mimeType)" },
          }
        );
        setFiles(response.data.files);
      } catch (err) {
        setError("Failed to fetch files. Please check your access token.");
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Google Drive Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} ({file.mimeType})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleDriveFileList;
