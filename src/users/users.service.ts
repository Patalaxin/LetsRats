import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { CreateUserDtoRequest, CreateUserDtoResponse } from './dto/create-user.dto';
import { ChangeUserPassDtoRequest, ChangeUserPassDtoResponse } from './dto/change-user-pass.dto';
import { ForgotUserPassDtoRequest, ForgotUserPassDtoResponse } from './dto/forgot-user-pass.dto';
import { UpdateUserRoleDtoRequest, UpdateUserRoleDtoResponse } from './dto/update-user-role.dto';
import { DeleteAllUsersDtoResponse, DeleteUserDtoResponse } from './dto/delete-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from '../domain/user/user.interface';
import { RolesTypes, SessionId, User } from '@prisma/client';
import { GetUserDtoResponse } from './dto/get-user.dto';

@Injectable()
export class UsersService implements IUser {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDtoRequest): Promise<CreateUserDtoResponse> {
    const userEmail = await this.prisma.user.findFirst({ where: { email: createUserDto.email } });

    if (userEmail) {
      throw new BadRequestException('A user with such an email already exists!');
    }

    const compareSessionId = await this.prisma.sessionId.findFirst({ where: { id: createUserDto.sessionId } });
    if (compareSessionId === null) {
      throw new BadRequestException('Wrong SessionId!');
    }

    try {
      const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
      const { sessionId, ...userData } = createUserDto;
      const newUser = await this.prisma.user.create({
        data: { ...userData, password: hashedPassword, role: RolesTypes.User },
      });
      await this.prisma.sessionId.deleteMany({});

      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (err) {
      console.log(err);
    }
  }

  async findUser(email: string): Promise<GetUserDtoResponse> {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(): Promise<GetUserDtoResponse[]> {
    try {
      const users = await this.prisma.user.findMany();

      return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async changePassword(email: string, updateUserPassDto: ChangeUserPassDtoRequest): Promise<ChangeUserPassDtoResponse> {
    const user: User = await this.prisma.user.findFirst({ where: { email: email } });

    const isPasswordMatch: boolean = await bcrypt.compare(updateUserPassDto.oldPassword, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password did not match!!!');
    }

    const hashedNewPassword: string = await bcrypt.hash(updateUserPassDto.newPassword, 10);
    await this.prisma.user.update({ where: { email: user.email }, data: { password: hashedNewPassword } });

    return { message: 'Password successfully changed', status: 200 };
  }

  async forgotPassword(forgotUserPassDto: ForgotUserPassDtoRequest): Promise<ForgotUserPassDtoResponse> {
    const user: User = await this.prisma.user.findFirst({ where: { email: forgotUserPassDto.email } });

    const compareSessionId: SessionId = await this.prisma.sessionId.findFirst({
      where: { id: forgotUserPassDto.sessionId },
    });

    if (compareSessionId === null) {
      throw new BadRequestException('Wrong SessionId!');
    }

    await this.prisma.sessionId.deleteMany({});
    const hashedNewPassword: string = await bcrypt.hash(forgotUserPassDto.newPassword, 10);

    await this.prisma.user.update({ where: { email: user.email }, data: { password: hashedNewPassword } });

    return { message: 'Password successfully changed', status: 200 };
  }

  async updateRole(updateUserRoleDto: UpdateUserRoleDtoRequest): Promise<UpdateUserRoleDtoResponse> {
    try {
      const user: User = await this.prisma.user.findFirst({ where: { email: updateUserRoleDto.email } });
      await this.prisma.user.update({ where: { email: user.email }, data: { role: updateUserRoleDto.role } });
    } catch (err) {
      throw new BadRequestException('Something went wrong!');
    }
    return { message: 'Role has been updated successfully', status: 200 };
  }

  async deleteOne(email: string): Promise<DeleteUserDtoResponse> {
    try {
      await this.prisma.user.delete({ where: { email: email } });
      await this.prisma.token.delete({ where: { email: email } });
    } catch (err) {
      if (err.code === 'P2025') {
        return { message: 'User deleted', status: 200 };
      }
      throw new BadRequestException(err);
    }
    return { message: 'User deleted', status: 200 };
  }

  async deleteAll(): Promise<DeleteAllUsersDtoResponse> {
    try {
      await this.prisma.user.deleteMany({});
    } catch (err) {
      throw new BadRequestException('Something went wrong ');
    }
    return { message: 'All users deleted', status: 200 };
  }

  async generateSessionId(): Promise<SessionId> {
    try {
      await this.prisma.sessionId.deleteMany();
      return this.prisma.sessionId.create({ data: { id: randomUUID() } });
    } catch (err) {
      console.log(err);
    }
  }
}
