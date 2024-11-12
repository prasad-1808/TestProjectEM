import React, { useState, useEffect } from "react";
import api from "../../services/api";

function EventAlbum() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const response = await api.get("/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Event Album
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {files.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <li
                key={file.id}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {file.name}
                  </h3>
                  {file.mimeType.startsWith("image/") && (
                    <img
                      src={`https://drive.google.com/uc?id=${file.id}`}
                      alt={file.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  {file.mimeType === "application/pdf" && (
                    <div className="mt-4">
                      <a
                        href={`https://drive.google.com/file/d/${file.id}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
                      >
                        View PDF
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No files found in Google Drive.
          </p>
        )}
      </div>
    </div>
  );
}

export default EventAlbum;
