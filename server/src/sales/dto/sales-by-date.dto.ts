import {ApiProperty} from "@nestjs/swagger";

export class SalesByDateDto {
    @ApiProperty({ example: "2", description: "ID офиса" })
   readonly officeId:number;
    @ApiProperty({ example: "2024-02-17", description: "Начальная дата" })
    readonly startDate:Date;
    @ApiProperty({ example: "2024-02-25", description: "Конечная дата(не обязательное поле)" })
    readonly endDate?:Date;
}