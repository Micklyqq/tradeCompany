import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/users/dto/user-create.dto";
import { UserLoginDto } from "src/users/users/dto/user-login.dto";
import { UsersService } from "src/users/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const user = await this.userService.createUser(
      userDto
    );
    return {
      statusCode:HttpStatus.OK,
      message:'Работник успешно зарегистрирован',
      user: user.email
    }
  }

  public async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserLoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user){
      throw new UnauthorizedException({ message: "Неверый email или пароль" });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if(!passwordEquals){
      throw new UnauthorizedException({ message: "Неверый email или пароль" });
    }
    if (user && passwordEquals) {
      return user;
    }


  }
}
