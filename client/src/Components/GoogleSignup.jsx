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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Google Drive Integration
        </h2>
        {!accessToken ? (
          <div className="text-center">
            <a
              href="http://localhost:5000/api/auth/google"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              Sign in with Google
            </a>
          </div>
        ) : (
          <div>
            <button
              onClick={listFolders}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 mb-4 w-full"
            >
              List Folders
            </button>
            <ul className="space-y-3 mb-6">
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {folder.name}
                  </span>
                  <button
                    onClick={() => listFiles(folder.id)}
                    className="text-sm text-blue-500 font-semibold hover:underline"
                  >
                    List Files
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-6">
              {files.map((file) =>
                file.mimeType && file.mimeType.startsWith("image/") ? (
                  <div key={file.id} className="flex justify-center">
                    <iframe
                      src={`https://drive.google.com/file/d/${file.id}/preview`}
                      width="640"
                      height="480"
                      allow="autoplay"
                      title={file.name}
                      className="rounded-lg shadow-md"
                    ></iframe>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleSignup;
