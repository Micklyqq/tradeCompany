import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {
  @ApiProperty({ example: "25", description: "Количество проданного продукта" })
  readonly quantity: number;
  @ApiProperty({ example: "2023-12-20 18:12:59", description: "Дата продажи" })
  readonly date: Date;
  @ApiProperty({
    example: "1",
    description: "ID офиса, к которому относится продажа",
  })
  readonly officeId: number;
  @ApiProperty({ example: "1", description: "ID проданного продукта" })
  readonly productId: number;
}
