import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { applyDecorators, UseInterceptors } from '@nestjs/common';

export function ImageUploadInterceptor(fieldName = 'image') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: './uploads/images',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
        limits: {
          fileSize: 2 * 1024 * 1024, // 2MB
        },
        fileFilter: (req, file, callback) => {
          const allowed = /\/(jpg|jpeg|png|webp)$/;
          if (file.mimetype.match(allowed)) {
            callback(null, true);
          } else {
            callback(new Error('Only image files are allowed!'), false);
          }
        },
      }),
    ),
  );
}

export const excelFileInterceptor = () =>
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/excels',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new Error('Only .xlsx files are allowed!'), false);
      }
      callback(null, true);
    },
  });
