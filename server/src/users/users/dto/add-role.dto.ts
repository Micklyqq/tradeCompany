import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Имя роли" })
  readonly rolename: string;
  @ApiProperty({ example: "1", description: "id пользователя" })
  readonly userId: number;
}
