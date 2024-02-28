import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {FilesService} from "src/files/files.service";
import {Sale} from "../sales/sales.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Sale) private saleRepository:typeof Sale,
    private fileService: FilesService
  ) {}

  async createProduct(dto: CreateProductDto, warehouseId: number) {
    const product = await this.productRepository.create(dto);
    product.$set("warehouse", warehouseId);
    return product;
  }

  async getAllProductsInWarehouse(warehouseId: number) {
    const products = await this.productRepository.findAll({
      where: { warehouseId,isDeleted:false },
      order:[['id','ASC']]
    });
    return products;
  }
  async findProductById(productId: number) {
    const product = await this.productRepository.findByPk(productId);
    if (!product) {
      throw new HttpException("Неверный id продукта", HttpStatus.BAD_REQUEST);
    }
    return product;
  }
  async deleteProduct(productId: number) {
    const candidate = await this.productRepository.findByPk(productId);
    if (!candidate) {
      throw new HttpException(
        "Такого продукта не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.productRepository.update({isDeleted:true},{where:{id:productId}});
    return { productId:productId };
  }

  async updateProduct(productId: number, dto: UpdateProductDto, logo = undefined) {
    const product = await this.productRepository.findByPk(productId);
    if (!product) {
      throw new HttpException(
        "Такого продукта не существует",
        HttpStatus.BAD_REQUEST
      );
    }

    if (logo) {
      const fileName = await this.fileService.createFile(logo);

      await product.update({ ...dto, logo: fileName });
      return product;
    }
    await product.update(dto);
    return product;
  }


}
