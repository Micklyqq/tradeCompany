import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreateAttrs {
  name: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "ADMIN или SALES-MANAGER",
    description: "Имя роли",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: "Имеет доступ ко всему функуционалу сайта",
    description: "Описание роли",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
