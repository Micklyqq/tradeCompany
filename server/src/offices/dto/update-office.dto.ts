import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOfficeDto } from "./create-office.dto";

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @ApiProperty({
    example: "путь к картинке",
    description: "Картинка офиса",
    type: "string",
    format: "binary",
    required: false,
  })
  readonly logo?: string;
}
