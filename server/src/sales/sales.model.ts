import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Office } from "src/offices/offices.model";
import { Product } from "src/products/products.model";

interface SaleCreateAttrs {
  quantity: number;
  amount: number;
  date: Date;
}

@Table({ tableName: "sales" })
export class Sale extends Model<Sale, SaleCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "23", description: "Количество проданного товара" })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
  @ApiProperty({ example: "250", description: "Сумма с продажи" })
  @Column({
    type: DataType.INTEGER,
  })
  amount: number;
  @ApiProperty({ example: "24-12-2023", description: "Дата продажи" })
  @Column({
    type: DataType.DATE,
  })
  date: Date;

  @ForeignKey(() => Office)
  officeId: number;

  @BelongsTo(() => Office)
  office: Office;

  @ForeignKey(() => Product)
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
