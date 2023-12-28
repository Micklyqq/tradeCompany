import { Module } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sale } from "./sales.model";
import { Office } from "src/offices/offices.model";
import { Product } from "src/products/products.model";
import { ProductsModule } from "src/products/products.module";

@Module({
  providers: [SalesService],
  controllers: [SalesController],
  imports: [
    SequelizeModule.forFeature([Sale, Office, Product]),
    ProductsModule,
  ],
  exports: [SalesService],
})
export class SalesModule {}
