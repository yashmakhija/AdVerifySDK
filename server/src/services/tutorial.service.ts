import { PutObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2Client } from '../lib/r2';
import { env } from '../config/env';

const TUTORIAL_KEY = 'tutorials/video.mp4';

export class TutorialService {
  async upload(buffer: Buffer, mimeType: string) {
    const client = getR2Client();

    await client.send(new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: TUTORIAL_KEY,
      Body: buffer,
      ContentType: mimeType,
    }));

    return { key: TUTORIAL_KEY };
  }

  async getPresignedUrl(): Promise<string> {
    const client = getR2Client();

    // Check if the tutorial exists
    try {
      await client.send(new HeadObjectCommand({
        Bucket: env.R2_BUCKET,
        Key: TUTORIAL_KEY,
      }));
    } catch {
      throw new Error('Tutorial video not uploaded yet');
    }

    // Generate presigned GET URL — expires in 1 hour
    return getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: env.R2_BUCKET,
        Key: TUTORIAL_KEY,
      }),
      { expiresIn: 3600 },
    );
  }
}
