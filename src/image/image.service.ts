import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AllowedWidths, ImageQueryDto } from './dto/get-image.dto';
import * as process from 'node:process';
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Response } from "express";

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

 async getImage(query: ImageQueryDto, res: Response): Promise<void> {
    const { width = 'w500', path } = query;

    if (!Object.values(AllowedWidths).includes(width as AllowedWidths)) {
      throw new BadRequestException(`Invalid width value: ${width}`);
    }

    const imageUrl: string =  `${process.env.TMDB_IMAGE_URL}${width}/${path}`;

    try {
      const imageResponse = await lastValueFrom(this.httpService.get(imageUrl, { responseType: 'arraybuffer' }));

      res.set({
        'Content-Type': imageResponse.headers['content-type'],
        'Content-Length': imageResponse.data.length,
      });

      res.send(imageResponse.data);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }
}
