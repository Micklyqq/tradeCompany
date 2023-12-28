import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateOfficeDto {
  @ApiProperty({ example: "Офис по торговле мехами", description: "Имя офиса" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 120, { message: "Не меньше 4 и не больше 120" })
  readonly name: string;
  @ApiProperty({ example: "ул Пушкина д 17", description: "Улица офиса" })
  @Length(4, 120, { message: "Не меньше 4 и не больше 120" })
  readonly adress: string;
}
