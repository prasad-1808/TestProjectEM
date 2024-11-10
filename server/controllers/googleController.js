const { google } = require('googleapis');
const googleService = require('../services/googleServices');

// OAuth2 Client setup
const oauth2Client = googleService.oauth2Client;

// Controller to generate auth URL
exports.getAuthUrl = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  res.json({ url: authUrl });
};

// Controller to handle OAuth2 callback and exchange code for tokens
exports.getTokens = async (req, res) => {
  const { code } = req.body;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to list folders in Google Drive
exports.listFolders = async (req, res) => {
  try {
    const files = await googleService.listFiles("mimeType='application/vnd.google-apps.folder'");
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to list files inside a specific folder
exports.listFilesInFolder = async (req, res) => {
  const { folderId } = req.params;
  try {
    const files = await googleService.listFiles(`'${folderId}' in parents`);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
