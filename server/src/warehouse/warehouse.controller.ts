import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile, UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Product } from "src/products/products.model";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { ProductsService } from "src/products/products.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiBearerAuth()
@ApiTags("Склады")
@Controller("warehouse")
export class WarehouseController {
  constructor(
    private warehouseService: WarehouseService,
    private productService: ProductsService
  ) {}

  @ApiOperation({
    summary: "Добавление продукта, в параметрах указывается id офиса",
  })
  @ApiResponse({ status: 200, type: Product })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN','Директор','Заведующий складом')
  @UseGuards(RolesGuard)
  @Post("/:id")
  addProduct(@Param("id") officeId: number, @Body() dto: CreateProductDto) {
    return this.warehouseService.addProduct(dto, officeId);
  }
  @ApiOperation({
    summary:
      "Получение всех продуктов на складе, в параметрах указывается id офиса",
  })
  @ApiResponse({ status: 200, type: Product })
  @Get("/:id")
  getAllProducts(@Param("id") officeId: number) {
    return this.warehouseService.getAllProducts(officeId);
  }

  @ApiOperation({ summary: "Удаление продукта, указывается ID продукта" })
  @ApiResponse({ status: 200, description: `Продукт был успешно удалён` })
  @Roles('ADMIN','Директор','Заведующий складом')
  @UseGuards(RolesGuard)
  @Delete("/:id")
  deleteProduct(@Param("id") productId: number) {
    return this.productService.deleteProduct(productId);
  }

  @ApiOperation({ summary: "Обновление продукта, указывается ID продукта" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, type: Product })
  @Roles('ADMIN','Директор','Заведующий складом')
  @UseGuards(RolesGuard)
  @Put("/:id")
  @UseInterceptors(FileInterceptor("logo"))
  update(
    @Param("id") officeId: number,
    @Body() updateDto: UpdateProductDto,
    @UploadedFile() logo: any
  ) {
    return this.productService.updateProduct(officeId, updateDto, logo);
  }
}
