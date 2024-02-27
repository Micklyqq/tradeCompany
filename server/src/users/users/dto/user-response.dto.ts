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
    readonly roles:[
        {
            id:number,
            name:string,
        }
    ]
}