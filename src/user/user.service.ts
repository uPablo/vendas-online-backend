import { CreateUserDto } from './dtos/createUser.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // This is a mock database
  // private users: UserEntity[] = [];

  /**
   * Create a new user
   *
   * @param {CreateUserDto} createUserDto
   * @return {*}  {Promise<UserEntity>}
   * @memberof UserService
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltRounds = 10;
    const hashedPassword = await hash(createUserDto.password, saltRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: hashedPassword,
    });
  }

  /**
   * Get all users
   *
   * @return {*}  {Promise<UserEntity[]>}
   * @memberof UserService
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
