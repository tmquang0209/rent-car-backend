import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as Minio from 'minio';
import * as path from 'path';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Minio.Client;
  private minioConfig = {
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucketName: process.env.MINIO_BUCKET || 'default-bucket',
  };
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: this.minioConfig.endPoint,
      port: this.minioConfig.port,
      useSSL: this.minioConfig.useSSL,
      accessKey: this.minioConfig.accessKey,
      secretKey: this.minioConfig.secretKey,
      pathStyle: true,
    });
  }

  async onModuleInit() {
    const exists = await this.minioClient.bucketExists(
      this.minioConfig.bucketName,
    );
    if (!exists) {
      await this.minioClient.makeBucket(this.minioConfig.bucketName);
      console.log(`Bucket '${this.minioConfig.bucketName}' created.`);
    } else {
      console.log(`Bucket '${this.minioConfig.bucketName}' already exists.`);
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    try {
      const filePath = path.join(__dirname, '../../tmp', file.filename);

      // Read the file content into a buffer
      const fileBuffer = fs.readFileSync(filePath);

      // Upload the file to MinIO
      await this.minioClient.putObject(
        this.minioConfig.bucketName,
        `/${folder}/${file.originalname}`, // The name the file will have on MinIO
        fileBuffer, // The actual file content (buffer)
        fileBuffer.length, // The length of the buffer
      );

      // Optionally, delete the temporary file after uploading
      fs.unlinkSync(filePath);

      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading file to MinIO', error);
      throw new BadRequestException('Error uploading file to MinIO');
    }
  }

  async getPresignedUploadUrl(
    filename: string,
    expirySeconds = 3600,
  ): Promise<string> {
    return this.minioClient.presignedPutObject(
      this.minioConfig.bucketName,
      filename,
      expirySeconds,
    );
  }

  async getPresignedDownloadUrl(
    filename: string,
    expirySeconds = 3600,
  ): Promise<string> {
    return this.minioClient.presignedGetObject(
      this.minioConfig.bucketName,
      filename,
      expirySeconds,
    );
  }

  async deleteObject(filename: string): Promise<void> {
    await this.minioClient.removeObject(this.minioConfig.bucketName, filename);
  }
}
