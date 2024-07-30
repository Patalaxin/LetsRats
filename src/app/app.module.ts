import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MoviesModule } from '../movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { PersonsModule } from '../persons/persons.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    MoviesModule,
    PersonsModule,
    ImageModule,
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
