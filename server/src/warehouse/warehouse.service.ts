import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Warehouse } from "./warehouse.model";
import { ProductsService } from "src/products/products.service";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import {Product} from "../products/products.model";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Warehouse) private warehouseRepository: typeof Warehouse,
    @InjectModel(Product) private productRepository: typeof Product,
    private productService: ProductsService
  ) {}

  async createWarehouse(officeId: number) {
    const wareHouse = await this.warehouseRepository.create({ officeId });
    return wareHouse;
  }

  async addProduct(dto: CreateProductDto, officeId: number) {
    const warehouse = await this.getWarehouseByOfficeId(officeId);
    if (!warehouse) {
      throw new HttpException(
        "Такого офиса не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const product = await this.productService.createProduct(dto, warehouse.id);
    return product;
  }

  async getWarehouseByOfficeId(officeId: number) {
    const warehouse = await this.warehouseRepository.findOne({
      where: { officeId },
    });
    if (!warehouse) {
      throw new HttpException(
        "Такого офиса не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    return warehouse;
  }

  async getAllProducts(officeId: number) {
    const warehouse = await this.getWarehouseByOfficeId(officeId);
    if (!warehouse) {
      throw new HttpException(
        "Такого офиса не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const products = await this.productService.getAllProductsInWarehouse(
      warehouse.id
    );
    return products;
  }

  async getPaginationProducts(warehouseId: number, offset: number, limit: number) {
    const { count, rows } = await this.productRepository.findAndCountAll({
      where: { warehouseId:warehouseId, isDeleted: false },
      order: [['id', 'ASC']],
      offset,
      limit,
    });
    return { count, rows };
  }
}
