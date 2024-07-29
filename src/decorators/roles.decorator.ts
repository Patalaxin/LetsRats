import { SetMetadata } from '@nestjs/common';
import { RolesTypes } from '@prisma/client';

export const Roles = (...args: RolesTypes[]) => SetMetadata('roles', args);
