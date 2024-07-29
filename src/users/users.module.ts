import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from "../prisma/prisma.module";


@Module({
  providers: [UsersService, { provide: 'IUser', useClass: UsersService }],
  exports: [UsersService],
  imports: [PrismaModule],
  controllers: [UsersController],
})
export class UsersModule {}
