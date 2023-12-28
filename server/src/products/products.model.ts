import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Sale } from "src/sales/sales.model";
import { Warehouse } from "src/warehouse/warehouse.model";

interface ProductCreateAttrs {
  name: string;
  quantity: number;
  price: number;
  logo: string;
}

@Table({ tableName: "products" })
export class Product extends Model<Product, ProductCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Кофе", description: "Название продукта" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({ example: "50", description: "Количество продукта на складе" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
  @ApiProperty({
    example: "30",
    description: "Цена одной единицы(кг,штука и т.д) продукта",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
  @ApiProperty({ example: "logo", description: "Логотип продукта" })
  @Column({
    type: DataType.STRING,
  })
  logo: string;

  @ForeignKey(() => Warehouse)
  warehouseId: number;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;

  @HasMany(() => Sale)
  sales: Sale[];
}
