import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
@ApiBearerAuth()
@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
  @ApiOperation({ summary: "Получение роли" })
  @ApiResponse({ status: 200, type: Role })
  @Get("/:rolename")
  getByName(@Param("rolename") rolename: string) {
    return this.roleService.getRoleByName(rolename);
  }

  @ApiOperation({ summary: "Получение всех ролей" })
  @ApiResponse({ status: 200, type: Role })
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
