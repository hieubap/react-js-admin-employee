const { uploadFile, uploadVape } = require("./multer");

const fileService = (app) => {
  app.post("/upload", uploadFile.single("file"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  });

  app.post("/vape-dong-anh/upload", uploadVape.single("file"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  });
};

module.exports = { fileService };
