import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Sale } from "src/sales/sales.model";
import { Warehouse } from "src/warehouse/warehouse.model";

interface OfficeCreateAttrs {
  name: string;
  adress: string;
  logo: string;
}

@Table({ tableName: "offices" })
export class Office extends Model<Office, OfficeCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Офис по торговле мехами", description: "Имя офиса" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: "ул Пушкина 77", description: "Адрес офиса" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adress: string;

  @ApiProperty({ example: "путь до картинки", description: "Картинка" })
  @Column({
    type: DataType.STRING,
  })
  logo: string;

  @HasOne(() => Warehouse)
  warehouse: Warehouse;

  @HasMany(() => Sale)
  sales: Sale[];
}
