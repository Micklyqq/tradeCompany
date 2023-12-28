import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Название роли" })
  readonly rolename: string;
  @ApiProperty({ example: "Мощнейшая роль", description: "Описание роли" })
  readonly description: string;
}
