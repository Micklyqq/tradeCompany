import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Office} from "./offices.model";
import {CreateOfficeDto} from "./dto/create-office.dto";
import {UpdateOfficeDto} from "./dto/update-office.dto";
import {WarehouseService} from "src/warehouse/warehouse.service";
import {Warehouse} from "src/warehouse/warehouse.model";
import {FilesService} from "src/files/files.service";
import {User} from "../users/users/users.model";
import {Role} from "../roles/roles.model";

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office) private officeRepository: typeof Office,
    @InjectModel(Warehouse) private warehouseRepository: typeof Warehouse,
    @InjectModel(User) private userRepository:typeof User,
    private warehouseService: WarehouseService,
    private fileService: FilesService,
  ) {}

  async createOffice(dto: CreateOfficeDto) {
    const candidate = await this.getOfficeByName(dto.name);
    if (candidate) {
      throw new HttpException(
        "Офис с таким именем уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const office = await this.officeRepository.create(dto);
    await this.warehouseService.createWarehouse(office.id);
    return office;
  }

  async getAllOffices() {
    const offices = await this.officeRepository.findAll({
      include: { all: true },
    });
    return offices;
  }

  async updateOffice(officeId: number, updateDto: UpdateOfficeDto, logo: any) {
    const office = await this.officeRepository.findByPk(officeId);
    if (!office) {
      throw new HttpException("Офис не найден", HttpStatus.NOT_FOUND);
    }
    if (updateDto.name) {
      const candidate = await this.getOfficeByName(updateDto.name);
      if (candidate) {
        throw new HttpException(
          "Офис с таким именем уже существует",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    if (logo) {
      const fileName = await this.fileService.createFile(logo);
      await office.update({ ...updateDto, logo: fileName });
      return office;
    }
    await office.update(updateDto);
    return office;
  }

  async getOfficeByName(name: string) {
    const office = await this.officeRepository.findOne({
      where: { name },
    });
    return office;
  }

  async getOneOffice(id: number) {
    const office = await this.officeRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!office) {
      throw new HttpException(
        "Такого офиса не существует",
        HttpStatus.NOT_FOUND
      );
    }
    return office;
  }

  async deleteOffice(id: number) {
    const candidate = await this.officeRepository.findOne({ where: { id } });
    if (!candidate) {
      throw new HttpException(
        "Такого офиса не существует",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.warehouseRepository.destroy({ where: { officeId: id } });
    await this.officeRepository.destroy({ where: { id } });
    return { message: `Офис ${id} был успешно удалён!` };
  }

  async getWorkers(officeId: number) {
    const office = await this.officeRepository.findByPk(officeId);
    if(!office){
      throw new HttpException(
          'Такого офиса не существует',
          HttpStatus.BAD_REQUEST
      );
    }
    return await this.userRepository.findAll({
      where: {officeId},
      attributes:{exclude:['password','createdAt','updatedAt']},
      order:[['id','ASC']]
    });
  }
}
