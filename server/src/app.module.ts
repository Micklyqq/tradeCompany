import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users/users.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { SalesModule } from "./sales/sales.module";
import { OfficesModule } from "./offices/offices.module";
import { Office } from "./offices/offices.model";
import { WarehouseModule } from "./warehouse/warehouse.module";
import { Warehouse } from "./warehouse/warehouse.model";
import { ProductsModule } from "./products/products.module";
import { Product } from "./products/products.model";
import { Sale } from "./sales/sales.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Office, Warehouse, Product, Sale],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SalesModule,
    OfficesModule,
    WarehouseModule,
    ProductsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },

  ],
})
export class AppModule {}
