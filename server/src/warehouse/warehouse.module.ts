import { Module } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Warehouse } from "./warehouse.model";
import { Office } from "src/offices/offices.model";
import { Product } from "src/products/products.model";
import { ProductsModule } from "src/products/products.module";
import { FilesModule } from "src/files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [WarehouseService],
  controllers: [WarehouseController],
  imports: [
    SequelizeModule.forFeature([Warehouse, Office, Product]),
    ProductsModule,
    FilesModule,
      AuthModule
  ],
  exports: [WarehouseService],
})
export class WarehouseModule {}
