import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({ example: "admin@mail.ru", description: "E-mail пользователя" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  readonly password: string;
}
