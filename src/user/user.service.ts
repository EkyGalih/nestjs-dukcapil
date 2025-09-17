import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.UserRepo.create(createUserDto);
    return this.UserRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.UserRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.UserRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User dengan id ${id} tidak ditemukan`);
    }
    return user;
  }

  findByUsername(username: string): Promise<User | null> {
    return this.UserRepo.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.UserRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.UserRepo.delete(id);
  }
}
