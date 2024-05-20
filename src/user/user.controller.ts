/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Prisma, NotificationFrequency } from '@prisma/client';
import { RegisterUserDto } from 'src/authentication/dto/register-user.dto';


@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

@ApiOperation({ summary: 'Get all users' })
@ApiResponse({ status: 200, description: 'Successfully fetched users' })
@Get()
async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'ok!',
        message: 'Successfully fetched users',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }


@ApiOperation({ summary: 'Get user by ID' })
@ApiParam({ name: 'id', description: 'User ID', type: 'string' })
@ApiResponse({ status: 200, description: 'Successfully fetched user' })
@ApiResponse({ status: 404, description: 'User not found' })
@Get(':id')
async getUserById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      const user = await this.userService.getUserById({ id: String(id) });
      return response.status(200).json({
        status: 'ok',
        message: 'User returned successfully',
        result: user,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }   
  //@Get(':id')
  /*async getUserById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      const user = await this.userService.getUserById(Number(id));
      if (user) {
        return response.status(200).json({
          status: 'ok',
          message: 'Successfully fetched user',
          result: user,
        });
      } else {
        return response.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }*/


@ApiOperation({ summary: 'Create a new user' })
@ApiBody({ type: RegisterUserDto, description: 'User data' })
@ApiResponse({ status: 201, description: 'User created successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })  
@Post()
  async createUser(@Body() userData: Prisma.UserCreateInput, @Res() response: Response): Promise<any> {
    try {
      const user = await this.userService.createUser(userData);
      return response.status(201).json({
        status: 'ok',
        message: 'User created successfully',
        result: user,
      });
    } catch (err) {
      console.log(err)
      return response.status(500).json({
        status: err,
        message: 'Internal Server Error',
      });
    }
  }

    
@ApiOperation({ summary: 'Update User' })
@ApiBody({ type: RegisterUserDto, description: 'User data' })
@ApiResponse({ status: 201, description: 'User updated successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' }) 
@Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
    @Res() response: Response
  ): Promise<any> {
    try {
      const user = await this.userService.updateUser({ where: { id: String(id) }, data: userData });
      return response.status(200).json({
        status: 'ok',
        message: 'User updated successfully',
        result: user,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }


@ApiOperation({ summary: 'Delete a User' })
@ApiBody({ type: RegisterUserDto, description: 'User data' })
@ApiResponse({ status: 201, description: 'User deleted successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' }) 
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      const user = await this.userService.deleteUser({ id: String(id) });
      return response.status(200).json({
        status: 'ok',
        message: 'User deleted successfully',
        result: user,
      });
    } catch (err) {
      return response.status(500).json({
        status: err,
        message: 'Internal Server Error',
      });
    }
  }

  @Put(':id/notification-frequency')
  async updateNotificationFrequency(
    @Param('id') id: string,
    @Body() { frequency }: { frequency: NotificationFrequency },
  ) {
    return this.userService.updateUser({
      where: { id: String(id) },
      data: { notificationFrequency: frequency }
    });
  }
}





//here
//here
//here
/*import {Controller, Get, Req, Res} from '@nestjs/common'
import { Request, Response } from 'express';
import { UserService } from './user.service';


@Controller('users')
export class UsersController{
    constructor(private readonly userService: UserService) { }
    
    @Get()
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any>{
        try {
            const result = await this.userService.getAllUser();
            return response.status(200).json({
                status: 'ok!',
                message: 'Successfully fetch dial',
                result: result    
            })
        }catch(err) {
            return response.status(500).json({
                status: 'ok',
                message: 'Internal Server Error'
            })
        }
    }

    
}*/