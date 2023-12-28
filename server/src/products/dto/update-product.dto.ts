import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: "путь к картинке",
    description: "Картинка офиса",
    type: "string",
    format: "binary",
    required: false,
  })
  readonly logo?: string;
}
