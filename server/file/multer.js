const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ROOT_DIR = path.join(__dirname, "../../../files");

const getTypeFolder = (mimeType) => {
  if (mimeType?.includes("application/")) {
    return "docs";
  } else if (mimeType?.includes("video/")) {
    return "videos";
  } else if (mimeType?.includes("image/")) {
    return "images";
  } else if (mimeType?.includes("audio/")) {
    return "audios";
  } else if (mimeType?.includes("text/")) {
    return "texts";
  }
  return "others";
};

const createMulterStorage = ({ folder = "" }) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, ROOT_DIR);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
      const typeFolder = getTypeFolder(file?.mimetype);
      let path = `${folder}${typeFolder}/${uniqueSuffix}`;

      if (!fs.existsSync(`${ROOT_DIR}/${path}`)) {
        fs.mkdirSync(`${ROOT_DIR}/${path}`, { recursive: true });
      }
      cb(null, `${path}/` + file.originalname);
    },
  });
};

// Export multer
const uploadFile = multer({ storage: createMulterStorage({}) });
const uploadVape = multer({ storage: createMulterStorage({ folder: "vape/" }) });

module.exports = { uploadFile, uploadVape, ROOT_DIR };
