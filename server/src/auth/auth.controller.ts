import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/users/dto/user-create.dto";
import { UserLoginDto } from "src/users/users/dto/user-login.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post("/login")
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }

  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
