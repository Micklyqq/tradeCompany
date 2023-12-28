import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { Warehouse } from "src/warehouse/warehouse.model";
import { Sale } from "src/sales/sales.model";
import { FilesModule } from "src/files/files.module";

@Module({
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, Warehouse, Sale]),
    FilesModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
