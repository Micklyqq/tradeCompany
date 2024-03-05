import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
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
import {UserResponseDto} from "./dto/user-response.dto";

@ApiBearerAuth()
@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @UsePipes(ValidationPipe)
  @Roles('ADMIN','Директор')
  @UseGuards(RolesGuard)
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
  @Roles("ADMIN",'Директор')
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200, description: `Пользователь успешно удалён` })
  @Roles('ADMIN','Директор')
  @UseGuards(RolesGuard)
  @Delete("/:id")
  deleteUser(@Param("id") userId: number) {
    return this.userService.deleteUser(userId);
  }

  @ApiOperation({ summary: "Обновление пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN','Директор')
  @UseGuards(RolesGuard)
  @Put("/:id")
  update(@Param("id") userId: number, @Body() updateDto: UpdateUserDto) {
    return this.userService.updateUser(userId, updateDto);
  }

  @ApiOperation({summary:"Получение пользователя по его id"})
  @ApiResponse({status:200,type:UserResponseDto})
  @Get('/:id')
  getOne(@Param('id') userId:number){
    return this.userService.getOne(userId);
  }

  @Get('/:id/pagination')
  async getPaginationUsers(
      @Param('id') officeId: number,
      @Query('page') page:number = 1,
      @Query('limit') limit:number = 10,
  ) {

    limit = limit > 100 ? 100 : limit; // Ограничиваем максимальный размер страницы
    const offset = (page - 1) * limit;
    return this.userService.getPaginationUsers(officeId, offset, limit);
  }
}
