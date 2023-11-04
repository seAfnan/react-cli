const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");

router.post("/draw", (req, res) => {
  const directoryPath = "uploads";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(404).json({ error: "Error reading directory" });
    }

    const requestedFile = req.body.file.toLowerCase();

    function addCsvExtension(filename) {
      if (filename.toLowerCase().endsWith(".csv")) {
        return filename;
      } else {
        return filename + ".csv";
      }
    }

    const requestedFileWithExtension = addCsvExtension(requestedFile);

    if (
      files.some((file) => file.toLowerCase() === requestedFileWithExtension)
    ) {
      const results = [];
      fs.createReadStream(directoryPath + "/" + requestedFileWithExtension)
        .pipe(csv())
        .on("data", (data) => {
          // Process each row of the CSV
          results.push(data);
        })
        .on("end", () => {
          // All rows have been processed
          res.json({ data: results, file: req.body.file + ".csv" });
        });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });
});

module.exports = router;
