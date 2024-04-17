// const express = require("express");
// const multer = require("multer");
// const app = require("../../");

// const stroage = multer.diskStorage({
//   destination: "public/upload",
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtenstion = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueName + fileExtenstion);
//   },
// });

// const upload = multer({ storage: stroage });

// module.exports = upload;

// app.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(404).json("Image is not found");
//   }

//   try {
//     const imagePath = req.file.path;

//     const stdId = req.body.id;
//     await User.findByIdAndUpdate(stdId, { img: imagePath });
//     return res.status(200).json({
//       message: "Image uploaded succesfully",
//       imagePath,
//     });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });
