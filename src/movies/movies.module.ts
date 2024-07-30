import { Module } from '@nestjs/common';
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { HttpModule } from "@nestjs/axios";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
