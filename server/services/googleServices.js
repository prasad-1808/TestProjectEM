require('dotenv').config();  // Load environment variables from .env file

const { google } = require('googleapis');

// OAuth2 Client setup using environment variables
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Service to list files with a custom query
const listFiles = async (query) => {
  try {
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name)',
    });
    return response.data.files;
  } catch (error) {
    throw new Error('Error listing files: ' + error.message);
  }
};

module.exports = {
  oauth2Client,
  listFiles,
};
