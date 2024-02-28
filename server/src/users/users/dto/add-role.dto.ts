import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "3"})
  readonly roleId: number;
  @ApiProperty({ example: "1" })
  readonly userId: number;
}
