import { CreateUserDto } from './dtos/createUser.dto';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
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
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) throw new BadGatewayException('email registered in system');

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

  async getUserByIdUsingReferences(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(`UserId: ${userId} not found`);

    return user;
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`UserId: ${userId} not found`);

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException(`E-mail ${email} not found`);

    return user;
  }
}
