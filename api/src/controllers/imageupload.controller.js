const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");

const s3 = new S3Client({ region: process.env.AWS_REGION });

exports.getImagePath = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new APIError("Image file not found", httpStatus.NOT_FOUND);
    }

    const file = req.file;
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const key = `${process.env.MEDIA_PREFIX}/media/${fileName}`;

    // Upload file to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read", // allows public access
      })
    );

    // Construct the full public URL
    const imgPath = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return res.status(httpStatus.OK).json({ imgPath });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
