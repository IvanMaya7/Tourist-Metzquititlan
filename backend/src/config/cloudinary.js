const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "IvanMaya",
  api_key: "394926612729477",
  api_secret: "mMMecUm2r6q2xxNedISBamJjDWI"
});

module.exports = cloudinary;
