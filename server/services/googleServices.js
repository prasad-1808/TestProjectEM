const { google } = require('googleapis');

// OAuth2 Client setup
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID='967975471794-bv5lnmcjnvts2j9qbialf8ch8i2a32s5.apps.googleusercontent.com',
  CLIENT_SECRET='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',
  REDIRECT_URI='http://localhost:3000/redirect'
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
