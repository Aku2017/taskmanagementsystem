/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {

    @ApiProperty({ description: 'The email address' })
    @IsNotEmpty()
    @IsString()     
    email: string;

    @ApiProperty({ description: 'The password' })
    @IsNotEmpty()
    @IsString()  
    password: string;

    @ApiProperty({ description: 'The username' })
    @IsNotEmpty()
    @IsString()    
    username: string;


}