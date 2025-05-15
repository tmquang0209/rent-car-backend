import { AllowUnauthorized } from '@common/decorators';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MinioService } from 'src/services/minio.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly minioService: MinioService) {
    const tempDir = './tmp';
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
  }

  @AllowUnauthorized()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp', // Temporary directory
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${name}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      return await this.minioService.uploadFile(file, 'images');
    } catch (error) {
      console.error('Error uploading file to MinIO', error);
      throw new BadRequestException('Error uploading file');
    }
  }
}
