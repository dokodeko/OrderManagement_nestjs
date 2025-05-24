// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrGet(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (e: any) {
      if (
        e instanceof PrismaClientKnownRequestError &&
        e.code === 'P2002' && 
        Array.isArray(e.meta?.target) && e.meta.target.includes('email')
      ) {
        // Email already in use → return that user
        return this.prisma.user.findUnique({ where: { email: dto.email } });
      }
      throw e;
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  updateById(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  removeById(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
