import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { UsersService } from "./users.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { Public } from "src/auth/decorators/public.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiBearerAuth()
@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }



  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200, description: `Пользователь успешно удалён` })
  @Delete("/:id")
  deleteUser(@Param("id") userId: number) {
    return this.userService.deleteUser(userId);
  }

  @ApiOperation({ summary: "Обновление пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Put("/:id")
  update(@Param("id") userId: number, @Body() updateDto: UpdateUserDto) {
    return this.userService.updateUser(userId, updateDto);
  }
}
