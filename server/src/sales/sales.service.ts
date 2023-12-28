import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sale } from "./sales.model";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale) private saleRepository: typeof Sale,
    private productService: ProductsService
  ) {}

  async create(dto: CreateSaleDto) {
    const product = await this.productService.findProductById(dto.productId);
    const amount = dto.quantity * product.price;
    const sale = await this.saleRepository.create({ ...dto, amount });
    sale.$set("product", dto.productId);
    sale.$set("office", dto.officeId);
    return sale;
  }

  async getOne(saleId: number) {
    const sale = await this.saleRepository.findByPk(saleId);
    if (!sale) {
      throw new HttpException("Продажа не найдена", HttpStatus.NOT_FOUND);
    }
    return sale;
  }
}
