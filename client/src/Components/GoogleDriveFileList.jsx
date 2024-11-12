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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white p-6 rounded-lg shadow-2xl text-center">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Your Google Drive Files
        </h2>
        {files.length > 0 ? (
          <ul className="space-y-3">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-800 font-medium">{file.name}</span>
                <span className="text-gray-500 text-sm italic">
                  {file.mimeType}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No files found.</p>
        )}
      </div>
    </div>
  );
}

export default GoogleDriveFileList;
