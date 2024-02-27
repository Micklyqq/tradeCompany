import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@mail.ru", description: "E-mail пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  readonly password: string;
  @ApiProperty({ example: "Ирина", description: "Имя" })
  @IsString({ message: "Должно быть строкой" })
  readonly firstname: string;
  @ApiProperty({ example: "Рябина", description: "Фамилия" })
  @IsString({ message: "Должно быть строкой" })
  readonly lastname: string;
  @ApiProperty({ example: "+3753328389", description: "Телефон" })
  @IsString({ message: "Должно быть строкой" })
  readonly phone: string;
  readonly roleId:number;
  readonly officeId:number;
}
