import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { extname, join, normalize } from 'path';
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? './uploads';
const MAX_BYTES = 200 * 1024 * 1024; // 200 MB — lecture video ceiling

/** Only these types are accepted; anything else is rejected before it lands. */
const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
  'image/webp',
  'video/mp4',
  'video/webm',
  'text/plain',
  'application/zip',
]);

if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  @Post()
  @Roles(
    Role.SUPER_ADMIN,
    Role.ACADEMIC_ADMIN,
    Role.TEACHER,
    Role.CONTENT_MANAGER,
    Role.STUDENT, // assignment submissions
  )
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_BYTES },
      storage: diskStorage({
        destination: UPLOAD_DIR,
        // Never trust the client filename on disk — store an opaque key.
        filename: (_req, file, cb) =>
          cb(null, `${Date.now()}-${randomBytes(8).toString('hex')}${extname(file.originalname).toLowerCase()}`),
      }),
      fileFilter: (_req, file, cb) =>
        ALLOWED.has(file.mimetype)
          ? cb(null, true)
          : cb(new BadRequestException(`Files of type ${file.mimetype} are not accepted.`), false),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file was received.');
    return {
      fileKey: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      url: `/api/uploads/${file.filename}`,
    };
  }

  /** Serves a stored file. The key is validated to block path traversal. */
  @Get(':fileKey')
  download(@Param('fileKey') fileKey: string, @Res({ passthrough: true }) res: Response) {
    if (!/^[\w.-]+$/.test(fileKey)) throw new BadRequestException('Invalid file reference.');

    const path = normalize(join(UPLOAD_DIR, fileKey));
    if (!path.startsWith(normalize(UPLOAD_DIR)) || !existsSync(path)) {
      throw new BadRequestException('File not found.');
    }

    res.set({ 'Content-Disposition': `inline; filename="${fileKey}"` });
    return new StreamableFile(createReadStream(path));
  }
}
