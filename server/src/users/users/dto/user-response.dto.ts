import {ApiProperty} from "@nestjs/swagger";

export class UserResponseDto{
    @ApiProperty({example:'3'})
    readonly id:number;
    @ApiProperty({example:'3'})
    readonly officeId:number;
    @ApiProperty({ example: "admin@mail.ru" })
    readonly email:string;
    @ApiProperty({ example:'Иван' })
    readonly firstname:string;
    @ApiProperty({ example: "Иванов" })
    readonly lastname:string;
    @ApiProperty({ example: "+3752384748" })
   readonly phone:string;
    @ApiProperty({ example: "{name:ADMIN,id:2}" })
    readonly role:{
        id:number,
        name:string,
    }
}