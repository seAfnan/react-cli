const express = require("express");
const upload = require("../routes/upload");
const draw = require("../routes/draw");
const deleteFile = require("../routes/delete");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/file", upload);
  app.use("/api/file", draw);
  app.use("/api/file", deleteFile);
};
