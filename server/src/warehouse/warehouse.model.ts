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
import { Office } from "src/offices/offices.model";
import { Product } from "src/products/products.model";

@Table({ tableName: "warehouses" })
export class Warehouse extends Model<Warehouse> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "1", description: "Привязка склада к офису" })
  @ForeignKey(() => Office)
  officeId: number;

  @BelongsTo(() => Office)
  owner: Office;

  @HasMany(() => Product)
  product: Product[];
}
