const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "IvanMaya",
  api_key: "765373594619282",
  api_secret: "**********"
});

module.exports = cloudinary;
