import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "Кофе", description: "Имя продукта" })
  @Length(2, 32, { message: "Не меньше 2 и не больше 32" })
  @IsString({ message: "Должно быть строкой" })
  readonly name: string;
  @ApiProperty({ example: "69", description: "Количество продукта на складе" })
  @IsNumber()
  readonly quantity: number;
  @ApiProperty({
    example: "33",
    description: "Цена за единицу товара(кг,шт, и т.д",
  })
  @IsNumber()
  readonly price: number;
}
