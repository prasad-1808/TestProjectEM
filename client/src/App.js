import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [authUrl, setAuthUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  // Get the Google OAuth URL
  const getAuthUrl = async () => {
    const response = await axios.get('http://localhost:5000/api/auth-url');
    setAuthUrl(response.data.url);
  };

  // Handle redirect after Google login
  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const response = await axios.post('http://localhost:5000/api/get-tokens', { code });
      setAccessToken(response.data.access_token);
    }
  };

  // List folders in Google Drive
  const listFolders = async () => {
    const response = await axios.get('http://localhost:5000/api/list-folders', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setFolders(response.data);
  };

  // List files in a specific folder
  const listFiles = async (folderId) => {
    const response = await axios.get(`http://localhost:5000/api/list-files/${folderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setFiles(response.data);
  };

  // Run handleRedirect on initial render
  React.useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div className="App">
      <h1>Google Drive Integration</h1>
      {!accessToken ? (
        <div>
          <button onClick={getAuthUrl}>Sign in with Google</button>
          {authUrl && <a href={authUrl}>Login with Google</a>}
        </div>
      ) : (
        <div>
          <button onClick={listFolders}>List Folders</button>
          <ul>
            {folders.map((folder) => (
              <li key={folder.id}>
                {folder.name}{' '}
                <button onClick={() => listFiles(folder.id)}>List Files</button>
              </li>
            ))}
          </ul>
          <div>
  {files.map((file) => (
    file.mimeType && file.mimeType.startsWith('image/') ? (
      <iframe
        key={file.id}
        src={`https://drive.google.com/file/d/${file.id}/preview`}
        width="640"
        height="480"
        allow="autoplay"
        title={file.name}
      ></iframe>
    ) : null
  ))}
</div>

        </div>
      )}
    </div>
  );
}

export default App;
