/* eslint-disable prettier/prettier */
import {Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import { TasksGateway } from 'src/websocket/TaskGateway';
//import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService,
                private tasksGateway: TasksGateway) { }

async getAllTasks() {
return this.prisma.task.findMany();
    }

async createTask(data: Prisma.TaskCreateInput, userId: string): Promise<Task> {
        try {
             const task = await this.prisma.task.create({
                data: {
            ...data,
            user: {
                connect: {
                    id: userId,
                   
                    },
                },
            }
        })
      
            //here , i am trying to update the user with the tasks created
        await this.prisma.user.update({
        where: { id: userId },
        data: {
          tasks: {
            connect: { id: task.id },
          },
        },
      });

    this.tasksGateway.notifyTaskCreated(task); // Notify clients of the new task
    return task;
    }
        catch (error)
        {
            throw new InternalServerErrorException('Failed to create task');
        }
        /*const task = await this.prisma.task.create({
        data: {
            ...data,
            user: {
                connect: {
                id: userId,
                    },
                },
            }
            })
        
        return task*/
    }
/*return this.prisma.task.create({
     data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });*/
        
  

    /*async getTaskByIds(params: { id: number }) {
        return this.prisma.task.findUnique({ where: { id: params.id } });
    }*/

async getTaskById(data: Prisma.TaskWhereUniqueInput): Promise<Task> {
const task = await this.prisma.task.findUnique({
            where: {
                    id: data.id
                   }
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

  

async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
}): Promise<Task> {
    
    try 
    {
        const { where, data } = params;

      // Update the task
      const updatedTask = await this.prisma.task.update({
        data,
        where,
        include: { user: true }, 
      });
        
        if (updatedTask.user) {
       
        const user = await this.prisma.user.findUnique({
          where: { id: updatedTask.user.id },
          include: { tasks: true },
        });

        // Here I am intentionally replacing the previous task that was updated on the user side of things.
        const updatedTasks = user.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));

        // Update the user with the updated list of tasks
        await this.prisma.user.update({
          where: { id: updatedTask.user.id },
          data: { tasks: { set: updatedTasks } },
        });
    }
        

   /* const { where, data } = params;
    return this.prisma.task.update({
      data,
      where,
    });*/
        return updatedTask
    }
    
    catch (error) {
        // Handle error
        console.log(error)
      throw new InternalServerErrorException('Failed to update task');
    }
  }
    

/*async deleteTask(params: { id: number }) {
        return this.prisma.task.delete({ where: { id: params.id } });
    }*/


  async deleteTask(params: { id: number }): Promise<Task | null> {
    try {
      // Find the task to be deleted
      const deletedTask = await this.prisma.task.delete({
        where: { id: params.id },
        include: { user: true }, //I need to track the user associated with the deleted task
      });


       if (deletedTask.user) {
            // Fetch the user and their current tasks
            const user = await this.prisma.user.findUnique({
                where: { id: deletedTask.user.id },
                include: { tasks: true },
            });

            // Filter out the deleted task from the user's tasks list
            const updatedTasks = user.tasks.filter(task => task.id !== deletedTask.id);

            // Update the user with the filtered list of tasks
            await this.prisma.user.update({
                where: { id: deletedTask.user.id },
                data: { tasks: { set: updatedTasks } },
            });
        }

        return deletedTask;
    } catch (error) {
        // Handle error
        console.log(error)
      throw new InternalServerErrorException('Failed to delete task');
    }
  }

      /*async updateTask(params: { where: { id: string }; data: UpdateTaskDto }) {
        const { where, data } = params;
        return this.prisma.task.update({ data, where });
    }*/
}