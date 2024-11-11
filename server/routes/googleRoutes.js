const express = require("express");
const googleController = require("../controllers/googleController");
const router = express.Router();

// Route to initiate Google OAuth2 authentication by redirecting the user
// This will redirect the user to Google for authentication
router.get("/auth/google", googleController.redirectToGoogleAuth);

// Route to handle the OAuth2 callback from Google and exchange the code for tokens
// Google will redirect to this route after the user has authenticated
router.get("/callback/google", googleController.handleGoogleAuthCallback);

// Route to list folders in Google Drive (requires an access token)
router.get("/list-folders", googleController.listFolders);

// Route to list files in a specific folder in Google Drive (requires an access token)
router.get("/list-files/:folderId", googleController.listFilesInFolder);
router.get("/files", googleController.getAllFiles);
module.exports = router;
