import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
      const existingUser = await this.findByName(dto.name);

      if (existingUser) {
          throw new ConflictException('User name already exists');
      }

    return await this.userModel.create({ name: dto.name, password: dto.password });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: Partial<Pick<User, 'name' | 'password'>>): Promise<User> {
    const user = await this.findOne(id);
    if (data.name && data.name !== user.name) {
      const exists = await this.findByName(data.name);
      if (exists) throw new ConflictException('User name already exists');
    }
    await user.update({ name: data.name ?? user.name, password: data.password ?? user.password });
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ where: { name } });
  }

  async validate(name: string, password: string): Promise<User | null> {
    const user = await this.findByName(name);
    if (!user) return null;
    return user.password === password ? user : null;
  }
}
