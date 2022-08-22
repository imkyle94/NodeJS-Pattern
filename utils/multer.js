import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

import { AWSCONFIG } from "../config/aws.js";

const pdfFilter = (req, file, cb) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    req.invalidFormat = true;
    cb(null, false);
  }
};

const noticeFilter = (req, file, cb) => {
  const possible = ["pdf", "jpg", "jpeg", "png"];
  const mime = file.mimetype.split("/")[1];
  if (possible.indexOf(mime) > -1) {
    cb(null, true);
  } else {
    req.invalidFormat = true;
    cb(null, false);
  }
};

const uploadTest = multer();

const s3 = new AWS.S3({
  secretAccessKey: AWSCONFIG.awsSecretKey,
  accessKeyId: AWSCONFIG.awsSecretId,
  region: AWSCONFIG.awsRegion,
  Bucket: AWSCONFIG.awsSecretKey,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWSCONFIG.bucketName,
    acl: "public-read",
    ContentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (request, files, cb) {
      cb(null, { fieldName: files.fieldname });
    },
    key: function (request, file, cb) {
      const ext = file.originalname.split(".");
      cb(null, Date.now() + "." + ext[1]);
    },
  }),
  // fileFilter: pdfFilter,
});
// .fields([{ name: "fileUpload", maxCount: 1 }])

const uploadNotice = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWSCONFIG.bucketName,
    acl: "public-read",
    metadata: function (request, files, cb) {
      cb(null, { fieldName: files.fieldname });
    },
    key: function (request, file, cb) {
      const ext = file.originalname.split(".");
      cb(null, Date.now() + "." + ext[1]);
    },
  }),
  fileFilter: noticeFilter,
});

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWSCONFIG.bucketName,
    acl: "public-read",
    ContentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (request, files, cb) {
      cb(null, { fieldName: files.fieldname });
    },
    key: function (request, file, cb) {
      const ext = file.originalname.split(".");
      cb(null, Date.now() + "." + ext[1]);
    },
  }),

  // fileFilter: pdfFilter,
}).fields([{ name: "fileUpload", maxCount: 1 }]);

export { upload, uploadNotice, uploadTest, uploadImage };
