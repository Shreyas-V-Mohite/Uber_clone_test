const Minio = require('minio');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_SECURE === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const uploadToMinio = async (file) => {
    const bucketName = process.env.MINIO_BUCKET;
    const objectKey = `${uuidv4()}${path.extname(file.originalname)}`;

    await minioClient.putObject(bucketName, objectKey, file.buffer);

    return objectKey;
};

module.exports = { minioClient, uploadToMinio };