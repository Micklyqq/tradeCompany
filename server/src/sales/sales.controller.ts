import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Sale } from "./sales.model";
import {SalesByDateDto} from "./dto/sales-by-date.dto";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
@ApiBearerAuth()
@ApiTags("Продажи")
@Controller("sales")
export class SalesController {
  constructor(private saleService: SalesService) {}

  @ApiOperation({
    summary: "Добавление продажи",
  })
  @ApiResponse({ status: 200, type: Sale })
  @Roles('ADMIN','Директор','Менеджер по продажам')
  @UseGuards(RolesGuard)
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

  @ApiOperation({
    summary:"Получение всех продаж офиса",
  })
  @ApiResponse({status:200,type:Sale})
  @Get('/getAll/:id')
  getAll(@Param('id') officeId:number){
    return this.saleService.getAll(officeId);
  }

  @Get('/:id/pagination')
  async getPaginationProducts(
      @Param('id') officeId: number,
      @Query('page') page:number = 1,
      @Query('limit') limit:number = 10,
  ) {

    limit = limit > 100 ? 100 : limit; // Ограничиваем максимальный размер страницы
    const offset = (page - 1) * limit;
    return this.saleService.getPaginationSales(officeId, offset, limit);
  }

  @ApiOperation({
    summary:"Удаление продажи",
  })
  @ApiResponse({status:200,type:Sale})
  @Roles('ADMIN','Директор','Менеджер по продажам')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') saleId:number){
    return this.saleService.delete(saleId);
  }

  @ApiOperation({summary:'Получение 5 наиболее продаваемых товаров,указывается id офиса'})
  @Get('/topSeller/:id')
  getTopSellers(@Param('id') warehouseId:number){
    return this.saleService.getTopSellers(warehouseId);
  }

  @ApiOperation({summary:'Получение продаж за конкретную дату или промежуток'})
  @Post('/salesByDate')
  getSalesByDate(@Body()salesByDateDto:SalesByDateDto){
    return this.saleService.getSalesByDate(salesByDateDto);

  }
}
