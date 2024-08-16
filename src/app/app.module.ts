import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MoviesModule } from '../movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { PersonsModule } from '../persons/persons.module';
import { ImageModule } from '../image/image.module';
import { ReviewsModule } from "../reviews/reviews.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    MoviesModule,
    PersonsModule,
    ReviewsModule,
    ImageModule,
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
