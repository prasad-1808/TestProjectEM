const express = require('express');
const googleController = require('../controllers/googleController');
const router = express.Router();

// Route to get the Google OAuth2 URL
router.get('/auth-url', googleController.getAuthUrl);

// Route to exchange the authorization code for tokens
router.post('/get-tokens', googleController.getTokens);

// Route to list folders in Google Drive
router.get('/list-folders', googleController.listFolders);

// Route to list files in a specific folder
router.get('/list-files/:folderId', googleController.listFilesInFolder);

module.exports = router;
