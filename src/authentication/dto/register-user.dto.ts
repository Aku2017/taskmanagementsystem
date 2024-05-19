/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {

    @ApiProperty({ description: 'The name of the user' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The username' })
    @IsNotEmpty()
    @IsString()  
    username: string;

    @ApiProperty({ description: 'The email address' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password' })
    @IsNotEmpty()
    @IsString() 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password too weak. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })    
    password: string;


}