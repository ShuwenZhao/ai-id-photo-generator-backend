import s3 from "../config/aws.js";

export const uploadToS3 = async (fileBuffer, userId) => {
  const timestamp = Date.now();
  const fileName = `${userId}-id-photo-${timestamp}.jpeg`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // URL of the uploaded image in S3
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
};