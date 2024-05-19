/* eslint-disable prettier/prettier */
import { Controller, Post, Body,Req, Res, ConflictException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common'
import {AuthService} from './auth.service'
import { LoginDto } from './dto/login-user.dto'
import {Request, Response} from 'express'
import { RegisterUserDto } from './dto/register-user.dto'
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';


@ApiTags('Authentication')
@Controller('Auth')
export class AuthController{
    constructor(private readonly authService: AuthService) { }
    

@ApiOperation({ summary: 'Login' })
@ApiBody({ type: LoginDto, description: 'User log in' })
@ApiResponse({ status: 201, description: 'User Logged in successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })  
    @Post('/login')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))   
    async login(@Req() request:Request, @Res() response : Response, @Body() loginDto:LoginDto): Promise<any>{
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                status: 'ok',
                message: 'successfully login',
                result:result
            })
            
        } catch (err) {
            return response.status(500).json({
                status: 'Ok!',
                message: 'Internal ServerError',


            })
            
        }
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: RegisterUserDto, description: 'User data' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })  
    @Post('/register')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))       
    async register(@Req() request:Request, @Res() response : Response, @Body() registerDto: RegisterUserDto): Promise<any>{
         try {
            await this.authService.register(registerDto);
            return response.status(200).json({
                status: 'ok',
                message: 'successfully register user',
            })
            
         }
         
         catch (error)  
         {  
            if (error instanceof ConflictException)
            {
                return response.status(HttpStatus.CONFLICT).json({
                    status: 'error',
                    message: error.message  
                })
            }
            return response.status(500).json({
                status: 'error',
                message: error.message
               
            })
            
        }
    }
}