import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "user@mail.ru", description: "E-mail пользователя" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  readonly password: string;
  @ApiProperty({ example: "Ирина", description: "Имя" })
  readonly firstname: string;
  @ApiProperty({ example: "Рябина", description: "Фамилия" })
  readonly lastname: string;
}
