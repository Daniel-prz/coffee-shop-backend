const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// Set storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "coffee", allowedFormats: ["jpeg", "png", "jpg"] },
});
// Initialize upload
const upload = multer({
  storage,
}).single("image");

// Check file type

module.exports = upload;
