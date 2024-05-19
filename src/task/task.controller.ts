/* eslint-disable prettier/prettier */
// src/task/task.controller.ts
import { Controller, Post, Body, Param, Res, HttpStatus, Put, Delete, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@ApiTags('Tasks')
@Controller('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


@ApiOperation({ summary: 'Create a new task' })
@ApiBody({ type: CreateTaskDto, description: 'Task data' })
@ApiResponse({ status: 201, description: 'Task created successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })  
@Post(':userId')
async createTask(@Param('userId') userId: string,
    @Body() taskData: Prisma.TaskCreateInput, @Res() response: Response,
  ): Promise<any> {
    try {
      const task = await this.taskService.createTask(taskData, userId);
      return response.status(HttpStatus.CREATED).json({
        status: 'ok',
        message: 'Task created successfully',
        result: task,
      });
    } catch (err) {
        console.log(err.message)
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }


    
@ApiOperation({ summary: 'Fetch Task' })
@ApiBody({ type: CreateTaskDto, description: 'Task data' })
@ApiResponse({ status: 201, description: 'Task fetched successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })       
@Get(':id')
async fetchTaskById(@Param('id') id: number, @Res() response: Response): Promise<any> {
try {
    const task = await this.taskService.getTaskById({ id });
    if (task) {
        return response.status(HttpStatus.OK).json({
        status: 'ok',
        message: 'Task fetched successfully',
        result: task,
        });
        } else {
                return response.status(HttpStatus.NOT_FOUND).json({
                    status: 'error',
                    message: 'Task not found',
                });
            }
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    }
    
  
@ApiOperation({ summary: 'Update Task' })
@ApiBody({ type: CreateTaskDto, description: 'Task data' })
@ApiResponse({ status: 201, description: 'Task updated successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })    
@Put(':id')
async updateTask(
    @Param('id') id: number,
    @Body() updateTaskData: Prisma.TaskUpdateInput,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const task = await this.taskService.updateTask({ where: { id: Number(id) }, data: updateTaskData });
      return response.status(HttpStatus.OK).json({
        status: 'ok',
        message: 'Task updated successfully',
        result: task,
      });
    } catch (err) {
       console.log(err.message) 
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
}

    

@ApiOperation({ summary: 'Delete Task' })
@ApiBody({ type: CreateTaskDto, description: 'Task data' })
@ApiResponse({ status: 201, description: 'Task deleted successfully' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })  
@Delete(':id')
  async deleteTask(@Param('id') id: number, @Res() response: Response): Promise<any> {
    try {
      const task = await this.taskService.deleteTask({ id: Number(id) });
      return response.status(HttpStatus.OK).json({
        status: 'ok',
        message: 'Task deleted successfully',
        result: task,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}
