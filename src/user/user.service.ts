/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserGateway } from 'src/websocket/UserGateway';
import { User,  Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly userGateWay: UserGateway) {}

    async getAllUser(): Promise<User[]>{
        return this.prisma.user.findMany()
    } 
    
 
async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
            email: data.email
            }
        })  
  if (existingUser) {
    console.log(existingUser)
    console.log("userservice saves")
            throw new ConflictException('user exists already')
        }
     
    const createdUser = this.prisma.user.create({
      data,
    });
  
  this.userGateWay.handleUserCreated(createdUser);
  return createdUser;
  }

async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const updatedUser= this.prisma.user.update({
      data,
      where,
    });
  this.userGateWay.handleUserUpdated(updatedUser); 
  return updatedUser;
  }
  
async getUserById(data: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {id: data.id},
      include: { tasks: true }, 
        });
        if (!user) {
            throw new NotFoundException('User not found');
  } 
        return user;
    }

async deleteUser(data: Prisma.UserWhereUniqueInput): Promise<User> {
  this.userGateWay.handleUserDeleted(data.id); 
  return this.prisma.user.delete({
      where: { id: data.id},
  });
   
  }
}