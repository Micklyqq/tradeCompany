import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: "Кофе", description: "Имя продукта" })
  readonly name: string;
  @ApiProperty({ example: "69", description: "Количество продукта на складе" })
  readonly quantity: number;
  @ApiProperty({
    example: "33",
    description: "Цена за единицу товара(кг,шт, и т.д",
  })
  readonly price: number;
}
