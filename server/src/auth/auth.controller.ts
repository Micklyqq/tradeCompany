import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/users/dto/user-create.dto";
import { UserLoginDto } from "src/users/users/dto/user-login.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiResponse({
    status: 200,
    description: "возвращает jwt-token пользователя",
  })
  @Public()
  @Post("/login")
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({
    status: 200,
    description: "возвращает jwt-token пользователя",
  })
  @Public()
  @UsePipes(ValidationPipe)
  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
