import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Название роли" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  @IsString({ message: "Должно быть строкой" })
  readonly name: string;
  @Length(0, 128, { message: "не больше 128" })
  @IsString({ message: "Должно быть строкой" })
  @ApiProperty({ example: "Мощнейшая роль", description: "Описание роли" })
  readonly description: string;
}
