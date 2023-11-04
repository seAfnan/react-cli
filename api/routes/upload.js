const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();

// Configure the multer storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in the "uploads" directory
  },
  filename: function (req, file, cb) {
    // Remove spaces from the original filename
    const originalName = file.originalname;
    const modifiedName = originalName.replace(/\s/g, "_");
    cb(null, modifiedName);
  },
});

const upload = multer({ storage });
router.use("/uploads", express.static("uploads"));

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const columns = []; // To store the CSV columns

  fs.createReadStream(`uploads/${req.file.filename}`)
    .pipe(csv())
    .on("data", (data) => {
      // Process the first row to get column names
      if (columns.length === 0) {
        columns.push(...Object.keys(data));
      }
    })
    .on("end", () => {
      return res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.filename,
        columns: columns,
      });
    });
});

module.exports = router;
