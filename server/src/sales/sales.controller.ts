import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Sale } from "./sales.model";
@ApiBearerAuth()
@ApiTags("Продажи")
@Controller("sales")
export class SalesController {
  constructor(private saleService: SalesService) {}

  @ApiOperation({
    summary: "Добавление продажи",
  })
  @ApiResponse({ status: 200, type: Sale })
  @Post()
  create(@Body() createSale: CreateSaleDto) {
    return this.saleService.create(createSale);
  }

  @ApiOperation({
    summary: "Получение конкретной продажи",
  })
  @ApiResponse({ status: 200, type: Sale })
  @Get("/:id")
  getOne(@Param("id") saleId: number) {
    return this.saleService.getOne(saleId);
  }
}
