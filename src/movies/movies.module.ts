import { Module } from '@nestjs/common';
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { HttpModule } from "@nestjs/axios";
import { PrismaModule } from "../prisma/prisma.module";
import { VideoUrlFactoryProvider } from "./video-url-factory";

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService, VideoUrlFactoryProvider ],
  exports: [MoviesService],
})
export class MoviesModule {}
