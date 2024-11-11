import React, { useState, useEffect } from "react";
import api from "../services/api";

function GoogleSignup() {
  const [accessToken, setAccessToken] = useState("");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    handleRedirect();
  }, []);

  // Handle redirect after Google login (check for code in URL)
  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        // Send the authorization code to the backend to get tokens
        const response = await api.post("/get-tokens", { code });
        setAccessToken(response.data.access_token);
        localStorage.setItem("token", response.data.access_token);
        console.log("Access Token Retrieved:", response.data.access_token); // Debug line
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }
  };

  // List folders in Google Drive
  const listFolders = async () => {
    try {
      const response = await api.get("/list-folders");
      setFolders(response.data);
    } catch (error) {
      console.error("Error listing folders:", error);
    }
  };

  // List files in a specific folder
  const listFiles = async (folderId) => {
    try {
      const response = await api.get(`/list-files/${folderId}`);
      setFiles(response.data);
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  return (
    <div className="GoogleSignup">
      <h2>Google Drive Integration</h2>
      {!accessToken ? (
        <div>
          {/* Redirect to backend for Google OAuth login */}
          <a href="http://localhost:5000/api/auth/google">
            Sign in with Google
          </a>
        </div>
      ) : (
        <div>
          <button onClick={listFolders}>List Folders</button>
          <ul>
            {folders.map((folder) => (
              <li key={folder.id}>
                {folder.name}{" "}
                <button onClick={() => listFiles(folder.id)}>List Files</button>
              </li>
            ))}
          </ul>
          <div>
            {files.map((file) =>
              file.mimeType && file.mimeType.startsWith("image/") ? (
                <iframe
                  key={file.id}
                  src={`https://drive.google.com/file/d/${file.id}/preview`}
                  width="640"
                  height="480"
                  allow="autoplay"
                  title={file.name}
                ></iframe>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleSignup;
