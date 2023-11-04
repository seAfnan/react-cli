const express = require("express");
const router = express.Router();
const fs = require("fs");

const directoryPath = "uploads";

function addCsvExtension(filename) {
  if (filename.toLowerCase().endsWith(".csv")) {
    return filename;
  } else {
    return filename + ".csv";
  }
}

router.delete("/delete/:filename", (req, res) => {
  const requestedFilename = req.params.filename.toLowerCase(); // Convert to lowercase
  const requestedFileWithExtension = addCsvExtension(requestedFilename);

  const files = fs
    .readdirSync(directoryPath)
    .map((filename) => filename.toLowerCase());

  const fileIndex = files.findIndex(
    (filename) => filename === requestedFileWithExtension
  );

  if (fileIndex !== -1) {
    const actualFilePath = `${directoryPath}/${
      fs.readdirSync(directoryPath)[fileIndex]
    }`;

    try {
      fs.unlinkSync(actualFilePath);
      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting the file" });
    }
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;
