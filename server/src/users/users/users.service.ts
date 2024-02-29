import { CreateUserDto } from "./dto/user-create.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import * as bcrypt from "bcryptjs";
import { UpdateUserDto } from "./dto/update-user.dto";
import {AuthService} from "../../auth/auth.service";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.ACCEPTED
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });

    if(user){
      return {
        code:HttpStatus.OK,
        message:"Пользователь зарегистрирован"
      }
    }

  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      await this.userRepository.update({roleId:dto.roleId},{where:{id:dto.userId}});
      return dto;
    }
    throw new HttpException(
      "Пользователь или роль не найдены",
      HttpStatus.NOT_FOUND
    );
  }

  async updateUser(userId: number, updateDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    if (updateDto.password) {
      const hashPassword = bcrypt.hash(updateDto.password, 5);

      await user.update({ ...updateDto, password: hashPassword });
      return user;
    }

    await user.update(updateDto);
    return user;
  }
  async deleteUser(userId: number) {
    const candidate = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.userRepository.destroy({ where: { id: userId } });
    return { message: "Пользователь успешно удалён" };
  }


  async getOne(userId: number) {
    const user = await this.userRepository.findByPk(userId,{
      attributes:{exclude:['password','createdAt','updatedAt']}
    });
    if(!user){
      throw new HttpException(
          'Такого пользователя не существует',
          HttpStatus.BAD_REQUEST
      )
    }
    return user;
  }
}
