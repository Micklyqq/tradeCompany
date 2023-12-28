import { Public } from "src/auth/decorators/public.decorator";
import { CreateOfficeDto } from "./dto/create-office.dto";
import { OfficesService } from "./offices.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { UpdateOfficeDto } from "./dto/update-office.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { SalesService } from "src/sales/sales.service";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Office } from "./offices.model";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiBearerAuth()
@ApiTags("Офисы")
@Controller("offices")
export class OfficesController {
  constructor(private officeService: OfficesService) {}

  @ApiOperation({ summary: "Создание офиса" })
  @ApiResponse({ status: 200, type: Office })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() officeDto: CreateOfficeDto) {
    return this.officeService.createOffice(officeDto);
  }

  @ApiOperation({ summary: "Получение всех офисов" })
  @ApiResponse({ status: 200, type: [Office] })
  @Get()
  getAll() {
    return this.officeService.getAllOffices();
  }

  @ApiOperation({ summary: "Получение офиса по id" })
  @ApiResponse({ status: 200, type: Office })
  @Get("/:id")
  getOne(@Param("id") officeId: number) {
    return this.officeService.getOneOffice(officeId);
  }

  @ApiOperation({ summary: "Обновление офиса" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, type: Office })
  @UsePipes(ValidationPipe)
  @Put("/:id")
  @UseInterceptors(FileInterceptor("logo"))
  update(
    @Param("id") officeId: number,
    @Body() updateDto: UpdateOfficeDto,
    @UploadedFile() logo: any
  ) {
    return this.officeService.updateOffice(officeId, updateDto, logo);
  }
  @ApiOperation({ summary: "Удаление офиса" })
  @ApiResponse({ status: 200, description: `Офис "id" был успешно удалён!` })
  @Delete("/:id")
  delete(@Param("id") officeId: number) {
    return this.officeService.deleteOffice(officeId);
  }
}
