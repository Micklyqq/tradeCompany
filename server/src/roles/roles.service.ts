import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import {Op} from "sequelize";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByName(name: string) {
    const role = await this.roleRepository.findOne({ where: { name } });
    return role;
  }

  async getRoleById(roleId:number){
      return await this.roleRepository.findByPk(roleId);
  }

  async getAllRoles() {
    return await this.roleRepository.findAll(
        {where:
              {name:{
                [Op.notIn]:['ADMIN','USER']
                }
              }
        });
  }
}
