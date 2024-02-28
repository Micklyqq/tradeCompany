import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sale } from "./sales.model";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { ProductsService } from "src/products/products.service";
import {UpdateProductDto} from "../products/dto/update-product.dto";
import {Product} from "../products/products.model";
import {SalesByDateDto} from "./dto/sales-by-date.dto";
import {Op} from "sequelize";


@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale) private saleRepository: typeof Sale,
    private productService: ProductsService
  ) {}

  async create(dto: CreateSaleDto) {
    const product = await this.productService.findProductById(dto.productId);
    const amount = dto.quantity * product.price;
    await this.takeProductFromWarehouse(dto.productId,dto.quantity);
    const sale = await this.saleRepository.create({ ...dto, amount });
    sale.$set("product", dto.productId);
    sale.$set("office", dto.officeId);
    const saleResponse = await this.saleRepository.findOne({where:{id:sale.id},include:{all:true}});
    return saleResponse;
  }

  async getOne(saleId: number) {
    const sale = await this.saleRepository.findByPk(saleId);
    if (!sale) {
      throw new HttpException("Продажа не найдена", HttpStatus.NOT_FOUND);
    }
    return sale;
  }

  async getAll(officeId:number){
    const sales = await this.saleRepository.findAll({
      where:{officeId},
      include:{all:true},
      order:[['id','ASC']]
    })
    if(!sales){
      throw new HttpException("Неверный id офиса",HttpStatus.BAD_REQUEST);
    }
    return sales;
  }

  async takeProductFromWarehouse(productId:number,quantity:number){
    const product = await this.productService.findProductById(productId);
    const takeProduct = product.quantity - quantity;
    if(takeProduct<0){
      throw new HttpException("Недостаточно продукции на складе",HttpStatus.BAD_REQUEST);
    }

  const productUpdate:UpdateProductDto ={
  quantity:takeProduct
  }

  return await this.productService.updateProduct(productId,productUpdate);
  }

  async delete(saleId: number) {
    const sale = await this.saleRepository.findByPk(saleId);
    if(!sale){
      throw new HttpException("Продажа не найдена",HttpStatus.NOT_FOUND);
    }
    await this.saleRepository.destroy({where:{id:saleId}});
  }

  async getTopSellers(warehouseId:number){
    const sequelize = this.saleRepository.sequelize;
   return await this.saleRepository.findAll({
         where:{officeId:warehouseId},
          attributes:[
              [sequelize.fn('SUM',sequelize.col('Sale.quantity')),'totalquantitysold']
          ],
     include:[{
        model:Product,
       attributes:[
           'id',
           'name',
           'price'
       ]
     }],
     group:['product.id'],
     limit:3,
     order:sequelize.literal('totalQuantitySold DESC')
       }, );

  }

  async getSalesByDate(dto:SalesByDateDto){
    const {officeId,startDate,endDate} = dto;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0,0,0,0);
    let endOfDay;
    if(endDate){
      endOfDay = new Date(endDate);
      endOfDay.setHours(23,59,59,999);
    }
    if(endDate){
      return await this.saleRepository.findAll({
        where:{
          officeId,
          date:{
            [Op.between]:[startOfDay,endOfDay]
          }
        }
      })
    }
    else{
      return await this.saleRepository.findAll({
        where:{
          officeId,
          date:{
            [Op.gte]:startOfDay,
            [Op.lt]:new Date(startOfDay.getTime()+24*60*60*1000)
          }
        }
      })
    }
  }

}
