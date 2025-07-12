import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
import { ImageUploadInterceptor } from 'src/Interceptor/image-upload.interceptor';
  
@Controller('upload-file')
export class UploadFileController {
    @Post('images')
    @ImageUploadInterceptor()
    uploadAvatar(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      return {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: "http://localhost:3000/" + file.path,
      };
    }

    
}
