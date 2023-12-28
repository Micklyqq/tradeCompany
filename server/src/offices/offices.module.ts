import { Module } from "@nestjs/common";
import { OfficesController } from "./offices.controller";
import { OfficesService } from "./offices.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Office } from "./offices.model";
import { Warehouse } from "src/warehouse/warehouse.model";
import { WarehouseModule } from "src/warehouse/warehouse.module";
import { Sale } from "src/sales/sales.model";
import { FilesModule } from "src/files/files.module";

@Module({
  controllers: [OfficesController],
  providers: [OfficesService],
  imports: [
    SequelizeModule.forFeature([Office, Warehouse, Sale]),
    WarehouseModule,
    FilesModule,
  ],
})
export class OfficesModule {}
