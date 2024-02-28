import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import {Office} from "../../offices/offices.model";

interface UserCreateAttrs {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone:string;
  officeId:number;
  roleId:number;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreateAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@mail.ru", description: "E-mail пользователя" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "Ирина", description: "Имя" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstname: string;

  @ApiProperty({ example: "Рябина", description: "Фамилия" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastname: string;

  @ApiProperty({ example: "+3753328389", description: "Телефон" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  phone: string;

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[];

  @ForeignKey(()=>Office)
  officeId:number;

  @BelongsTo(()=>Office)
  office:Office

  @ForeignKey(()=>Role)
  roleId:number;

  @BelongsTo(()=>Role)
  role:Role;

}
