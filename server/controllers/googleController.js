const { google } = require("googleapis");
const googleService = require("../services/googleServices");

// OAuth2 Client setup
const oauth2Client = googleService.oauth2Client;

// Controller to generate the Google OAuth URL and redirect the user
exports.redirectToGoogleAuth = (req, res) => {
  // Generate the authentication URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // To get refresh tokens
    scope: ["https://www.googleapis.com/auth/drive.readonly"], // Google Drive read-only scope
  });

  // Redirect the user to the Google OAuth consent screen
  console.log(authUrl);
  res.redirect(authUrl);
};

// Controller to handle OAuth2 callback and exchange code for tokens
exports.handleGoogleAuthCallback = async (req, res) => {
  const { code } = req.query; // The authorization code from the URL query string
  console.log("Received code:", code);

  try {
    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Optionally, store the tokens in your session or database here
    // For now, we're just sending them back to the frontend
    console.log(`http://localhost:3000?access_token=${tokens.access_token}`);
    res.session('google_access_token', tokens.access_token);
    res.redirect(`http://localhost:3000?access_token=${tokens.access_token}`);
    // You could also store the tokens in a session or a secure cookie for later use.
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(400).json({ error: error.message });
  }
};

// Controller to list folders in Google Drive
exports.listFolders = async (req, res) => {
  try {
    const files = await googleService.listFiles(
      "mimeType='application/vnd.google-apps.folder'" // Query to fetch only folders
    );
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to list files inside a specific folder
exports.listFilesInFolder = async (req, res) => {
  const { folderId } = req.params;
  try {
    const files = await googleService.listFiles(`'${folderId}' in parents`); // Query to fetch files in the folder
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    // Get access token from the request (from the frontend)
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    // Set the credentials using the access token
    oauth2Client.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // List files in Google Drive
    const response = await drive.files.list({
      pageSize: 10, // Adjust the page size as needed
      fields: "nextPageToken, files(id, name, mimeType)",
    });

    // Send the list of files as the response
    res.json(response.data.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
